import React from 'react'
import UploadPane from './UploadPane'
import ImgBin from './ImgBin'
import { baseURL } from './constants'

class Main extends React.Component {
  state = {
    // user: this.props.user,
    images: [],
  };

  
 
  componentDidMount = () => {
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/boards/1/images`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => resp.json())
      .then((upImages) => {
        console.log(upImages)
        this.setState({
          images: upImages,
        });
      });
  };

  imgUploaded = (obj) => {
    this.setState(() => (
      { images: [...this.state.images, obj] }
    ))
  }

  removeImage = (e) => {
    const id = e.target.parentElement.id
    // const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/images/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
      .then(() => {
        this.componentDidMount()
      })
  }

	render() {
    return (
      <>
				<div>
          <UploadPane user={this.state.user} imgUploaded={this.imgUploaded} />
          <ImgBin images={this.state.images} removeImage={this.removeImage}/>
        
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