import React from "react"; // Import React
import ReactDOM from "react-dom"; // Import ReactDOM for rendering the app
import { ApolloProvider } from "@apollo/client"; // Import ApolloProvider to provide Apollo Client to the app
import client from "./apolloClient"; // Import the Apollo Client instance
import App from "./App"; // Import the main App component
import "./App.css"; // Import CSS for styling

// Wrap the App component with ApolloProvider and render it
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") // Mount the app to the DOM element with id 'root'
);
