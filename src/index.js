// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle"
// import "./icon/css/all.css";
// import App from './App';

// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import "./icon/css/all.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Mylogin from './login';
import Newaccount from './newaccount';

const root = ReactDOM.createRoot(document.getElementById('root'));


if ( localStorage.getItem("usertoken") == null )
{
  root.render(
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6'>
          <Mylogin />
        </div>
        <div className='col-lg-6'>
          <Newaccount />
        </div>
      </div>
    </div>
  );
}
else{
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

