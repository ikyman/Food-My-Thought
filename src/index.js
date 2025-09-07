import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';

import ReactDOM from 'react-dom/client';
import { AuthProvider } from "react-oidc-context";

import WebPageNavigation from './WebPageNavigation';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_lsIpZnYWc",
  client_id: "47piu68hu52i75d44npusb50uk",
  redirect_uri: "http://localhost:3000/",
  response_type: "code",
  scope: "email openid phone"
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
          <WebPageNavigation />
      </AuthProvider>
  </React.StrictMode>
);