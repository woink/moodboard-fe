import React, { Component } from 'react';
import { Stage, Layer, Text } from 'react-konva';

class Canvas extends Component {
  state = {
    isDragging: false,
    x: 50,
    y: 50
  };

  render() {
    return (
      <div style={stage}>
      <Stage  width={420} height={297}>
        <Layer >
          <Text
            text="Draggable Text"
            x={this.state.x}
            y={this.state.y}
            draggable
            fill={this.state.isDragging ? 'green' : 'black'}
            onDragStart={() => {
              this.setState({
                isDragging: true
              });
            }}
            onDragEnd={e => {
              this.setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y()
              });
            }}
          />
        </Layer>
        </Stage>
      </div>
    );
  }
}

export default Canvas

const stage = {
  display: 'flex',
  justifyContent: 'center',
  border: '1px solid black',
  width: 1440,
  height: 1018
}