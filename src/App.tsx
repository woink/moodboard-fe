import { useState, useEffect } from 'react';
import UploadPane from './Containers/UploadPane';
import ImgBin from './Containers/ImgBin';
import Drawer from './Components/Drawer';


function App() {
	const [images, setImages] = useState([]);
	const [boardId, setBoardId] = useState(1);

	useEffect(() => {
		fetch(`http://localhost:3000/images`, {
			method: 'GET',
		})
		.then((resp) => resp.json())
		.then((upImages) => setImages(upImages));
		
		fetch(`http://localhost:3000/boards/${boardId}/`, {
			method: 'GET',
		})
		.then((resp) => resp.json())
	}, []);
	
	// FIXME: state only wants never
	const imgUploaded = (obj: never) => {
		setImages([...images, obj]);
	};

	const loadBoard = (id: string) => {
		setBoardId(parseInt(id));
	};

	const removeImage = (imgId: number) => {
		console.log(imgId);
		fetch(`http://localhost:3000/images/${imgId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json',
			},
		})
			.then(() => {
				setImages(images);
			})
			.then(findImageBoardId(imgId));
	};

	const findImageBoardId = (imgId: number): any => {
		fetch(`http://localhost:3000/board_images`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json',
			},
		})
			.then((resp) => resp.json())
			.then((boardImgArray) => {
				const stateBoardImgId = boardImgArray.find(
					(boardImg: any) => boardImg.image_id === imgId
				);
				if (stateBoardImgId) {
					removeBoardImage(stateBoardImgId.id, imgId);
				}
				console.log('Found BoardImage', stateBoardImgId);
			});
	};

	const removeBoardImage = (stateBoardImgId: string, imgId: number) => {
		fetch(
			`http://localhost:3000/boards/${boardId}/board_images/${Number(
				stateBoardImgId
			)}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accepts: 'application/json',
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
