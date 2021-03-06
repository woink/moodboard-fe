import { useState } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';

function CreateBoard() {
	const [title, setTitle] = useState('');

	const submitHandler = async (e: React.SyntheticEvent) => {
		e.preventDefault();
			await axios.post('/boards', {
				user_id: 1,
				title: title
			})
			setTitle('')
	};

	return (
		<>
			<form onSubmit={submitHandler}>
				<TextField
					required
					label="Title"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
						setTitle(e.target.value)
					}
					value={title}
				/>
			</form>
		</>
	);
}

export default CreateBoard;
