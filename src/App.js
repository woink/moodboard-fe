import React from 'react';
import './App.css';
import Main from './Main'
import Login from './Login'
import Drawer from './Drawer'
import { Switch, Route} from 'react-router-dom'
class App extends React.Component {
  state = {
    board: 1
		// user: null,
  };

  // componentDidMount(){
  //   const token = localStorage.getItem('token')
  //   if(token){
  //     fetch('http://localhost:3000/api/v1/profile', {
  //       method: 'GET',
  //       headers: { Authorization: `Bearer ${token}`},
  //     }).then(response => response.json())
  //     .then(theUser => {
  //       this.setState({
  //         user: theUser
  //       })
  //     })
  //   } else {
  //     this.setState({
  //       user: null
  //     })
  //   }
  // }
  
  loginHandler = (userInfo) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({ user: userInfo })
    })
      .then(resp => resp.json())
      .then(theUser => {
        console.log(theUser)
        // if(theUser.message !== 'Invalid username or password') {
          localStorage.setItem('token', theUser.jwt)
          this.setState({
            user: theUser
          })
        // }
      })
  }

  render() {
		return (
      <>
        {/* { this.state.user ? */}
          <>
            <Drawer />
            
          <Route path='/' exact render={() => <Main board={this.state.board}/>}/>
            
            {/* user={this.state.user} */}
            
          </>
          {/* : */}
          {/* <Login signupHandler={this.signupHandler} loginHandler={this.loginHandler} />}
       */}
        </>
        );
      }
}

export default App;
