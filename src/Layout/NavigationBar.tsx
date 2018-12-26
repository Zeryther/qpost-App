import React, { Component } from "react";
import Util from "../Util/Util";
import { Collapse, Navbar, NavbarToggler, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from "reactstrap";
import NightMode from "../Util/NightMode/NightMode";
import { Link, withRouter as _withRouter } from "react-router-dom";
import VerifiedCheck from "./Profile/VerifiedCheck";

class NavigationBar extends Component<any,any> {
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

	iconLinkName = name => {
		let b = true;

		b = false;
		// TODO

		return b ? "main-nav-link-active-big" : "main-nav-link-inactive-big";
	}

	render() {
		const color = NightMode.isActive() ? "dark" : "light";
		const dark = NightMode.isActive();
		const light = !NightMode.isActive();

		const nightModeLabel = NightMode.isActive() ? "Disable night mode" : "Enable night mode";

		const iconSize = "34px";

		let selfLink = "/";
		selfLink = selfLink.concat(Util.getCurrentUser().username);

		return Util.isLoggedIn() ? (
			<Navbar color={color} dark={dark} light={light} expand={true} className="shadow-sm">
				<Container>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="d-none d-md-flex" navbar>
							<Link to="/" className="mr-4">
								<div className={this.iconLinkName("HOME")}>
									<i className="fas fa-home" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/notifications" className="mr-4">
								<div className={this.iconLinkName("NOTIFICATIONS")}>
									<i className="fas fa-bell" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/search" className="mr-4">
								<div className={this.iconLinkName("SEARCH")}>
									<i className="fas fa-search" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/messages" className="mr-4">
								<div className={this.iconLinkName("MESSAGES")}>
									<i className="fas fa-envelope" style={{fontSize: iconSize}}/>
								</div>
							</Link>
						</Nav>

						<Nav className="d-none d-sm-flex d-md-none" navbar>
							<Link to="/" className="mr-4">
								<div className={this.iconLinkName("HOME")}>
									<i className="fas fa-home" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/notifications" className="mr-4">
								<div className={this.iconLinkName("NOTIFICATIONS")}>
									<i className="fas fa-bell" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/search" className="mr-4">
								<div className={this.iconLinkName("SEARCH")}>
									<i className="fas fa-search" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/messages" className="mr-4">
								<div className={this.iconLinkName("MESSAGES")}>
									<i className="fas fa-envelope" style={{fontSize: iconSize}}/>
								</div>
							</Link>
						</Nav>

						<Nav className="d-flex d-sm-none" navbar>
							<Link to="/" className="mr-4">
								<div className={this.iconLinkName("HOME")}>
									<i className="fas fa-home" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/notifications" className="mr-4">
								<div className={this.iconLinkName("NOTIFICATIONS")}>
									<i className="fas fa-bell" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/search" className="mr-4">
								<div className={this.iconLinkName("SEARCH")}>
									<i className="fas fa-search" style={{fontSize: iconSize}}/>
								</div>
							</Link>

							<Link to="/messages" className="mr-4">
								<div className={this.iconLinkName("MESSAGES")}>
									<i className="fas fa-envelope" style={{fontSize: iconSize}}/>
								</div>
							</Link>
						</Nav>

						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav>
									<img className="border border-white rounded" src={Util.getCurrentUser().avatar} alt={Util.getCurrentUser().username} style={{width: "32px",height: "32px"}}/>
								</DropdownToggle>

								<DropdownMenu right className="fade">
									<Link to={selfLink} className="dropdown-item">
										<div className="font-weight-bold" style={{fontSize: "21px"}}>
											{Util.getCurrentUser().displayName}<VerifiedCheck status={Util.getCurrentUser().verified}/>
										</div>

										<div className="text-muted" style={{marginTop: "-8px"}}>
											@{Util.getCurrentUser().username}
										</div>
									</Link>

									<DropdownItem divider />

									<Link to={selfLink} className="dropdown-item">
										<i className="far fa-user"/> Profile
									</Link>

									<Link to="/notifications" className="dropdown-item">
										<i className="far fa-bell"/> Notifications
									</Link>

									<Link to="/messages" className="dropdown-item">
										<i className="far fa-envelope"/> Messages
									</Link>

									<DropdownItem divider />

									<Link to="/edit" className="dropdown-item">
										Edit profile
									</Link>

									<Link to="/settings" className="dropdown-item">
										Settings and privacy
									</Link>

									<Link to="/logout" className="dropdown-item">
										Log out
									</Link>

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
	