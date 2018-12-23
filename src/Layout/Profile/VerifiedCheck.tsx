import React, { Component } from "react";
import NightMode from "../../Util/NightMode/NightMode";

class VerifiedCheck extends Component<any,any> {
	render() {
		return this.props.status && this.props.status === true ? (
			<span className="ml-1 small">
				<i className="fas fa-check-circle" style={{color: !NightMode.isActive() ? "#007bff" : "white"}}/>
			</span>
		) : null;
	}
}

export default VerifiedCheck;
