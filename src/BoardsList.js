import React from 'react';
import { Button } from '@material-ui/core';

const BoardsList = (props) => {

  const clickHandler = (e) => {
    // console.log(props)
    props.loadBoard(e.target.parentElement.parentElement.parentElement.id)
		// props.loadBoard(e.target.parentElement.parentElement.parentElement.id);
	};

	console.log('BoardsList: ', props);
	return (
		<div>
			<Button onClick={clickHandler}>{props.title}</Button>
			<Button onClick={props.removeBoard}>X</Button>
		</div>
	);
};

export default BoardsList;
