import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"; // Import necessary Apollo Client modules

// Create a new ApolloClient instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.studio.thegraph.com/query/10965/pharma-supply-chain-tracker/version/latest", // URL to your subgraph
  }),
  cache: new InMemoryCache(), // Use in-memory cache for caching GraphQL results
});

export default client; // Export the Apollo Client instance
