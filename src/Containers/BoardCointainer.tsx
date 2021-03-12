import { useState, useEffect } from 'react';
import { Typography, TextField } from '@material-ui/core';
import BoardsList from './BoardsList';
import chalk from 'chalk'
import axios from 'axios'

// TODO: check if using props correctly
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

	useEffect(() => {
		(async function fetchBoards() {
			const response = await axios('/boards')
			setBoardsArray(response.data)
		})()
		setNewBoardState(false)
	}, [newBoardState]);

	const renderBoards = () => {
		const boards: any[] = boardsArray;
		if (boards.length > 0) {
			return boards.map((board) => {
				return (
					<div id={board.id}>
						<BoardsList
							key={board.id}
							title={board.title}
							loadBoard={loadBoard}
							removeBoard={removeBoard}
						/>
					</div>
				);
			});
		}
	};

			console.error(chalk.red(error.message))
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch('/boards/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accepts: 'application/json',
			},
			body: JSON.stringify({
				user_id: 1,
				title: title,
			}),
		})
		} catch (error) {
				console.log(chalk.red(error))
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
