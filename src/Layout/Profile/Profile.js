import React, { Component } from "react";
import NavigationBar from "../NavigationBar";
import { Container } from "reactstrap";
import axios from 'axios';
import SessionUtil from "../../Util/Session/SessionUtil";

class Profile extends Component {
	constructor(props){
		super(props);

		this.state = {
			userMatch: this.props.match.params.query,
			user: null
		};

		console.log(this.state.userMatch);
	}

	componentDidMount(){
		axios.get("https://qpost.gigadrivegroup.com/api/user/info",{params: {token: SessionUtil.getSessionToken(), user: this.state.userMatch}})
		.then(res => {
			const user = res.data;

			if(user && user.hasOwnProperty("id")){
				SessionUtil.updateCurrentUser(user);
				this.setState({user: user});
			}
		});
	}

	render() {
		if(this.state.user !== null){
			return (
				<div className="profile">
					<NavigationBar/>

					{JSON.stringify(this.state.user)}
				</div>
			)
		} else {
			return (
				<div className="profile">
					<NavigationBar/>
	
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

export default Profile;
