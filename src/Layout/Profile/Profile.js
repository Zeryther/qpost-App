import React, { Component } from "react";
import NavigationBar from "../NavigationBar";
import { Container } from "reactstrap";

class Profile extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar/>

				<Container className="mt-3">
					profile
				</Container>
			</div>
		);
	}
}

export default Profile;
