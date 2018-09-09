import React, { Component } from "react";
import NavigationBar from "../NavigationBar";
import { Container } from "reactstrap";

class HomeFeed extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="home"/>

				<Container className="mt-3">
					home feed
				</Container>
			</div>
		);
	}
}

export default HomeFeed;
