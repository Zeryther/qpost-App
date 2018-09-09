import React, { Component } from "react";
import SessionUtil from "../Session/SessionUtil";
import Navbar from "../Layout/NavigationBar";

class HomeFeed extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			validatingLogin: false
		};
	}

	componentWillMount(){
		if(this.state.validatingLogin === false){
			this.setState({validatingLogin: true});

			SessionUtil.validateLogin(() => {
				this.setState({validatingLogin: false});

				if(!SessionUtil.isLoggedIn()){
					window.location.href = "/";
				}
			});
		}
	}

	render() {
		return (
			<div className="home-feed">
				<Navbar/>
				asd
			</div>
		);
	}
}

export default HomeFeed;
