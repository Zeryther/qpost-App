import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Layout/Login/Login";
import Util from "./Util/Util";
import HomeFeed from "./Layout/HomeFeed/HomeFeed";
import Logout from "./Util/Logout/Logout";
import Notifications from "./Layout/Notifications/Notifications";
import Messages from "./Layout/Messages/Messages";
import Search from "./Layout/Search/Search";
import Profile from "./Layout/Profile/Profile";
import NavigationBar from "./Layout/NavigationBar";
import LoadingScreen from './LoadingScreen';

class App extends Component<any,any> {
	constructor(props){
		super(props);
		
		this.state = {
			validatingLogin: true
		};
	}

	componentWillMount(){
		Util.validateLogin(() => {
			this.setState({validatingLogin: false});

			if(!Util.isLoggedIn()){
				window.location.href = "/";
			}
		});
	}

	render() {
		if(Util.isLoggedIn()){
			return !this.state.validatingLogin && Util.isLoggedIn() ? (
				<Router>
					<div className="router">
						<NavigationBar/>

						<Switch>
							<Route path="/" exact={true} component={HomeFeed}/>
							<Route path="/notifications" exact={true} component={Notifications}/>
							<Route path="/search" exact={true} component={Search}/>
							<Route path="/messages" exact={true} component={Messages}/>
							<Route path="/logout" exact={true} component={Logout}/>
							<Route path="/:query" component={Profile}/>
						</Switch>
					</div>
				</Router>
			) : <LoadingScreen/>;
		} else {
			return (
				<Router>
					<Route path="/" exact={true} component={Login}/>
				</Router>
			);
		}
	}
}

export default App;
