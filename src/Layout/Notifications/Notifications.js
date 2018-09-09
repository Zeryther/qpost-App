import React, { Component } from "react";
import NavigationBar from "../NavigationBar";

class Notifications extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="notifications"/>
			</div>
		);
	}
}

export default Notifications;
