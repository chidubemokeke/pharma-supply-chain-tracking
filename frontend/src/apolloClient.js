import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"; // Import necessary Apollo Client modules

// Create a new ApolloClient instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/yourusername/pharma-supply-chain-tracker", // URL to your subgraph
  }),
  cache: new InMemoryCache(), // Use in-memory cache for caching GraphQL results
});

export default client; // Export the Apollo Client instance
