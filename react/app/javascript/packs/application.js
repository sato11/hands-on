/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import Excel    from './../components/excel';
import Logo     from './../components/logo';
import Button   from './../components/button';
import Rating   from './../components/rating';

import React    from 'react';
import ReactDON from 'react-dom';

let headers = localStorage.getItem('headers');
let data = localStorage.getItem('data');

if (!headers) {
  headers = ['title', 'year', 'evaluation', 'review'];
  data = [['test', '2015', '3', 'so-so']];
}

ReactDON.render(
  <div>
    <h1>
      <Logo />Welcome to Whinepad!
    </h1>
    <Excel headers={ headers } initialData={ data } />
  </div>,
  document.getElementById('pad')
)
