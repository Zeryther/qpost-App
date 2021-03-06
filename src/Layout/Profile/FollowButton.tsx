import React, { Component } from "react";
import { Button } from "reactstrap";
import Util from "../../Util/Util";
import { Link } from "react-router-dom";

class FollowButton extends Component<any,any> {
	constructor(props){
		super(props);

		this.state = {
			user: this.props.user,
			status: this.props.user.followStatus
		};
	}

	handleClick = event => {
		// TODO
	};

	render() {
		Util.updateCurrentUser(this.state.user);

		if(this.state.user.id === Util.getCurrentUser().id){
			// EDIT PROFILE

			return (
				<Link to="/edit">
					<Button color="light" className={this.props.className ? this.props.className : ""}>
						Edit profile
					</Button>
				</Link>
			);
		} else if(this.state.status === 0){
			// NOT FOLLOWING

			return (
				<Button color="primary" className={this.props.className ? this.props.className : ""} onClick={this.handleClick}>
					Follow
				</Button>
			);
		} else if(this.state.status === 1){
			// FOLLOWING

			return (
				<Button color="danger" className={this.props.className ? this.props.className : ""} onClick={this.handleClick}>
					Unfollow
				</Button>
			);
		} else if(this.state.status === 2){
			// PENDING

			return (
				<Button color="warning" className={this.props.className ? this.props.className : ""} onClick={this.handleClick}>
					Pending
				</Button>
			);
		}

		return null;
	}
}

export default FollowButton;
