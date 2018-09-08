import React, { Component } from "react";
import { Button, Form, Label, Input, Alert } from 'reactstrap';
import './Login.css';
import Logo from '../img/qpost-blue-small.png';
import axios from 'axios';
import SessionUtil from '../Session/SessionUtil';

class Login extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			email: "",
			password: "",
			loginInProgress: false
		};
	}
	
	componentDidMount(){
		/*document.body.classList.add("bg-primary");
		document.body.classList.add("text-white");*/
	}
	
	componentWillUnmount(){
		/*document.body.classList.remove("bg-primary");
		document.body.classList.remove("text-white");*/
	}
	
	validateForm(){
		return this.state.email.length > 0 && this.state.password.length > 0;
	}
	
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}
	
	handleSubmit = event => {
		event.preventDefault();
		
		if(this.validateForm() && this.state.loginInProgress === false){
			this.setState({loginInProgress: true});

			axios.get("https://qpost.gigadrivegroup.com/api/token/request",{params: {email: this.state.email, password: this.state.password}})
				.then(res => {
					const data = res.data;

					if(data.hasOwnProperty("token")){
						const token = data.token;

						SessionUtil.setSessionToken(token.id);
						SessionUtil.setCurrentUserId(data.user.id);

						SessionUtil.validateLogin(() => {
							console.log(SessionUtil.getSessionToken());

							// TODO
							this.setState({loginInProgress: false});
						});
					} else if(data.hasOwnProperty("error")){
						document.getElementById("login-error-alert").classList.remove("d-none");
						document.getElementById("login-error-alert").innerHTML = data.error;

						setTimeout(() => {
							document.getElementById("login-error-alert").classList.add("d-none");
						}, 5*1000);
						this.setState({loginInProgress: false});
					}
				});
		}
	}

	handleCreateAccount = event => {

	}
	
	render() {
		let year = (new Date()).getFullYear();

		let copyrightNotice = "© " + year + " Gigadrive Group";
		if(year !== 2018){
			copyrightNotice = "© 2018-" + year + " Gigadrive Group";
		}

		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<div className="text-center mb-3">
					<img src={Logo} alt="qpost"/>
				</div>

				<Alert color="danger" id="login-error-alert" className="d-none">
					&nbsp;
				</Alert>

				<Label for="email" className="sr-only">Email</Label>
				<Input type="text" name="email" id="email" placeholder="Email or username" onChange={this.handleChange}/>
				
				<Label for="password" className="sr-only">Password</Label>
				<Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange}/>
				
				<Button type="submit" block={true} color="primary" size="lg">Log in</Button>
				<Button type="button" block={true} color="light" onClick={this.handleCreateAccount} size="lg">Create account</Button>

				<p className="mt-5 mb-3 text-muted text-center">{copyrightNotice}</p>
			</Form>
		);
	}
}

export default Login;
