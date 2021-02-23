import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		display: 'flex',
		// flexDirection: 'row',
		
	},
	removeBtn: {
		marginTop: '1.5vh',
		marginLeft: '15vw',
		justifyContent: 'center',
		alignItems: 'stretch'
	}
}))

export default function UploadPane(props) {
	const classes = useStyles()

	const handleUploadSubmit = (e) => {
		e.preventDefault();

		// const token = localStorage.getItem('token');
		const files = e.target.files;
		console.log('Files: ', e.target.files);
		for (const file of files) {
			const formData = new FormData();
			formData.append('img_src', file);
			fetch('http://localhost:3000/images', {
				method: 'POST',
				// headers: {
				// Authorization: `Bearer ${token}`,
				// },
				body: formData,
			})
				.then((resp) => resp.json())
				.then((newImage) => {
					// createBoardAssociation(newImage.id);
					props.imgUploaded(newImage);
				});
		}
	};

	return (
		<div className={classes.removeBtn}>
			<label className={classes.removeBtn} htmlFor='image-upload'>

					<input
						type="file"
						accept="image/*"
						id="image-upload"
						multiple="multiple"
						onChange={handleUploadSubmit}
						style={{ display: 'none' }}
				/>

				<Button className={classes.removeBtn} component='span' variant='contained'>
					Upload Images
				</Button>
				</label>
		</div>
	);
}