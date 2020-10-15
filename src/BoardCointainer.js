import React from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import CreateBoard from './CreateBoard'
import BoardsList from './BoardsList'

class BoardContainer extends React.Component {
  
  state = {
    boardsArray: [],
    title: ''
  }

    componentDidMount() {
       // const token = localStorage.getItem('token')
    fetch('http://localhost:3000/boards', {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
      .then(resp => resp.json())
      .then(boards => {
        console.log("In get request: ", boards)
        this.setState({
          boardsArray: boards
        })
      }
      )
  }

  renderBoards = () => {
    const boards = this.state.boardsArray
    if (boards.length > 0) {
      return boards.map(board => {
        console.log("renderBoard: ", board.id)
        return (
          <div id={board.id} style={boardDiv}>
            <BoardsList key={board.id} title={board.title} loadBoard={this.loadBoard} removeBoard={this.removeBoard} />
          </div>
        )
      })
    }
  }
  
  removeBoard = (e) => {
    const boardId = e.target.parentElement.parentElement.parentElement.id
    fetch(`http://localhost:3000/boards/${boardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    const newArray = this.state.boardsArray.filter(stateBoard => stateBoard.id !== parseInt(boardId))
    console.log(boardId)
    this.setState({
      boardsArray: newArray
    })
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
        user_id: 1,
        title: this.state.title
      }),
    })
      .then(resp => resp.json())
      .then(board => {
        console.log(board)
        const newBoardsArray = [...this.state.boardsArray, board]
        this.setState({
          boardsArray: newBoardsArray,
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
    console.log(this.state.boardsArray)

    // console.log(this.state.title)
    return (
      <>
        <Typography>Create Board</Typography>
        <>
        <form onSubmit={this.submitHandler}>
          <TextField
            required
            label="Title"
            onChange={this.changeHandler}
            value={this.state.title}
              
            />
          </form>
          </>
      {this.renderBoards()}
      </>
      )
  }
}

export default BoardContainer

const boardDiv = {
 display: 'flex'
}