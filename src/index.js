import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from "react-oidc-context";

import ListerProposerScreen from './ListerProposerScreen';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_OgxLfV3xw",
  client_id: "5m2eg7uhvc36iubggemlqul7rp",
  redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
  response_type: "code",
  scope: "email openid phone",
};


const root=ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <ListerProposerScreen />
  </React.StrictMode>,
);