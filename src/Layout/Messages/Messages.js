import React, { Component } from "react";
import NavigationBar from "../NavigationBar";

class Messages extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="messages"/>
			</div>
		);
	}
}

export default Messages;
