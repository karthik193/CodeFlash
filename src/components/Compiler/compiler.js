import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class NavBar extends React.Component {
	render() {
		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="#home">CodeFlash</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#runCode">Run Code</Nav.Link>
						<Nav.Link href="#stopExecution">Stop</Nav.Link>
						<NavDropdown
							title="Language"
							id="collasible-nav-dropdown"
						>
							<NavDropdown.Item href="#action/3.1">
								C
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								C++
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">
								Java
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">
								Python
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

class Compiler extends React.Component {
	// requesting token to API
	// using token to send input and get the response
	// managing the UI

	render() {
		return (
			<>
				<NavBar />
				<body>
					<div class="container-fluid box-wrapper">
						<div id="total">
							<textarea
								className="col-xs-12 col-sm-6 col-md-8"
								id="editor"
							>
								Editor
							</textarea>
							<div class="input-output col-sm-6 col-md-4">
								<textarea id="inputField">Input</textarea>
								<textarea id="outputField">Output</textarea>
							</div>
						</div>
					</div>
				</body>
			</>
		);
	}
}
export default Compiler;
