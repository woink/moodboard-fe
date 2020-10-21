import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './style.css';
import { Image, Stage, Layer, Transformer, Rect } from 'react-konva';
import useImage from 'use-image';
import { Button, Fab } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';

const ImgBin = (props) => {
	const dragUrl = useRef();
	const dragId = useRef();
	const stageRef = useRef();
	const [images, setImages] = useState([]);

	//
	// LOAD BOARDS
	//
	useEffect(() => {
		// setImages([]);
		fetch(`http://localhost:3000/boards/${props.board}`)
			.then((resp) => resp.json())
			.then((boardImgArray) => {
				findImgUrlID(boardImgArray.board_images);
			});
		const findImgUrlID = (boardImgArray) => {
			fetch(`http://localhost:3000/images`)
				.then((resp) => resp.json())
				.then((imgList) => {
					findMatches(imgList, boardImgArray);
				});
		};

		const findMatches = (imgList, boardImgArray) => {
			let i = 0;
			let newState = [];
			if (boardImgArray) {
				while (i < boardImgArray.length) {
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
					i++;
				}
			}
			setImages(newState);
		};
	}, [props.board]);
	// ////////////////////////////////////

	console.log('Images State: ', images);
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
						boardImg.image_id === imgId && boardImg.board_id === props.board
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
				board_id: props.board,
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
				// Authorization: `Bearer ${token}`,
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

	const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
		const [img] = useImage(image.src, 'Anonymous');

		const shapeRef = useRef();
		const trRef = useRef();

		useEffect(() => {
			if (isSelected) {
				// attach transformer
				trRef.current.setNode(shapeRef.current);
				trRef.current.getLayer().batchDraw();
			}
		}, [isSelected]);
		useLayoutEffect(() => {
			shapeRef.current.cache();
		}, [shapeProps, img, isSelected]);

		console.log('ShapeRef: ', shapeRef);
		return (
			<>
				<Image
					image={img}
					onClick={onSelect}
					ref={shapeRef}
					{...shapeProps}
					x={image.x}
					y={image.y}
					offsetX={img ? img.width / 2 : 0}
					offsetY={img ? img.height / 2 : 0}
					id="rect1"
					// use id to remove from state
					id={image.id}
					draggable
					onDragEnd={(e) => {
						const stateIdx = images.findIndex(
							(img) => img.src === e.target.attrs.image.currentSrc
						);
						const newPos = e.target._lastPos;
						newPos.src = e.target.attrs.image.currentSrc;
						console.log(images[stateIdx])
						images[stateIdx] = newPos;
						onChange({
							...shapeProps,
							x: e.target.x(),
							y: e.target.y(),
						});
					}}
					// changing the scale but storing as width and height
					onTransformEnd={(e) => {
						const node = shapeRef.current;
						const scaleX = node.scaleX();
						const scaleY = node.scaleY();

						// set scale back
						node.scaleX(1);
						node.scaleY(1);
						node.width(Math.max(5, node.width() * scaleX));
						node.height(Math.max(node.height() * scaleY));

						onChange({
							...shapeProps,
							x: node.x(),
							y: node.y(),
							// set minimal value
							width: node.width(),
							height: node.height(),
						});
					}}
				/>
				{isSelected && (
					<Transformer
						rotateEnabled={false}
						ref={trRef}
						boundBoxFunc={(oldBox, newBox) => {
							// limit resize
							if (newBox.width < 5 || newBox.height < 5) {
								return oldBox;
							}
							return newBox;
						}}
					/>
				)}
			</>
		);
	};

	const renderImages = () => {
		return props.images.map((img) => {
			return (
				<div style={imgList}>
					<img
						alt=""
						width="125vw"
						id={img.id}
						src={img.src}
						draggable
						// onDblClick={onSelect}
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
								props.removeImageFromBoard(imgId);
								const newArray = images.filter((image) => image.id !== imgId);
								setImages(newArray);
							}}
							id={img.id}
							label="Remove"
							size="small"
						>
							<RemoveIcon />
						</Button>
						<Button
							size="small"
							variant="contained"
							onClick={(e) => {
								console.log(e.currentTarget.id);
								const imgId = parseInt(e.currentTarget.id);
								props.removeImage(imgId);
								console.log(imgId);
								const newArray = images.filter((image) => image.id !== imgId);
								setImages(newArray);
							}}
							id={img.id}
							label="Remove"
							size="small"
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

const imgBinDiv = {
	// border: '1px solid black',
	// justifyContent: 'center',
	// width: "window.innerWidth"
};

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
