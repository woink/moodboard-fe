import { useState } from 'react';
import { TextField } from '@material-ui/core';

function CreateBoard() {
	const [title, setTitle] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();

		fetch('http://localhost:3000/boards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accepts: 'application/json',
				// Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				user_id: 1,
				title: title,
			}),
		})
			.then((resp) => resp.json())
			.then((newBoard) => {
				console.log('post new board', newBoard);
				setSubmitted(false);
				setTitle('');
			});
	};

	const changeHandler = (e) => {
		setTitle(e.target.value);
	};

	return (
		<>
			<form onSubmit={submitHandler}>
				<TextField
					required
					label="Title"
					onChange={changeHandler}
					value={title}
				/>
			</form>
		</>
	);
}

export default CreateBoard;
