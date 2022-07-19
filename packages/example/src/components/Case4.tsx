import React, { Component } from 'react'
import Antd from 'antd'

export default class Case1 extends Component {
  render() {
    return (
      <div className="container">
        <div className="btns">
          <Antd.Button type="primary">Primary</Antd.Button>
        </div>

        <div className="tags">
          <Antd.Tag>Tag1</Antd.Tag>
          <Antd.Tag selected>Tag2</Antd.Tag>
        </div>
      </div>
    )
  }
}
