// // index.js or App.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
// import App from './App'; // Adjust the path as necessary

// // Set the base URL for axios
// axios.defaults.baseURL = 'http://localhost:8080'; // Backend server URL

// ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path as necessary
import './axiosConfig'; // Ensure this is imported to set up the base URLs

ReactDOM.render(<App />, document.getElementById('root'));
