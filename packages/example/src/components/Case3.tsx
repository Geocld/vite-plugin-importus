import React, { Component } from 'react'
import Antd from 'antd'
const { Tag, Button } = Antd

export default class Case1 extends Component {
  render() {
    return (
      <div className="container">
        <div className="btns">
          <Button type="primary">Primary</Button>
        </div>

        <div className="tags">
          <Tag>Tag1</Tag>
          <Tag selected>Tag2</Tag>
        </div>
      </div>
    )
  }
}
