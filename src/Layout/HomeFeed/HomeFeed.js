import React, { Component } from "react";
import SessionUtil from "../../Util/Session/SessionUtil";
import Navbar from "../NavigationBar";

class HomeFeed extends Component {
	render() {
		return (
			<div className="home-feed">
				<Navbar active="home"/>
			</div>
		);
	}
}

export default HomeFeed;
