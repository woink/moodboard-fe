import React from 'react'
import { Button } from '@material-ui/core'
import CreateBoard from './CreateBoard'
import BoardsList from './BoardsList'

class BoardContainer extends React.Component {
  
  state = {
    // user: this.state.user,
    boardsArray: []
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    fetch('http://localhost:3000/boards', {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
        return <BoardsList key={board.id} title={board.title} />
      })
    }
  }


  clickHandler = () => {
    console.log('createBoard')
  }
  render() {

    return (
      <>
      <Button onClick={this.clickHandler}>Create Board</Button>
      {this.renderBoards()}
      </>
      )
  }
}

export default BoardContainer