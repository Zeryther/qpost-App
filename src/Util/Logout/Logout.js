import React, { Component } from "react";
import SessionUtil from "../../Util/Session/SessionUtil";

class Logout extends Component {
	render() {
		SessionUtil.logout();
		
		return (
			<div className="logout">
				<div className="">
					Redirecting...

					<meta http-equiv="refresh" content="0; url=/" />
				</div>
			</div>
		);
	}
}

export default Logout;
