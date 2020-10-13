import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { render } from '@testing-library/react';
import { Image, Stage, Layer, Transformer, node } from 'react-konva';
import useImage from 'use-image';
import { Button, Container } from '@material-ui/core';

const URLImage = ({ image }) => {
	const [img] = useImage(image.src);
	return (
    <Image
      // use id to remove from state
      id={image.id}
			image={img}
			x={image.x}
			y={image.y}
			// I will use offset to set origin to the center of the image
			offsetX={img ? img.width / 2 : 0}
			offsetY={img ? img.height / 2 : 0}
			draggable
			onDblClick={onSelect}
		/>
	);
};


const onSelect = (e) => {
  console.log(e.target)
//  e.target.visable = false
};


function ImgBin(props) {
	const dragUrl = useRef();
	const stageRef = useRef();
  const [images, setImages] = useState([]);
  const [stageWidth] = useState([window.innerWidth / 1.41])


  console.log(images)

	const renderImages = () => {
		return props.images.map((img) => {
			return (
				<>
					<img
						alt=""
						width="125vw"
						id={img.id}
						src={img.img_url}
						draggable="true"
						onDragStart={(e) => {
            dragUrl.current = e.target.src;
						}}
					/>
          <Button onClick={props.removeImage} id={img.id} label="Remove" size="small">
						
						Remove
					</Button>
				</>
			);
		});
	};

  return (
		<div >
			Try to trag and image into the stage:
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
							},
						])
					);
				}}
				onDragOver={(e) => e.preventDefault()}
      >
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            style={stage}
            ref={stageRef}
            >
            <Layer>
              {images.map((image) => {
                return <URLImage image={image} />;
              })}
            </Layer>
          </Stage>
        </div>
      </div>
	);
}

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
