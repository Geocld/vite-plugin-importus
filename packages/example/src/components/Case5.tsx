import { Button } from 'antd'
import { Tag } from 'antd'
import React, { Component } from 'react'

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