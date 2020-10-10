import React from 'react';
import './App.css';
import Main from './Main'
import Login from './Login'

class App extends React.Component {
	state = {
		user: null,
  };
  
  loginHandler = (userInfo) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    })
      .then(resp => resp.json())
      .then(theUser => {
        console.log(theUser)
        if(theUser.message !== 'Invalid username or password') {
          localStorage.setItem('token', theUser.jwt)
          this.setState({
            user: theUser
          })
        }
      })
  }

	render() {
		return (
      <>
        { this.state.user ?
          <>
            <Main />
          </>
          :
          <Login signupHandler={this.signupHandler} loginHandler={this.loginHandler} />}
      
        </>
        );
      }
}

export default App;
