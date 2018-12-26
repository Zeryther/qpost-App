import React, { Component } from "react";
import Util from "../Util";

class Logout extends Component {
	render() {
		Util.logout();
		
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
