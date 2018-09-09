import React, { Component } from "react";
import NavigationBar from "../NavigationBar";
import { Container } from "reactstrap";

class Notifications extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="notifications"/>

				<Container className="mt-3">
					notifications
				</Container>
			</div>
		);
	}
}

export default Notifications;
