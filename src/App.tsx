import { useState, useEffect } from 'react';
import UploadPane from './Containers/UploadPane';
import ImgBin from './Containers/ImgBin';
import Drawer from './Components/Drawer';


function App() {
	const [images, setImages] = useState([]);
	const [boardId, setBoardId] = useState('');
	const [imageUploaded, setImageUploaded] = useState(false)

	useEffect(() => {
		fetch(`/images/`, {
			method: 'GET',
		})
		.then((resp) => resp.json())
		.then((upImages) => setImages(upImages));
		
		fetch(`/boards/${boardId}/`, {
			method: 'GET',
		})
			.then((resp) => resp.json())
		setImageUploaded(false)
	}, [imageUploaded]);
	
	// FIXME: state only wants never
	const imgUploaded = () => {
		setImageUploaded(true);
	};

	const loadBoard = (id: string) => {
		setBoardId(id);
	};

		// FIXME: Lookup to mongodb
	const removeImage = (imgId: number) => {
		console.log(imgId);
		fetch(`/images/${imgId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json',
			},
		})
			.then(() => {
				setImages(images);
			})
	};	

	const removeBoardImage = (stateBoardImgId: string, imgId: number) => {
		fetch(
			`/boards/${boardId}/board_images/${Number(
				stateBoardImgId
			)}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Accepts': 'application/json',
				},
			}
		);
		console.log(images);
		const newImgArray = images.filter((img: any) => img.id !== imgId);
		setImages(newImgArray);
		console.log('finished removing BoardImage', images);
	};

	return (
		<>
			<Drawer loadBoard={loadBoard} />
			<div>
				<UploadPane boardId={boardId} imgUploaded={imgUploaded} />
				<ImgBin
					removeImage={removeImage}
					removeImageFromBoard={removeBoardImage}
					boardId={boardId}
					images={images}
					setImages={setImages}
				/>
			</div>
		</>
	);
}

export default App;
