import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NightMode from './Util/NightMode/NightMode';

if(NightMode.isActive()){
	require("./Util/NightMode/nightmode.bootstrap.min.css");
	require("./Util/NightMode/nightmode.css");

	ReactDOM.render(<App />, document.getElementById("root"));
} else {
	require("bootstrap/dist/css/bootstrap.min.css");
	require("./main.css");

	ReactDOM.render(<App />, document.getElementById("root"));
}

registerServiceWorker();
