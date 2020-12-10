import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import BoardsList from './BoardsList';

class BoardContainer extends React.Component {
	state = {
		boardsArray: [],
		title: '',
	};

	componentDidMount() {
		fetch('http://localhost:3000/boards', {
		})
			.then((resp) => resp.json())
			.then((boards) => {
				this.setState({
					boardsArray: boards,
				});
			});
	}

	renderBoards = () => {
		const boards = this.state.boardsArray;
		if (boards.length > 0) {
			return boards.map((board) => {
				return (
					<div id={board.id}>
						<BoardsList
							key={board.id}
							title={board.title}
							loadBoard={this.props.loadBoard}
              removeBoard={this.removeBoard}
						/>
					</div>
				);
			});
		}
	};

	removeBoard = e => {
    const boardId = e.target.parentElement.parentElement.parentElement.parentElement.id
    console.log(boardId)
		fetch(`http://localhost:3000/boards/${boardId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json',
			},
		});
		const newArray = this.state.boardsArray.filter(
			(stateBoard) => stateBoard.id !== parseInt(boardId)
		);
		console.log(boardId);
		this.setState({
			boardsArray: newArray,
		});
	};

	submitHandler = (e) => {
		e.preventDefault();
		fetch('http://localhost:3000/boards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accepts: 'application/json',
			},
			body: JSON.stringify({
				user_id: 1,
				title: this.state.title,
			}),
		})
			.then((resp) => resp.json())
			.then((board) => {
				console.log(board);
				const newBoardsArray = [...this.state.boardsArray, board];
				this.setState({
					boardsArray: newBoardsArray,
					title: '',
				});
			});
	};

	changeHandler = (e) => {
		this.setState({
			title: e.target.value,
		});
	};

	render() {
		console.log('BoardContainer :', this.props.loadBoard);
		// console.log(this.state.title)
		return (
			<>
				<Typography variant="h6" style={title} gutterBottom={false}>
					Create Board
				</Typography>
				<div style={form}>
					<form onSubmit={this.submitHandler}>
						<TextField
							required
              label="Title"
              variant="outlined"
              size="small"
							onChange={this.changeHandler}
							value={this.state.title}
							style={textField}
						/>
					</form>
        </div>
        
				{this.renderBoards()}
			</>
		);
	}
}

export default BoardContainer;

const title = {
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
  marginBottom: '1vh'
}