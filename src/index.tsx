import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Ion} from 'cesium';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MjdmNzFhNC0yMmI0LTRjMGEtYTg2NC00Y2M5YjA5ODYzYzAiLCJpZCI6NzU3NDgsImlhdCI6MTYzODg2MDY4Nn0.3uFFwIjaiqNg6e28Jq1s-ix5-Icn9FXpkjDhkWYFNyk"


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);