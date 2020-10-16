import React from 'react';
import { Button } from '@material-ui/core';

const BoardsList = (props) => {

  const clickHandler = (e) => {
    props.loadBoard(e.target.parentElement.parentElement.parentElement.id)
	};

	return (
		<div>
			<Button onClick={clickHandler}>{props.title}</Button>
			<Button onClick={props.removeBoard}>X</Button>
		</div>
	);
};

export default BoardsList;
