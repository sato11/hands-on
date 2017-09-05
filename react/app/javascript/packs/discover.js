'use strict';

import Logo     from './../components/logo';
import Button   from './../components/button';
import React    from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={ { padding: '20px' } }>
    <h1>コンポーネント一覧</h1>
    <h2>Logo</h2>
    <div style={ { display: 'inline-block', background: 'purple' } }>
      <Logo />
    </div>
    <h2>Button</h2>
    <div>Button with onClick: <Button onClick={ () => alert('click!') }>Click</Button></div>
    <div>Button with href: <Button href="http://reactjs.com">Follow</Button></div>
    <div>Button with className: <Button className="custom">Do nothing</Button></div>
  </div>,
  document.getElementById('pad')
);
