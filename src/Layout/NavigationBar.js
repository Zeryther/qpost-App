import React, { Component } from "react";
import SessionUtil from "../Util/Session/SessionUtil";
import { Collapse, Navbar, NavbarToggler, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';
import NightMode from "../Util/NightMode/NightMode";
import { Link } from "react-router-dom";

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

		let iconSize = "34px";

		let selfLink = "/";
		selfLink = selfLink.concat(SessionUtil.getCurrentUser().username);

		return SessionUtil.isLoggedIn() ? (
			<Navbar color={color} dark={dark} light={light} expand={true}>
				<Container>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="d-none d-md-flex" navbar>
							<Link to="/" className="mr-4">
								<div className={this.props.active && this.props.active === "home" ? "main-nav-link-active-big" : "main-nav-link-inactive-big"}>
									<i className="fas fa-home" style={{fontSize: iconSize}}></i>
								</div>
							</Link>

							<Link to="/notifications" className="mr-4">
								<div className={this.props.active && this.props.active === "notifications" ? "main-nav-link-active-big" : "main-nav-link-inactive-big"}>
									<i className="fas fa-bell" style={{fontSize: iconSize}}></i>
								</div>
							</Link>

							<Link to="/search" className="mr-4">
								<div className={this.props.active && this.props.active === "search" ? "main-nav-link-active-big" : "main-nav-link-inactive-big"}>
									<i className="fas fa-search" style={{fontSize: iconSize}}></i>
								</div>
							</Link>

							<Link to="/messages" className="mr-4">
								<div className={this.props.active && this.props.active === "messages" ? "main-nav-link-active-big" : "main-nav-link-inactive-big"}>
									<i className="fas fa-envelope" style={{fontSize: iconSize}}></i>
								</div>
							</Link>
						</Nav>

						<Nav className="d-flex d-md-none" navbar>
							<Link to="/" className="mr-4">
								<div className={this.props.active && this.props.active === "home" ? "main-nav-link-active" : "main-nav-link-inactive"}>
									<i className="fas fa-home" style={{fontSize: iconSize}}></i>
								</div>
							</Link>

							<Link to="/notifications" className="mr-4">
								<div className={this.props.active && this.props.active === "notifications" ? "main-nav-link-active" : "main-nav-link-inactive"}>
									<i className="fas fa-bell" style={{fontSize: iconSize}}></i>
								</div>
							</Link>

							<Link to="/search" className="mr-4">
								<div className={this.props.active && this.props.active === "search" ? "main-nav-link-active" : "main-nav-link-inactive"}>
									<i className="fas fa-search" style={{fontSize: iconSize}}></i>
								</div>
							</Link>

							<Link to="/messages" className="mr-4">
								<div className={this.props.active && this.props.active === "messages" ? "main-nav-link-active" : "main-nav-link-inactive"}>
									<i className="fas fa-envelope" style={{fontSize: iconSize}}></i>
								</div>
							</Link>
						</Nav>

						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav>
									<img className="border border-white rounded" src={SessionUtil.getCurrentUser().avatar} alt={SessionUtil.getCurrentUser().username} style={{width: "32px",height: "32px"}}/>
								</DropdownToggle>

								<DropdownMenu right>
									<Link to={selfLink} className="dropdown-item">
										<div className="font-weight-bold" style={{fontSize: "21px"}}>
											{SessionUtil.getCurrentUser().displayName}
										</div>

										<div className="text-muted" style={{marginTop: "-8px"}}>
											@{SessionUtil.getCurrentUser().username}
										</div>
									</Link>

									<DropdownItem divider />

									<Link to={selfLink} className="dropdown-item">
										<i className="far fa-user"></i> Profile
									</Link>

									<Link to="/notifications" className="dropdown-item">
										<i className="far fa-bell"></i> Notifications
									</Link>

									<Link to="/messages" className="dropdown-item">
										<i className="far fa-envelope"></i> Messages
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
	