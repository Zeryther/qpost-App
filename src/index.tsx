import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import NightMode from "./Util/NightMode/NightMode";
import App from "./App";
import "./main.css";

if(NightMode.isActive()){
	require("./Util/NightMode/nightmode.bootstrap.min.css");
	require("./Util/NightMode/nightmode.css");

	ReactDOM.render(<App />, document.getElementById("root"));
} else {
	require("bootstrap/dist/css/bootstrap.min.css");

	ReactDOM.render(<App />, document.getElementById("root"));
}

registerServiceWorker();
