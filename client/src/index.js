

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Layout } from "./containers";
import { Routing } from "./constants/Routes";
import theme from "./constants/theme"
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/css/bootstrap.min.css'
import './assets/css/chaseyourdreams.css'

// This is the entry point for the app.
ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>	
			<Layout>
				<Routing />
			</Layout>
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
