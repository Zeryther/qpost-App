import React, { Component } from "react";
import NavigationBar from "../NavigationBar";
import { Container } from "reactstrap";

class Messages extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="messages"/>

				<Container className="mt-3">
					messages
				</Container>
			</div>
		);
	}
}

export default Messages;
