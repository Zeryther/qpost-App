import React, { Component } from "react";
import { Container, Card, Row, Col, CardBody, Alert } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import VerifiedCheck from "./VerifiedCheck";
import FollowButton from "./FollowButton";
import Util from '../../Util/Util';

class Profile extends Component<any,any> {
	constructor(props){
		super(props);

		this.state = {
			user: null,
			doesNotExist: false
		};
	}

	componentDidMount(){
		this.fetch();
	}

	componentDidUpdate(prevProps){
		/*if(this.props.location !== prevProps.location){
			this.setState({
				userMatch: window.location.pathname.substr(1),
				user: null
			});

			this.fetch();
		}*/

		if(this.props.match.params.query !== prevProps.match.params.query){
			this.setState({user: null, doesNotExist: false});
			this.fetch();
		}
	}

	fetch = () => {
		Util.handleRequest("/api/user/info","GET",{user: this.props.match.params.query},user => {
			if(user && user.hasOwnProperty("id")){
				Util.updateCurrentUser(user);
				this.setState({user});
			} else {
				this.setState({user: null,doesNotExist: true});
			}
		});
	}

	render() {
		const dateFormat = require("dateformat");

		if(this.state.user !== null){
			if(this.state.user.suspended === true){
				return (
					<div className="profile">
						<Container className="mt-1">
							<Alert style={{color: "#d7d8d8",backgroundColor: "#1d1e1f",borderColor: "#000"}}>
								<h3>Account suspended</h3>
								<p className="my-0">This account has been suspended.</p>
							</Alert>
						</Container>
					</div>
				);
			}

			return (
				<div className="profile">
					<Container className="mt-3">
						<Row>
							<Col xs="12" lg="8">
								<Card className="mb-2">
									<CardBody>
										<div style={{width: "100%", height: "128px"}}>
											<img src={this.state.user.avatar} style={{width: "128px",height: "128px"}} className="border border-primary rounded float-left" alt={this.state.user.displayName}/>

											<div className="float-left ml-2">
												<h3 className="mb-0">{this.state.user.displayName}<VerifiedCheck status={this.state.user.verified}/></h3>
												<p className="text-muted mb-0">@{this.state.user.username}</p>

												<FollowButton user={this.state.user} className="mt-3"/>
											</div>
										</div>

										<div className="mt-3">
											{this.state.user.bio || <em>No bio set.</em>}
										</div>

										<div className="mt-3 text-muted">
											<span className="mr-3">
												<i className="fas fa-globe"/> Joined {dateFormat(new Date(this.state.user.joinDate),"mmmm yyyy")}
											</span>

											{this.state.user.birthday != null ? (
												<span className="mr-3">
													<i className="fas fa-birthday-cake"/> {dateFormat(new Date(this.state.user.birthday),"mmmm dS yyyy")}
												</span>
											) : ""}
										</div>

										<div className="mt-1">
											<Link to={"/" + this.state.user.username}>
												<span className="font-weight-bold">{this.state.user.posts}</span> Post{this.state.user.posts !== 1 ? "s" : ""}
											</Link>

											<span className="mx-1">•</span>

											<Link to={"/" + this.state.user.username + "/following"}>
												<span className="font-weight-bold">{this.state.user.following}</span> Following
											</Link>

											<span className="mx-1">•</span>

											<Link to={"/" + this.state.user.username + "/followers"}>
												<span className="font-weight-bold">{this.state.user.followers}</span> Followers
											</Link>
										</div>
									</CardBody>
								</Card>

								{this.state.user.followersYouKnow && this.state.user.followersYouKnow.length > 0 ? (
									<Card className="mb-2 d-block d-lg-none">
										<CardBody>
											<h6 className="my-0"><i className="far fa-user text-muted"/> {this.state.user.followersYouKnow.length} follower{this.state.user.followersYouKnow.length !== 1 ? "s" : ""} you know</h6>

											<div className="d-inline-block">
												{this.state.user.followersYouKnow.map((user,i) =>
													<div className="float-left mt-1 mr-1" key={user.id}>
														<Link to={"/" + user.username} className="clearUnderline">
															<img src={user.avatar} className="rounded" style={{width: "56px",height: "56px"}} alt={user.displayName + " (@" + user.username + ")"}/>
														</Link>
													</div>
												)}
											</div>
										</CardBody>
									</Card>
								) : ""}
							</Col>

							<Col lg="4" className="d-none d-lg-block">
								{this.state.user.followersYouKnow && this.state.user.followersYouKnow.length > 0 ? (
									<Card className="mb-2">
										<CardBody>
											<h6 className="my-0"><i className="far fa-user text-muted"/> {this.state.user.followersYouKnow.length} follower{this.state.user.followersYouKnow.length !== 1 ? "s" : ""} you know</h6>

											<div className="d-inline-block">
												{this.state.user.followersYouKnow.map((user,i) => {
													Util.updateCurrentUser(this.state.user);

													return (<div className="float-left mt-1 mr-1" key={user.id}>
														<Link to={"/" + user.username} className="clearUnderline">
															<img src={user.avatar} className="rounded" style={{width: "56px",height: "56px"}} alt={user.displayName + " (@" + user.username + ")"}/>
														</Link>
													</div>)
												})}
											</div>
										</CardBody>
									</Card>
								) : ""}
							</Col>
						</Row>
					</Container>
				</div>
			)
		} else if(this.state.doesNotExist === true){
			return (
				<div className="profile">
					<Container className="mt-1">
						<Alert style={{color: "#d7d8d8",backgroundColor: "#1d1e1f",borderColor: "#000"}}>
							<h3>Not found</h3>
							<p className="my-0">This account does not exist.</p>
						</Alert>
					</Container>
				</div>
			);
		} else {
			return (
				<div className="profile">
					<Container className="mt-3">
						<div className="text-center">
							<i className="fas fa-spinner fa-pulse" style={{fontSize: "48px"}}/>
						</div>
					</Container>
				</div>
			);
		}
	}
}

export default withRouter(Profile);
