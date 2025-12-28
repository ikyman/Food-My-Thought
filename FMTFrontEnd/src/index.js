import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';

import ReactDOM from 'react-dom/client';
import { QueryDjangoBackendContextProvider} from './context/QueryDjangoBackendContext/QueryDjangoBackendContextProvider'

import WebPageNavigation from './WebPageNavigation';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <QueryDjangoBackendContextProvider>
          <WebPageNavigation />
    </QueryDjangoBackendContextProvider>
  </React.StrictMode>
);