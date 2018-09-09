import React, { Component } from "react";
import NavigationBar from "../NavigationBar";

class Search extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="search"/>
			</div>
		);
	}
}

export default Search;
