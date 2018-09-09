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

	toggleNightMode = event => {
		event.preventDefault();

		NightMode.toggle();
	}

	render() {
		let color = NightMode.isActive() ? "dark" : "light";
		let dark = NightMode.isActive();
		let light = !NightMode.isActive();

		let nightModeLabel = NightMode.isActive() ? "Disable night mode" : "Enable night mode";

		return SessionUtil.isLoggedIn() ? (
			<Navbar color={color} dark={dark} light={light} expand={true}>
				<Container>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink href="/"><i className="fas fa-home mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/"><i className="fas fa-bell mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/"><i className="fas fa-search mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="/"><i className="fas fa-envelope mr-3" style={{fontSize: "34px"}}></i></NavLink>
							</NavItem>
						</Nav>

						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav>
									<img className="border border-white rounded" src={SessionUtil.getCurrentUser().avatar} style={{width: "32px",height: "32px"}}/>
								</DropdownToggle>

								<DropdownMenu right>
									<DropdownItem>
										Option 1
									</DropdownItem>

									<DropdownItem>
										Option 2
									</DropdownItem>

									<DropdownItem divider />

									<DropdownItem onClick={this.toggleNightMode}>
										{nightModeLabel}
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
	