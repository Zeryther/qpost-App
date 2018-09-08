import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: "",
			password: ""
		};
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

		// TODO
		console.log("submit");
	}

	render() {
		return (
			<div classname="login">
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input type="email" name="email" id="email" placeholder="Email"/>
					</FormGroup>

					<FormGroup>
						<Label for="password">Password</Label>
						<Input type="password" name="password" id="password" placeholder="Password"/>
					</FormGroup>

					<Button type="submit">Submit</Button>
				</Form>
			</div>
		);
	}
}