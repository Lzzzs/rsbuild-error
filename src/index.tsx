import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import EncryptTool from './EncryptTool';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <>
      <App />
      {EncryptTool.getRequestSu()}
    </>
  </React.StrictMode>,
);
