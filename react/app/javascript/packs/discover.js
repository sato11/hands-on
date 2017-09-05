'use strict';

import Logo     from './../components/logo';
import Button   from './../components/button';
import Suggest  from './../components/suggest';
import Rating   from './../components/rating';
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

    <h2>Suggest</h2>
    <div><Suggest options={ ['eenie', 'meenie', 'miney', 'mo'] } /></div>

    <h2>Rating</h2>
    <div>0</div>
    <div>4<Rating defaultValue={ 4 } /></div>
    <div>max: 11<Rating max={ 11 } /></div>
    <div>Read only<Rating readonly={ true } defaultValue={ 3 } /></div>
  </div>,
  document.getElementById('pad')
);
