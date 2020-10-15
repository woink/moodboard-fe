import React from 'react'
import { Button } from '@material-ui/core'

function BoardsList(props) {
console.log("BoardsList: ", props)
  return (
    <div>
      <Button>{props.title}</Button>
      <Button onClick={props.removeBoard}>X</Button>
    </div>
  )
}

export default BoardsList