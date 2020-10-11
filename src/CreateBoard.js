import React from 'react'
import { TextField } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

class CreateBoard extends React.Component {

  state = {
    title: '',
    submitted: false,
  }

  submitHandler = e => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    fetch('http://localhost:3000/boards', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: this.props.user.user.id,
        title: this.state.title
      }),
    })
      .then(resp => resp.json())
      .then(newBoard => {
        console.log('post new board', newBoard)
        this.setState({
          submitted: true,
          title: ''
        })
      })
    
  }

  changeHandler = e => {
    this.setState({
      title: e.target.value
    })
  }
  
  render() {
    console.log(this.state.submitted)

    return (
      <>
        <form onSubmit={this.submitHandler}>
          <TextField
            required
            label="Title"
            onChange={this.changeHandler}
            value={this.state.title}
          />
        </form>
        {this.state.submitted ? <Redirect to="/" /> : null}
      </>
    )
  }
}

export default CreateBoard