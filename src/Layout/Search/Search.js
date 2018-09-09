import React, { Component } from "react";
import NavigationBar from "../NavigationBar";
import { Container } from "reactstrap";

class Search extends Component {
	render() {
		return (
			<div className="home-feed">
				<NavigationBar active="search"/>

				<Container className="mt-3">
					search
				</Container>
			</div>
		);
	}
}

export default Search;
