import React, { Component } from "react";
import SessionUtil from "../Util/Session/SessionUtil";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';
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
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink href="/"><i class="fas fa-home mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/"><i class="fas fa-bell mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/"><i class="fas fa-search mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/"><i class="fas fa-envelope mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>
						</Nav>

						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav>
									<i class="fas fa-user" style={{fontSize: "34px"}}></i>
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
	