import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

export default function UploadPane(props) {
  const [image, setImage] = useState("");

  const handleImageChange = e => {

    setImage(e.target.files[0])
  }

  const handleUploadSubmit = (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('img_src', image)
    
    console.log("formData: ", formData)

    fetch('http://localhost:3000/images', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
      .then(resp => resp.json())
      .then(newImage => {
        createBoardAssociation(newImage.id)
        props.imgUploaded(newImage)
      })
  }
  
  const createBoardAssociation = (newImageID) => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:3000/board_images', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        board_id: 1,
        image_id: newImageID
      })
    })
  }

  // useEffect((props) => {
  //   props.imgUploaded = true
  // }, [uploaded])

  return (
    <div style={uploadDiv}>
    <form onSubmit={handleUploadSubmit}>
        <label>Image File
         <input
          type="file"
          accept="image/*"
            name="image"
            // multiple="multiple"
          onChange={handleImageChange}
        />
        </label>
      <button type='submit' value="Submit">Submit</button>
      </form>
  </div>
  )
}

const uploadDiv = {
  flexDirection: 'column',
  border: '1px solid black'
}