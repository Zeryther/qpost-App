import React, { Component } from "react";
import { Button, Form, Label, Input } from 'reactstrap';
import './Login.css';
import Logo from '../img/qpost-blue-small.png';

class Login extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			email: "",
			password: ""
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

		console.log(event.target.id);
		console.log(event.target.value);
	}
	
	handleSubmit = event => {
		event.preventDefault();
		
		if(this.validateForm()){
			console.log("submit");
		}
	}

	handleCreateAccount = event => {

	}
	
	render() {
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<div className="text-center mb-3">
					<img src={Logo} alt="qpost"/>
				</div>

				<Label for="email" className="sr-only">Email</Label>
				<Input type="text" name="email" id="email" placeholder="Email or username" onChange={this.handleChange}/>
				
				<Label for="password" className="sr-only">Password</Label>
				<Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange}/>
				
				<Button type="submit" block={true} color="primary">Log in</Button>
				<Button type="button" block={true} color="light" onClick={this.handleCreateAccount}>Create account</Button>
			</Form>
		);
	}
}

export default Login;
