import React, { Component } from "react";
import SessionUtil from "../Session/SessionUtil";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';
import NightMode from "../Util/NightMode/NightMode";

class NavigationBar extends Component {
	constructor(props){
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle(){
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		let color = NightMode.isActive() ? "dark" : "light";
		let dark = NightMode.isActive();
		let light = !NightMode.isActive();

		return SessionUtil.isLoggedIn() ? (
			<Navbar color={color} dark={dark} light={light} expand={true}>
				<Container>
					<NavbarBrand href="/">reactstrap</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/components/">Components</NavLink>
							</NavItem>
							
							<NavItem>
								<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
							</NavItem>

							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Options
								</DropdownToggle>

								<DropdownMenu right>
									<DropdownItem>
										Option 1
									</DropdownItem>

									<DropdownItem>
										Option 2
									</DropdownItem>

									<DropdownItem divider />

									<DropdownItem>
										Reset
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		) : null;
	}
}
	
	export default NavigationBar;
	