import { useState, useEffect } from 'react';
import { Typography, TextField} from '@material-ui/core';
import BoardsList from './BoardsList';
import chalk from 'chalk'
import axios from 'axios'

type Props = {
	loadBoard: (id: string) => void;
};

type TBoard = {
	_id: string
	title: string
}

function BoardContainer({ loadBoard }: Props) {
	const [boardsArray, setBoardsArray] = useState<TBoard[]>([]);
	const [title, setTitle] = useState('');

	// load all boards when drawer is opened
	useEffect(() => {
		(async function fetchBoards() {
			const response = await axios('/boards')
			setBoardsArray(response.data)
		})()
	}, []);

	const renderBoards = () => {
			return boardsArray!.map((board) => {
				return (
						<BoardsList
							key={board._id}
							boardId={board._id}
							title={board.title}
							loadBoard={loadBoard}
							removeBoard={removeBoard}
						/>
				);
			});
	};

	const removeBoard = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const boardId = (e.currentTarget as HTMLElement).dataset.boardid
		try {
			const response = await axios.delete(`/boards/${boardId}`)
			const newBoardsArray = boardsArray.filter((el) => el._id !== response.data._id)
			setBoardsArray(newBoardsArray)
		} catch (error) {
			console.error(chalk.red(error.message))
		}
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await axios.post('/boards/create', {
					title: title
			})
			const newBoard = response.data
			setBoardsArray([...boardsArray, newBoard])
			setTitle('')
		} catch (error) {
				console.log(chalk.red(error))
		}
	}

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	return (
		<>
			<Typography variant="h6" style={titleStyle} gutterBottom={false}>
				Create Board
			</Typography>
			<div style={form}>
				<form onSubmit={submitHandler}>
					<TextField
						required
						label="Title"
						variant="outlined"
						size="small"
						onChange={changeHandler}
						value={title}
						style={textField}
					/>
				</form>
			</div>
			{renderBoards()}
		</>
	);
}

export default BoardContainer;

const titleStyle = {
	display: 'flex',
	justifyContent: 'center',
	marginTop: '3vh',
};

const textField = {
	// display: 'flex',
	justifyContent: 'center',
};

const form = {
	display: 'flex',
	justifyContent: 'center',
	marginTop: '2vh',
	marginBottom: '1vh',
};
