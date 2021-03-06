import { useState, useEffect } from 'react';
import { Typography, TextField, makeStyles } from '@material-ui/core';
import BoardsList from './BoardsList';
import chalk from 'chalk';
import axios from 'axios';

// CSS styles
const useStyles = makeStyles((theme: any) => ({
	root: {
		'& > *': {
			display: 'flex'
		},
	},
	titleStyle: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '3vh',
	},
	textField: {
		justifyContent: 'center'
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '2vh',
		marginBottom: '1vh',
	}
}))

// Container Types
type Props = {
	loadBoard: (id: string) => void;
};

type TBoard = {
	_id: string;
	title: string;
};

function BoardContainer({ loadBoard }: Props) {
	const [boardsArray, setBoardsArray] = useState<TBoard[]>([]);
	const [title, setTitle] = useState('');
	const classes = useStyles()

	// load all boards when drawer is opened
	useEffect(() => {
		(async function fetchBoards() {
			const response = await axios('/boards');
			setBoardsArray(response.data);
		})();
	}, []);

	const removeBoard = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const boardId = (e.currentTarget as HTMLElement).dataset.boardid;
		try {
			const response = await axios.delete(`/boards/${boardId}`);
			const newBoardsArray = boardsArray.filter(
				(el) => el._id !== response.data._id
			);
			setBoardsArray(newBoardsArray);
		} catch (error) {
			console.error(chalk.red(error.message));
		}
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post('/boards/create', {
				title: title,
			});
			const newBoard: TBoard = response.data;
			setBoardsArray([...boardsArray, newBoard]);
			setTitle('');
		} catch (error) {
			console.log(chalk.red(error.message));
		}
	};

	return (
		<>
			<Typography variant="h6" className={classes.titleStyle} gutterBottom={false}>
				Create Board
			</Typography>
			<div className={classes.form}>
				<form onSubmit={submitHandler}>
					<TextField
						required
						variant="outlined"
						size="small"
						className={classes.textField}
						label="Title"
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTitle(e.target.value)
						}
					/>
				</form>
			</div>
			{boardsArray!.map((board) => 
				<BoardsList
					key={board._id}
					boardId={board._id}
					title={board.title}
					loadBoard={loadBoard}
					removeBoard={removeBoard}
				/>
			)}
		</>
	);
}

export default BoardContainer;
