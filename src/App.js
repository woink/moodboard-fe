import React from 'react';
import './App.css';
import Main from './Main';
import { Route } from 'react-router-dom';

class App extends React.Component {
	loginHandler = (userInfo) => {
		fetch('http://localhost:3000/api/v1/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json',
			},
			body: JSON.stringify({ user: userInfo }),
		})
			.then((resp) => resp.json())
			.then((theUser) => {
				localStorage.setItem('token', theUser.jwt);
				this.setState({
					user: theUser,
				});
				// }
			});
	};

	render() {
		return (
			<>
				<Route path="/" exact render={() => <Main />} />
			</>
		);
	}
}

export default App;
