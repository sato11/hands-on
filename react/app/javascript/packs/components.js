'use strict';

import Logo      from './../components/logo';
import Button    from './../components/button';
import Suggest   from './../components/suggest';
import Rating    from './../components/rating';
import FormInput from './../components/formInput';
import Form      from './../components/form';
import Actions   from './../components/actions';
import React     from 'react';
import ReactDOM  from 'react-dom';

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

    <h2>FormInput</h2>
    <table>
      <tbody>
        <tr>
          <td>Simple input</td>
          <td><FormInput /></td>
        </tr>
        <tr>
          <td>Default value</td>
          <td><FormInput defaultValue="This is default" /></td>
        </tr>
        <tr>
          <td>Year input</td>
          <td><FormInput type="year" /></td>
        </tr>
        <tr>
          <td>Rating</td>
          <td><FormInput type="rating" defaultValue={ 4 } /></td>
        </tr>
        <tr>
          <td>Suggest</td>
          <td><FormInput
            type="suggest"
            options={ ['red', 'green', 'bkue'] }
            defaultValue="green" />
          </td>
        </tr>
        <tr>
          <td>Simple textarea</td>
          <td><FormInput type="text" /></td>
        </tr>
      </tbody>
    </table>

    <h2>Form</h2>
    <Form
      fields={[
        { label: 'rating', type: 'rating', id: 'rateme' },
        { label: 'greeting', id: 'freetext' }
      ]}
      initialData={ { rateme: 4, freetext: 'こんにちは' } } />

    <h2>Actions</h2>
    <div><Actions onAction={ type => alert(type) } /></div>
  </div>,
  document.getElementById('pad')
);
