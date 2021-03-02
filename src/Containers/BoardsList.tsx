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
	loadBoard: (board: any) => void
	removeBoard: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function BoardsList({title, loadBoard, removeBoard}: Props) {
	const classes = useStyles();

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		loadBoard((e.target as HTMLElement).parentElement!.parentElement!.parentElement!.id);
	};

	return (
		<div className={classes.root}>
			<Button className={classes.moodTitle} color="primary" variant="contained" onClick={clickHandler}>
				{title}
			</Button>
			<Button className={classes.removeBtn} variant="contained" onClick={removeBoard}>
				<DeleteForeverIcon />
			</Button>
		</div>
	);
};

export default BoardsList;
