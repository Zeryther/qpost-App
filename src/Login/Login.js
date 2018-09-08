import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: "",
			password: ""
		};
	}

	componentDidMount(){
		document.body.classList.add("bg-primary");
		document.body.classList.add("text-white");
	}

	componentWillUnmount(){
		document.body.classList.remove("bg-primary");
		document.body.classList.remove("text-white");
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
			<Row>
				<Col xs={{ size: 10, offset: 1 }}>
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
				</Col>
			</Row>
		);
	}
}

export default Login;
