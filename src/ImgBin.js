import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './style.css';
import { Image, Stage, Layer, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Button } from '@material-ui/core';

const ImgBin = (props) => {
	const dragUrl = useRef();
	const dragId = useRef();
	const stageRef = useRef();
	const [images, setImages] = useState([]);
	const [stageWidth] = useState([window.innerWidth / 1.41]);

	//
	// LOAD BOARDS
	//
	useEffect(() => {
		setImages([]);
		fetch(`http://localhost:3000/boards/${props.board}`)
			.then((resp) => resp.json())
			.then((boardImgArray) => {
				findImgUrlID(boardImgArray.board_images);
			});
		const findImgUrlID = (boardImgArray) => {
			fetch(`http://localhost:3000/images`)
				.then((resp) => resp.json())
				.then((imgList) => {
					console.log('FINDIMGURL: ', boardImgArray);
					findMatches(imgList, boardImgArray);
				});
		};

		const findMatches = (imgList, boardImgArray) => {
			let newState = [];
			let i = 0;
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
						height: boardImgArray[i].height
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
		images.forEach((img) => findImgUrlID(img));
	};

	const findImgUrlID = (stateImg) => {
		const formData = new FormData();
		fetch('http://localhost:3000/images', {
			method: 'GET',
		})
			.then((resp) => resp.json())
			.then((imgArray) => {
				const stateImgId = imgArray.find((image) => image.src === stateImg.src)
					.id;
				findBoardImageId(stateImgId, stateImg);
			});
	};

	const findBoardImageId = (imgId, stateImg) => {
		fetch('http://localhost:3000/board_images/', {
			method: 'GET',
		})
			.then((resp) => resp.json())
			.then((boardImgArray) => {
				const boardImgId = boardImgArray.find(
					(boardImg) => boardImg.id === imgId
				).id;
				saveImgBoardState(boardImgId, stateImg);
				console.log("stateImg: ", stateImg)
			});
	};

	const saveImgBoardState = (boardImgId, stateImg) => {
		// const formData = new FormData()
		// formData.append('board_state', JSON.stringify(images))

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
				height: stateImg.height
			}),
		}).then((resp) => resp.json());
	};
	// ////////////////////////////////////

	const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
		const [img] = useImage(image.src);

		const shapeRef = useRef();
		const trRef = useRef();

		useEffect(() => {
			if (isSelected) {
				console.log('clicked on image', trRef.current);
				console.log('show shapeRef: ', shapeRef.current)
				// attach transformer
				trRef.current.setNode(shapeRef.current);
				trRef.current.getLayer().batchDraw();
			}
		}, [isSelected]);
		console.log("ShapeProps: ", shapeProps)
		useLayoutEffect(() => {
			shapeRef.current.cache();
		}, [shapeProps, img, isSelected]);

		return (
			<>
				<Image
					image={img}
					onClick={onSelect}
					ref={shapeRef}
					{...shapeProps}
					x={image.x}
					y={image.y}
					// width={500}
					// height={500}
					id='rect1'
					// use id to remove from state
					id={image.id}
					// use offset to set origin to the center of the image
					// offsetX={img ? img.width / 2 : 0}
					// offsetY={img ? img.height / 2 : 0}
					draggable
					onDragEnd={(e) => {
						const stateIdx = images.findIndex(
							(img) => img.src === e.target.attrs.image.currentSrc
						);
						const newPos = e.target._lastPos;
						newPos.src = e.target.attrs.image.currentSrc;
						images[stateIdx] = newPos;
						onChange({
							...shapeProps,
							x: e.target.x(),
							y: e.target.y()
						})
					}}
					onTransformEnd={(e) => {
						const node = shapeRef.current
						const scaleX = node.scaleX()
						const scaleY = node.scaleY()
					
						node.scaleX(1)
						node.scaleY(1)
						node.width(Math.max(5, node.width() * scaleX))
						node.height(Math.max(node.height() * scaleY))
							
						onChange({
							...shapeProps,
							x: node.x(),
							y: node.y(),
							// set minimal value
							width: node.width(),
							height: node.height()
						})
					}}
				/>
				{isSelected && (
					<Transformer
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
			console.log('Image ID: ', img.id);
			return (
				<>
					<img
						alt=""
						width="125vw"
						id={img.id}
						src={img.src}
						// draggable
						// onDblClick={onSelect}
						onDragStart={(e) => {
							dragUrl.current = e.target.src;
							dragId.current = parseInt(e.target.id);
						}}
					/>
					<Button
						onClick={props.removeImage}
						id={img.id}
						label="Remove"
						size="small"
					>
						Remove
					</Button>
				</>
			);
		});
	};

	const initialRectangles = [
		{
			x: 10,
			y: 10,
			width: 100,
			height: 100,
			scaleX: 1,
			scaleY: 1,
			id: 'rect1',
		},
	];

	const [selectedId, selectShape] = useState(null);
	return (
		<div>
			<br />
			<div style={imgs}>{renderImages()}</div>
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
				<Button label="save" onClick={prepImgsForSave}>
					Save Changes
				</Button>
				<Stage
					width={window.innerWidth}
					height={window.innerHeight}
					style={stage}
					ref={stageRef}
					onMouseDown={(e) => {
						const clickedOnEmpty = e.target === e.target.getStage();
						if (clickedOnEmpty) {
							console.log('clicked on empty')
							selectShape(null);
						}
					}}
				>
					<Layer>
						{images.map((img, i) => {
							console.log(img);
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
			</div>
		</div>
	);
};

export default ImgBin;

const imgBinDiv = {
	border: '1px solid black',
	// justifyContent: 'center',

	// width: "window.innerWidth"
};

const imgs = {
	overflowX: 'auto',
	display: 'inline-block',
};

const stage = {
	border: '8px solid green',
	// width: 'window.innerWidth',
	// height: 'window.innerHeight'
};

const maybeDiv = {
	border: '1px solid red',
	// width: 'window.innerWidth - 1000',
	// height: 'window.innerHeight',
};
