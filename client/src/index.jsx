import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx'
// require('newrelic');

var listing_id_rand = Math.floor(Math.random()*10000000);
console.log(listing_id_rand);
ReactDOM.render(<App listing_id={listing_id_rand}/>, document.getElementById('reviews'));
