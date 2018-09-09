import React, { Component } from "react";
import NavigationBar from "../NavigationBar";

class HomeFeed extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="home"/>
			</div>
		);
	}
}

export default HomeFeed;
