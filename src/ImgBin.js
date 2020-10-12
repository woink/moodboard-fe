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
      {renderImages()}
			<div
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
					width={window.innerHeight}
					height={window.innerWidth}
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
	justifyContent: 'center',
};

// const img = {
// 	width: '20px',
// };

const stage = {
  border: '1px solid black'
}
