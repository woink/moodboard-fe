import React, { useState } from 'react';
import Dropzone from 'react-dropzone'

export default function UploadPane(props) {
	const [images, setImage] = useState('');
	const maxSize = 104576

	const handleImageChange = (e) => {
		setImage(e.target.files);
	};

	const handleUploadSubmit = (e) => {
		e.preventDefault();

		// const token = localStorage.getItem('token');
		const files = images
		console.log("Files: ", files)
		for(const file of files) {
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
				})
		}
	
	}

	// const onDrop = (acceptedFiles) => {
	// 	console.log(acceptedFiles)
	// }

	console.log("Images: ", images)

	return (
		<div style={uploadDiv}>
			<form onSubmit={handleUploadSubmit}>
				<label>
					Image File
					<input
						type="file"
						accept="image/*"
						name="image"
						multiple="multiple"
						onChange={handleImageChange}
					/>
				</label>
				<button type="submit" value="Submit">
					Submit
				</button>
			</form>
		</div>
	);
}

const uploadDiv = {
	flexDirection: 'column',
	border: '1px solid black',
};

	// const createBoardAssociation = (newImageID) => {
	// 	// const token = localStorage.getItem('token');
	// 	fetch('http://localhost:3000/board_images', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			accepts: 'application/json',
	// 			// Authorization: `Bearer ${token}`,
	// 		},
	// 		body: JSON.stringify({
	// 			board_id: props.board,
	// 			image_id: newImageID,
	// 		}),
	// 	});
	// };

	// useEffect((props) => {
	//   props.imgUploaded = true
	// }, [uploaded])