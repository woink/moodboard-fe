import React from 'react'
import { Button } from '@material-ui/core'

function BoardsList(props) {

  return (
    <div>
      <Button>{props.title}</Button>
    </div>
  )
}

export default BoardsList