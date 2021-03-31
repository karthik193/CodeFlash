import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import React, { Component } from "react";
// import "./Compiler.css";

class Compiler extends Component {
	constructor(props) {
		super(props);

		this.state = {
			code: "",
			input: "",
			output: "",
			lang: 2,
		};
	}

	user_code = (event) => {
		event.preventDefault();
		this.setState({ code: event.target.value });
	};

	user_input = (event) => {
		event.preventDefault();
		this.setState({ input: event.target.value });
	};

	user_lang = (event) => {
		event.preventDefault();
		this.setState({ lang: event.target.value });
		console.log(event.target);
		console.log(event.target.value);
		console.log(event.target.name);
	};

	get_output = async (event) => {
		event.preventDefault();
		let op = document.getElementById("outputField");
		op.innerHTML = "";
		console.log("Submission created");
		//Sending a post request to the api along with all req parameters
		const response = await fetch(
			"https://judge0-extra-ce.p.rapidapi.com/submissions",
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					accept: "application/json",
					"x-rapidapi-key":
						"5c3346ba24mshc95a6692864c468p121751jsn16e1a102fa7f",
					"x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
					useQueryString: true,
				},
				body: JSON.stringify({
					source_code: this.state.code,
					stdin: this.state.input,
					language_id: this.state.lang,
				}),
			}
		);
		console.log("The result obtained is");
		console.log(response);
		//into json format
		const jsonResponse = await response.json();
		console.log("json");
		console.log(jsonResponse);

		let jsonGetOutput = {
			status: { description: "Queue" },
			stderr: null,
			compile_output: null,
		};
		while (
			jsonGetOutput.status.description !== "Accepted" &&
			jsonGetOutput.stderr == null &&
			jsonGetOutput.compile_output == null
		) {
			//checking for any errors
			//op.innerHTML=`Data Sent ...\nCreating Submission...\n Submission Created...\n Checking submission status\n status : ${jsonGetOutput.status.description}\n`;
			//to print each line
			if (jsonResponse.token) {
				let url = `https://judge0-extra-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

				//Retrieving the data using get request
				const finalAns = await fetch(url, {
					method: "GET",
					headers: {
						"content-type": "application/json",
						accept: "application/json",
						"x-rapidapi-key":
							"5c3346ba24mshc95a6692864c468p121751jsn16e1a102fa7f",
						"x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
						useQueryString: true,
					},
				});
				//Waiting until we recieve the output
				jsonGetOutput = await finalAns.json();
			}
			console.log(jsonGetOutput);
		}
		//for the output
		if (jsonGetOutput.stdout) {
			const output_rec = atob(jsonGetOutput.stdout);
			//clear output area for the req output
			op.value = " ";
			op.value += `\n Output : ${output_rec}\n Execution Time : ${jsonGetOutput.time} secs\n Memory used : ${jsonGetOutput.memory}`;
		}
		//for errors
		else if (jsonGetOutput.stderr) {
			const error = atob(jsonGetOutput.stderr);

			op.value = "";

			op.value += `\n Error :${error}`;
		} else {
			const compilation_error = atob(jsonGetOutput.compile_output);

			op.value = "";

			op.value += `\n Error :${compilation_error}`;
		}
	};

	render() {
		return (
			<>
				<div>
					<Navbar
						collapseOnSelect
						expand="lg"
						bg="dark"
						variant="dark"
					>
						<Navbar.Brand href="#home">CodeFlash</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link onClick={this.get_output}>
									Run Code
								</Nav.Link>
								<Nav.Link href="#stopExecution">Stop</Nav.Link>
								<NavDropdown
									title="Language"
									id="collasible-nav-dropdown"
									value={this.state.lang}
								>
									<NavDropdown.Item
										value={1}
										onClick={() =>
											this.setState({ lang: 1 })
										}
									>
										C
									</NavDropdown.Item>
									<NavDropdown.Item
										value={2}
										onClick={() =>
											this.setState({ lang: 2 })
										}
									>
										C++
									</NavDropdown.Item>
									<NavDropdown.Item
										value={4}
										onClick={() =>
											this.setState({ lang: 4 })
										}
									>
										Java
									</NavDropdown.Item>
									<NavDropdown.Item
										value={10}
										onClick={() =>
											this.setState({ lang: 10 })
										}
										name="python"
									>
										Python
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
				<body>
					<div class="container-fluid box-wrapper">
						<div id="total">
							<textarea
								className="col-xs-12 col-sm-6 col-md-8"
								id="code"
								onChange={this.user_code}
							>
								Editor
							</textarea>
							<div class="input-output col-sm-6 col-md-4">
								<textarea
									id="inputField"
									onChange={this.user_input}
								>
									Input
								</textarea>
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
