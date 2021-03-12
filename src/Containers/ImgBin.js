import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Button } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';
import URLImage from '../Components/URLImage'

function ImgBin({boardId, images, setImages, removeImageFromBoard, removeImage}) {
	const dragUrl = useRef();
	const dragId = useRef();
	const stageRef = useRef();

	//
	// LOAD BOARDS
	//	
	useEffect(() => {
		fetch(`/boards/${boardId}`)
			.then((resp) => resp.json())
			.then((boardImgArray) => {
				findImgUrlID(boardImgArray.board_images);
			});
		const findImgUrlID = (boardImgArray) => {
			fetch(`/images`)
				.then((resp) => resp.json())
				.then((imgList) => {
					findMatches(imgList, boardImgArray);
				});
		};

		const findMatches = (imgList, boardImgArray) => {
			let newState = [];
			if (boardImgArray) {
				for (let i = 0; i < boardImgArray.length; i++) {
					const imgMatch = imgList.find(
						(img) => img.id === boardImgArray[i].image_id
					);
					const newStateObj = {
						x: boardImgArray[i].x,
						y: boardImgArray[i].y,
						src: imgMatch.src,
						id: imgMatch.id,
						width: boardImgArray[i].width,
						height: boardImgArray[i].height,
					};
					newState.push(newStateObj);
				}
			}
			setImages(newState);
		};
	}, [boardId]);
	// ////////////////////////////////////

	//
	// SAVE IMAGES W/ LOCATION
	//
	const prepImgsForSave = () => {
		images.forEach((img) => findBoardImageId(img.id, img));
	};

	const findBoardImageId = (imgId, stateImg) => {
		fetch('http://localhost:3000/board_images/', {
			method: 'GET',
		})
			.then((resp) => resp.json())
			.then((boardImgArray) => {
				const boardImage = boardImgArray.find(
					(boardImg) =>
						boardImg.image_id === imgId && boardImg.board_id === boardId
				);
				if (boardImage) {
					saveImgBoardState(boardImage.id, stateImg);
				} else {
					createImageAssociation(imgId, stateImg);
				}
			});
	};

	const createImageAssociation = (imgId, stateImg) => {
		fetch('http://localhost:3000/board_images/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accepts: 'application/json',
			},
			body: JSON.stringify({
				board_id: boardId,
				image_id: imgId,
				x: stateImg.x,
				y: stateImg.y,
				width: stateImg.width,
				height: stateImg.height,
			}),
		});
	};

	const saveImgBoardState = (boardImgId, stateImg) => {
		fetch(`http://localhost:3000/board_images/${boardImgId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				accepts: 'application/json',
			},
			body: JSON.stringify({
				x: stateImg.x,
				y: stateImg.y,
				width: stateImg.width,
				height: stateImg.height,
			}),
		}).then((resp) => resp.json());
	};
	// ////////////////////////////////////

	const downloadURI = (uri, name) => {
		const link = document.createElement('a');
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const downloadBoard = (e) => {
		e.preventDefault();

		const dataURL = stageRef.current.toDataURL({
			mimeType: 'image/jpeg',
			quality: 1,
			pixelRatio: 2,
		});
		downloadURI(dataURL, 'MoodBoard');
	};

	const renderImages = () => {
		return images.map((img) => {
			return (
				<div style={imgList}>
					<img
						alt=""
						width="125vw"
						id={img.id}
						src={img.src}
						draggable
						onDragStart={(e) => {
							dragUrl.current = e.target.src;
							dragId.current = parseInt(e.target.id);
						}}
					/>
					<div style={removeButtons}>
						<Button
							size="small"
							color="secondary"
							aria-label="remove"
							variant="contained"
							onClick={(e) => {
								const imgId = parseInt(e.currentTarget.id);
								console.log(imgId);
								removeImageFromBoard(imgId);
								const newArray = images.filter((image) => image.id !== imgId);
								setImages(newArray);
							}}
							id={img.id}
							label="Remove"
						>
							<RemoveIcon />
						</Button>
						<Button
							size="small"
							variant="contained"
							onClick={(e) => {
								console.log(e.currentTarget.id);
								const imgId = parseInt(e.currentTarget.id);
								removeImage(imgId);
								console.log(imgId);
								const newArray = images.filter((image) => image.id !== imgId);
								setImages(newArray);
							}}
							id={img.id}
							label="Remove"
						>
							<DeleteForeverIcon />
						</Button>
					</div>
				</div>
			);
		});
	};

	const [selectedId, selectShape] = useState(null);
	return (
		<div>
			<br />
			<div style={{ marginLeft: '2vw' }} />
			<Paper variant="outlined">
				<div style={imgs}>{renderImages()}</div>
			</Paper>
			<div
				style={maybeDiv}
				onDrop={(e) => {
					// register event position
					stageRef.current.setPointersPositions(e);
					// add image
					setImages(
						images.concat([
							{
								...stageRef.current.getPointerPosition(),
								src: dragUrl.current,
								id: dragId.current,
							},
						])
					);
				}}
				onDragOver={(e) => e.preventDefault()}
			>
				<div style={buttonsContainer}>
					<Button
						siz="large"
						label="save"
						variant="contained"
						color="secondary"
						onClick={prepImgsForSave}
					>
						Save Changes
					</Button>
					<div style={buttonSep} />
					<Button
						size="large"
						label="download"
						variant="contained"
						color="secondary"
						onClick={downloadBoard}
					>
						Download Board
					</Button>
				</div>
				<Paper elevation={2}>
					<Stage
						width={window.innerWidth}
						height={window.innerHeight}
						style={stage}
						ref={stageRef}
					>
						<Layer>
							<Rect
								width={window.innerWidth}
								height={window.innerHeight}
								fill="white"
								onMouseDown={(e) => {
									const clickedOnEmpty = e.target.attrs.fill === 'white';
									if (clickedOnEmpty) {
										console.log('clicked on empty');
										selectShape(null);
									}
								}}
							/>
							{images.map((img, i) => {
								return (
									<URLImage
										key={i}
										images={images}
										image={img}
										shapeProps={img}
										isSelected={img.id === selectedId}
										onSelect={() => {
											selectShape(img.id);
										}}
										onChange={(newAttrs) => {
											const rects = images.slice();
											rects[i] = newAttrs;
											setImages(rects);
										}}
									/>
								);
							})}
						</Layer>
					</Stage>
				</Paper>
			</div>
		</div>
	);
};

export default ImgBin;

const imgs = {
	display: 'flex',
	// border: '1px solid orange',
	overflowX: 'scroll',
	// width: '40vw'
	marginRight: '3vw',
	marginLeft: '3vw',
	alignItems: 'flex-end',
	// flexBasis: 'content'
};

const imgList = {
	marginRight: '2vw',
};

const stage = {
	// border: '8px solid green',
	// width: 'window.innerWidth',
	// height: 'window.innerHeight'
};

const maybeDiv = {
	// border: '1px solid red',
	// width: 'window.innerWidth - 1000',
	// height: 'window.innerHeight',
};

const buttonSep = {
	flex: '1',
};

const removeButtons = {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '1vh',
};

const buttonsContainer = {
	display: 'flex',
	marginLeft: '20vw',
	marginRight: '20vw',
	marginTop: '2vh',
	marginBottom: '1.5vh',
};
