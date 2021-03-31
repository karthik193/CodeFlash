import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Compiler/compiler.css";
import Compiler from "./components/Compiler/compiler";
function App() {
	return (
		<div className="App">
			<Compiler />
		</div>
	);
}

export default App;
