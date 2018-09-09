import React, { Component } from 'react';
import Login from './Layout/Login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SessionUtil from './Util/Session/SessionUtil';
import HomeFeed from './Layout/HomeFeed/HomeFeed';
import Logout from './Util/Logout/Logout';

class App extends Component {
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
