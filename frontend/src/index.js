import React from "react"; // Import React
import ReactDOM from "react-dom"; // Import ReactDOM for rendering the app
import { BrowserRouter as Router } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"; // Import ApolloProvider to provide Apollo Client to the app
import client from "./apolloClient"; // Import the Apollo Client instance
import App from "./App"; // Import the main App component
import 'bootstrap/dist/css/bootstrap.min.css'

// Wrap the App component with ApolloProvider and render it
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root") // Mount the app to the DOM element with id 'root'
);
