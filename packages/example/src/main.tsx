import React from 'react';
import ReactDOM from 'react-dom';

// case 1
import { Tag, Button } from 'antd';

// case 2
// import Antd from 'antd'
// const Tag = Antd.Tag
// const Button = Antd.Button


// case3
// import Antd from 'antd'
// const { Tag, Button } = Antd


ReactDOM.render(
  <div className="container">
    <div className="btns">
      <Button type="primary">Primary</Button>
    </div>

    <div className="tags">
      <Tag>Tag1</Tag>
      <Tag selected>Tag2</Tag>
    </div>
  </div>,
  document.getElementById('app'),
);

// case4
// import Antd from 'antd'
// ReactDOM.render(
//   <div className="container">
//     <div className="btns">
//       <Antd.Button type="primary">Primary</Antd.Button>
//     </div>

//     <div className="tags">
//       <Antd.Tag>Tag1</Antd.Tag>
//       <Antd.Tag selected>Tag2</Antd.Tag>
//     </div>
//   </div>,
//   document.getElementById('app'),
// );
