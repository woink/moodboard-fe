import React, { useState } from 'react'

export default function UploadPane() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("")
  const [isImgBinUpdated] = useState(false)

  const handleImageChange = e => {
    setImage(e.target.files[0])
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleUploadSubmit = (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('image[title]', title)
    formData.append('img_src', image)

    fetch('http://localhost:3000/images', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData 
      })
      .then(console.log('submitted'))
        // debugger
      // .then(console.log)
  }
  
  // function useImgsUploaded() 

  return (
    <div style={uploadDiv}>
    <form onSubmit={handleUploadSubmit}>
      <label>
        Title
         <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </label>
        <label>Image File
         <input
          type="file"
          accept="image/*"
          name="image"
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