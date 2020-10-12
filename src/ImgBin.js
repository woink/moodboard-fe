import React, { useRef, useState } from 'react';
import './style.css';
import { render } from '@testing-library/react';
import { Image, Stage, Layer } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image }) => {
	const [img] = useImage(image.src);
	return (
		<Image
			image={img}
			x={image.x}
			y={image.y}
			// I will use offset to set origin to the center of the image
			offsetX={img ? img.width / 2 : 0}
			offsetY={img ? img.height / 2 : 0}
			draggable
		/>
	);
};

function ImgBin(props) {
	const dragUrl = useRef();
	const stageRef = useRef();
  const [images, setImages] = useState([]);
  
  const renderImages = () => {
    return props.images.map(img => {
      return <img alt=''
        width="150vw"
        src={img.img_url}
        draggable="true"
				onDragStart={(e) => {
        dragUrl.current = e.target.src;
				}}
      />
    })
  }

	return (
		<div>
      Try to trag and image into the stage:
      <br />
      <div style={imgs}>
      {renderImages()}
      </div>

			<div style={maybeDiv}
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
          width={window.innerWidth - 1000}
          height={window.innerHeight}
          // border={'1px solid black'}
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
	overflowX: 'scroll'
};

const stage = {
  border: '8px solid green',
  // width: 'window.innerWidth',
  // height: 'window.innerHeight'
}

const maybeDiv = {
  border: '1px solid red',
  width: 'window.innerWidth - 1000',
  height: 'window.innerHeight'
}