import React from 'react';
import ReactDOM from 'react-dom/client'; // Note: 'client' for React 18+
import App from './App';
import './index.css'; // Only if this file exists

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import '@fortawesome/fontawesome-free/css/all.min.css';
// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import App from './App';
// // import './index.css';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // // );
// // In your frontend/src/index.js, simplify to test the bare minimum:
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <h1>Test - If you see this, React is working</h1>,
//   document.getElementById('root')
// );