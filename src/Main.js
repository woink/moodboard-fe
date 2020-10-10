import React, { useState } from 'react'
import UploadPane from './UploadPane'
import Drawer from './Drawer'
import Canvas from './Canvas'
import ImgBin from './ImgBin'

const id = 1

class Main extends React.Component {
	state = {
		images: [],
	};

	imgUploaded = () => {
		fetch(`http://localhost:3000/api/v1/user/${id}/images`, {
			method: 'GET',
		})
			.then((resp) => resp.json())
			.then((upImages) => {
				this.setState({
					images: upImages,
				});
			});
	};

	render() {
		return (
			<>
				<Drawer />
				<div style={main}>
					<UploadPane imgUploaded={this.imgUploaded} />
					<Canvas />
				</div>
				<ImgBin images={this.state.images} />
			</>
		);
	}
}

export default Main;

const main = {
  
  display: 'flex'
}