import React from "react";
import "./App.css";
import AppRoutes from "./Routes";

class App extends React.Component {
	render() {
		return (
			<div className="base-app">
				<AppRoutes />
			</div>
		);
	}
}

export default App;
