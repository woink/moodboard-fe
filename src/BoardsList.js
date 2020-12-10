import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			justifyContent: 'space-between'
		},
	},
	moodTitle: {
		removeBtn: {
			backgroundColor: 'red'
		},
		flexDirection: 'row',
		marginLeft: '2vw',
		justifyContent: 'space-between',
		flex: 1
	},
	
	}
));

const BoardsList = (props) => {
	const classes = useStyles();

	const clickHandler = (e) => {
		props.loadBoard(e.target.parentElement.parentElement.parentElement.id);
	};

	return (
		<div className={classes.root}>
			<Button className={classes.moodTitle} color="primary" variant="contained" onClick={clickHandler}>
				{props.title}
			</Button>
			<Button className={classes.removeBtn}  backgroundColor='red' color="#ffebee" variant="contained" onClick={props.removeBoard}>
				<DeleteForeverIcon />
			</Button>
		</div>
	);
};

export default BoardsList;

