import React, { Component } from 'react'
import { Tag, Button as SelfButton } from 'antd'

export default class Case1 extends Component {
  render() {
    return (
      <div className="container">
        <div className="btns">
          <SelfButton type="primary">Primary</SelfButton>
        </div>

        <div className="tags">
          <Tag>Tag1</Tag>
          <Tag selected>Tag2</Tag>
        </div>
      </div>
    )
  }
}
