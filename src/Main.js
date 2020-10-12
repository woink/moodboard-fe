import React from 'react'
import UploadPane from './UploadPane'
// import Drawer from './Drawer'
import Canvas from './Canvas'
import ImgBin from './ImgBin'
import BoardContainer from './BoardCointainer'

class Main extends React.Component {
  state = {
    // user: this.props.user,
		images: [],
	};

  componentDidMount = () => {
    const token = localStorage.getItem('token')
		fetch(`http://localhost:3000/boards/1/images`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`}
		})
			.then((resp) => resp.json())
      .then((upImages) => {
        console.log(upImages)
				this.setState({
					images: upImages,
				});
			});
	};

	render() {
    // console.log("Initial Render: ", this.state.user)
    return (
      <>
        {/* <Drawer user={this.props.user} /> */}
				<div>
          <UploadPane user={this.state.user} imgUploaded={this.imgUploaded} />
          {/* <BoardContainer user={this.state.user} /> */}
        {/* <Canvas images={this.state.images} style={middle}/> */}
          <ImgBin images={this.state.images}/>
        
				</div>
      </>
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