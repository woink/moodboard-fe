import React from 'react'
import UploadPane from './UploadPane'
import ImgBin from './ImgBin'
import { baseURL } from './constants'

class Main extends React.Component {
  state = {
    // user: this.props.user,
    images: [],
    boardImages: []
  };


  componentDidUpdate(prevProps) {
    if (this.props.images !== prevProps.images) {
      console.log("updated")
    }
  } 
 
  componentDidMount = () => {
    // const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/images`, {
      method: 'GET',
      // headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => resp.json())
      .then((upImages) => {
        console.log("Get Request: ", upImages)
        this.setState({
          images: upImages,
        });
      });
    
    fetch(`http://localhost:3000/boards/${this.props.board}/board_images`, {
      method: "GET",
    })
      .then(resp => resp.json())
      .then(boardImgs => {
        this.setState({
        boardImages: boardImgs
      })
    })
  };

  imgUploaded = (obj) => {
    this.setState(() => (
      { images: [...this.state.images, obj] }
    ))
  }

  removeImage = (e) => {
    const imgId = e.target.parentElement.id
    // const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/images/${imgId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
      .then(() => {
        this.componentDidMount()
      })
      .then(this.findImageBoardId(imgId))
  }

  findImageBoardId = imgId => {
    fetch(`http://localhost:3000/boards/${this.props.board}/board_images`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(boardImgArray => {
        console.log("findImageBoardId: ", boardImgArray)
        const stateBoardImgId = boardImgArray.find(boardImg => boardImg.image_id === parseInt(imgId)).id
        this.removeBoardImage(stateBoardImgId, imgId)
      })
  }

  removeBoardImage = (stateBoardImgId, imgId) => {
    fetch(`http://localhost:3000/boards/${this.props.board}/board_images/${parseInt(stateBoardImgId)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
      const newImgArray = this.state.images.filter(img => img.id !== imgId)
    this.setState({
        images: newImgArray
      })
      
  }


  render() {
    console.log("BoardImages State: ", this.props.board)
    return (
      <>
				<div>
          <UploadPane user={this.state.user} imgUploaded={this.imgUploaded} />
          <ImgBin board={this.props.board} boardImages={this.state.boardImages} images={this.state.images} removeImage={this.removeImage}/>
        
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