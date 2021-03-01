import useImage from 'use-image';
import { Image, Transformer } from 'react-konva';
import { useLayoutEffect, useRef, useEffect } from 'react';

type Props = {
	images: any;
	image: any;
	shapeProps: any;
	isSelected: boolean;
	onSelect: any;
	onChange: any;
};

const URLImage = ({
	images,
	image,
	shapeProps,
	isSelected,
	onSelect,
	onChange,
}: Props) => {
	const [img] = useImage(image.src, 'Anonymous');

	const shapeRef = useRef<any>(null!);
  const trRef = useRef<any>();
  
	useEffect(() => {
		if (isSelected) {
			// attach transformer
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);
  useLayoutEffect(() => {
		shapeRef?.current?.cache();
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
				// use id to remove from state
				id={image.id}
				draggable
				onDragEnd={(e) => {
					const stateIdx = images.findIndex(
						(img: any) => img.src === e.target.attrs.image.currentSrc
					);
					const newPos: any = e.target._lastPos;
					newPos.src = e.target.attrs.image.currentSrc;
					console.log(images[stateIdx]);
					images[stateIdx] = newPos;
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				// changing the scale but storing as width and height
				onTransformEnd={(e) => {
					const node: any = shapeRef.current;
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

export default URLImage;
