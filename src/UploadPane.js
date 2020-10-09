import React, { useState } from 'react'

export default function UploadPane() {
  const [image, setImage] = useState();
  const [title, setTitle] = useState("")

  const handleImageChange = e => {
    setImage(e.target.files[0])
  }

  // const handleTitleChange = e => {
  //   setTitle(e.target.value)
  //   console.log(e.target.value)
  // }

  const handleUpload = (e, image) => {
    e.preventDefault()
    console.log("handle")
    const formData = new FormData(image)
    console.log(formData)
    fetch('http://localhost:3000/api/v1/images/', {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData
      })
      .then(console.log)
    }

  return (
    <form onSubmit={handleUpload}>
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
  )
}
