import { useState, useEffect } from 'react';
import { Typography, TextField } from '@material-ui/core';
import BoardsList from '../BoardsList';

function BoardContainer({ loadBoard }) {
	const [boardsArray] = useState([]);
	const [title, setTitle] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/boards', {})
			.then((resp) => resp.json())
			.then((boards) => {
				this.setState({
					boardsArray: boards,
				});
			});
	}, []);

	const renderBoards = () => {
		const boards = boardsArray;
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

	const removeBoard = (e) => {
		const boardId =
			e.target.parentElement.parentElement.parentElement.parentElement.id;
		console.log(boardId);
		fetch(`http://localhost:3000/boards/${boardId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json',
			},
		});
		const newArray = boardsArray.filter(
			(stateBoard) => stateBoard.id !== parseInt(boardId)
		);
		console.log(boardId);
		this.setState({
			boardsArray: newArray,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		fetch('http://localhost:3000/boards', {
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
			.then((resp) => resp.json())
			.then((board) => {
				console.log(board);
				const newBoardsArray = [...boardsArray, board];
				this.setState({
					boardsArray: newBoardsArray,
					title: '',
				});
			});
	};

	const changeHandler = (e) => {
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
