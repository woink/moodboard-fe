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
		flexDirection: 'row',
		marginLeft: '2vw',
		justifyContent: 'space-between',
		flex: 1
	},
	removeBtn: {
		flexDirection: 'row',
		marginLeft: '2vw',
		justifyContent: 'space-between',
		flex: 1,
		backgroundColor: 'red'
	}
}));

type Props = {
	title: string
	boardId: string
	loadBoard: (board: string) => void
	removeBoard: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function BoardsList({title, loadBoard, removeBoard, boardId}: Props) {
	const classes = useStyles();

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const selectedBoard = e.currentTarget.dataset.boardid
		if (selectedBoard) {
			loadBoard(selectedBoard)
		} else {
			throw new Error('Board not found')
		}
	};

	return (
		<div className={classes.root}>
			<Button data-boardid={boardId} className={classes.moodTitle} color="primary" variant="contained" onClick={clickHandler}>
				{title}
			</Button>
			<Button className={classes.removeBtn} data-boardid={boardId} variant="contained" onClick={removeBoard}>
				<DeleteForeverIcon />
			</Button>
		</div>
	);
};

export default BoardsList;
