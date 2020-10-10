import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { PinDropSharp } from '@material-ui/icons'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [email, setEmail] = useState('')

  const submitHandler = () => {
    e.preventDefault()
    if (password === confPassword) {
      fetch('http://localhost:3000/api/v1/users')
    } else {
      props.showError('Passwords must match')
    }

  }

  return (
		<>
			<form onSubmit={submitHandler}>
				<TextField
					label="username"
					required="true"
					size="small"
					variant="outlined"
					value={username}
					onChange={setUsername}
				/>
				<TextField
					label="email"
					required="true"
					size="small"
					variant="outlined"
					value={email}
					onChange={setEmail}
				/>
				<TextField
					label="password"
					required="true"
					size="small"
					variant="outlined"
					value={password}
					onChange={setPassword}
				/>
				<TextField
					label="confPassword"
					required="true"
					size="small"
					variant="outlined"
					value={confPassword}
					onChange={setConfPassword}
				/>
				<Button
					style={submitBtn}
					color="primary"
					variant="contained"
					type="submit"
				>
					Log In
				</Button>
			</form>
		</>
	);
}

export default Login