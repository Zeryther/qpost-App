import React, { Component } from 'react';
import Login from './Login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SessionUtil from './Util/Session/SessionUtil';
import HomeFeed from './HomeFeed/HomeFeed';
import Logout from './Logout/Logout';

class App extends Component {
	render() {
		if(SessionUtil.isLoggedIn()){
			return (
				<Router>
					<div className="router">
						<Route path="/" exact={true} component={HomeFeed}/>
						<Route path="/logout" exact={true} component={Logout}/>
					</div>
				</Router>
			);
		} else {
			return (
				<Router>
					<div className="router">
						<Route path="/" exact={true} component={Login}/>
					</div>
				</Router>
			);
		}
	}
}

export default App;
