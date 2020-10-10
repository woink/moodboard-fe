import React from 'react'

function ImgBin(props) {
console.log("Img Bin: ", props.images)
  return (

    <div style={imgBinDiv}>
      <h1>ImageBin</h1>
    </div>
    )
}

export default ImgBin

const imgBinDiv = {
  border: '1px solid black',
  justifyContent: 'center'
  
}