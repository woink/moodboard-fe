import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { render } from '@testing-library/react';
import { Image, Stage, Layer, Transformer, node } from 'react-konva';
import useImage from 'use-image';
import { Button, Container } from '@material-ui/core';





// const onSelect = (e) => {
//   console.log(e.target._id);
//   setImages(images.slice(images.indexOf(e.target._id, 1)))
//   // let imgsArray = 
// };

const ImgBin = props => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const [stageWidth] = useState([window.innerWidth / 1.41]);

  const URLImage = ({ image }) => {
    const [img] = useImage(image.src);

    return (
      <Image
        image={img}
        x={image.x}
        y={image.y}
        // use id to remove from state
        id={image.id}
        // use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        draggable="true"
        onDragEnd={handleDragEnd}
      />
    );
  };

  const handleDragEnd = (e) => {
    const stateIdx = images.findIndex(img => img.src === e.target.attrs.image.currentSrc)
    const newPos = e.target._lastPos
    newPos.src = e.target.attrs.image.currentSrc
    images[stateIdx] = newPos
    console.log("New State: ", images)
  }


  const prepImgsForSave = () => {
    images.forEach(img => findImgUrlID(img))
  }

  const findImgUrlID = stateImg => {
    const formData = new FormData() 
    fetch('http://localhost:3000/images', {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(imgArray => {
        const stateImgId = imgArray.find(image => image.src === stateImg.src).id
        findBoardImageId(stateImgId, stateImg)
      })
  }

  const findBoardImageId = (imgId, stateImg) => {
    console.log(imgId)
    fetch('http://localhost:3000/board_images/', {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(boardImgArray => {
        const boardImgId = boardImgArray.find(boardImg => boardImg.id === imgId).id
        saveImgBoardState(boardImgId, stateImg)
      })
  }

  const saveImgBoardState = (boardImgId, stateImg) => {
    // const formData = new FormData()
    // formData.append('board_state', JSON.stringify(images))

    fetch(`http://localhost:3000/board_images/${boardImgId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        x: stateImg.x,
        y: stateImg.y
      })
    })
      .then(resp => resp.json())
      .then("PATCH: ", console.log)
    }
  
  console.log("Images State: ", images)
  console.log("StageRef: ", stageRef)

	const renderImages = () => {
		return props.images.map((img) => {
			return (
				<>
					<img
						alt=""
						width="125vw"
						id={img.id}
						src={img.src}
            draggable="true"
            // onDblClick={onSelect}
						onDragStart={(e) => {
              dragUrl.current = e.target.src;
            console.log("Drag Start: ", images)
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
							},
						])
					);
				}}
				onDragOver={(e) => e.preventDefault()}
			>
        <Button label="save" onClick={prepImgsForSave}>Save Board</Button>
				<Stage
					width={window.innerWidth}
					height={window.innerHeight}
					style={stage}
					ref={stageRef}
        >
					<Layer>
						{images.map((image) => {
              return <URLImage key={image.id} image={image} />;
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
