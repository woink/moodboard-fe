import React, { useState } from 'react'
import { TextField } from '@material-ui/core'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <form>
        <TextField
          label="username"
          required="true"
          size="small"
          variant="outlined"
          value={username}
          onChange={setUsername}
        />
        <TextField
          label="password"
          required="true"
          size="small"
          variant="outlined"
          value={password}
          onChange={setPassword}
        />
      </form>
    </>
  
    )
}

export default Login