import React from 'react';
import ReactDOM from 'react-dom';
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import App from "./pages/App";

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);