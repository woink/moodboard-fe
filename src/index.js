import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const mainTheme = createMuiTheme({
  palette: {
    primary: { main: '#455a64' },
    secondary: {
      main: '#9ea7aa'
    }
  }
})

ReactDOM.render(
	<ThemeProvider theme={mainTheme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
