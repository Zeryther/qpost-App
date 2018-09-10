import React, { Component } from "react";
import { Container, Card, Row, Col, CardBody, Alert } from "reactstrap";
import axios from 'axios';
import SessionUtil from "../../Util/Session/SessionUtil";
import { Link, withRouter } from "react-router-dom";

class Profile extends Component {
	constructor(props){
		super(props);

		this.state = {
			user: null
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
			this.setState({user: null});
			this.fetch();
		}
	}

	fetch = () => {
		axios.get("https://qpost.gigadrivegroup.com/api/user/info",{params: {token: SessionUtil.getSessionToken(), user: this.props.match.params.query}})
		.then(res => {
			const user = res.data;

			if(user && user.hasOwnProperty("id")){
				SessionUtil.updateCurrentUser(user);
				this.setState({user: user});
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
					<Container className="mt-1">
						<Row>
							<Col xs="12" lg="8">
								<Card className="mb-2">
									<CardBody>
										<div style={{width: "100%", height: "128px"}}>
											<img src={this.state.user.avatar} style={{width: "128px",height: "128px"}} className="border border-primary rounded float-left" alt={this.state.user.displayName}/>

											<div className="float-left ml-2">
												<h3 className="mb-0">{this.state.user.displayName}</h3>
												<p className="text-muted mb-0">@{this.state.user.username}</p>

												<div>follow button</div>
											</div>
										</div>

										<div className="mt-3">
											{this.state.user.bio || <em>No bio set.</em>}
										</div>

										<div className="mt-3 text-muted">
											<span className="mr-3">
												<i className="fas fa-globe"></i> Joined {this.state.user.gigadriveJoinDate !== null ? dateFormat(new Date(this.state.user.gigadriveJoinDate),"mmmm yyyy") : dateFormat(new Date(this.state.user.joinDate),"mmmm yyyy")}
											</span>

											{this.state.user.birthday != null ? (
												<span className="mr-3">
													<i className="fas fa-birthday-cake"></i> {dateFormat(new Date(this.state.user.birthday),"mmmm dS yyyy")}
												</span>
											) : ""}
										</div>

										<div className="mt-1">
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
									<Card className="mb-2 d-flex d-lg-none">
										<CardBody>
											<h6 class="my-0"><i className="far fa-user text-muted"></i> {this.state.user.followersYouKnow.length} follower{this.state.user.followersYouKnow.length !== 1 ? "s" : ""} you know</h6>

											<div className="d-inline-block">
												{this.state.user.followersYouKnow.map((user,i) =>
													<div className="float-left mt-1 mr-1">
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

							<Col lg="4" className="d-none d-lg-flex">
								{this.state.user.followersYouKnow && this.state.user.followersYouKnow.length > 0 ? (
									<Card className="mb-2">
										<CardBody>
											<h6 class="my-0"><i className="far fa-user text-muted"></i> {this.state.user.followersYouKnow.length} follower{this.state.user.followersYouKnow.length !== 1 ? "s" : ""} you know</h6>

											<div className="d-inline-block">
												{this.state.user.followersYouKnow.map((user,i) =>
													<div className="float-left mt-1 mr-1">
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
						</Row>
					</Container>
				</div>
			)
		} else {
			return (
				<div className="profile">
					<Container className="mt-3">
						<div className="text-center">
							<i className="fas fa-spinner fa-pulse" style={{fontSize: "48px"}}></i>
						</div>
					</Container>
				</div>
			);
		}
	}
}

export default withRouter(Profile);
