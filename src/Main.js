import React from 'react'
import UploadPane from './UploadPane'

import Canvas from './Canvas'
import ImgBin from './ImgBin'
import BoardContainer from './BoardCointainer'

class Main extends React.Component {
  state = {
    user: this.props.user,
		images: [],
	};

  componentDidMount = () => {
    const token = localStorage.getItem('token')
		fetch(`http://localhost:3000/api/v1/profile`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`}
		})
			.then((resp) => resp.json())
			.then((upImages) => {
				this.setState({
					images: upImages,
				});
			});
	};

	render() {
    console.log("Initial Render: ", this.state.images)
		return (

				<div style={main}>
        <UploadPane imgUploaded={this.imgUploaded} />
        <BoardContainer style={middle}/>
        <Canvas style={middle}/>
        <ImgBin />
        
				</div>

		);
	}
}

export default Main;

const main = {
    display: 'flex'
}

const middle = {
  flexDirection: 'row',
  flex: 'grow'
}