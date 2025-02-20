import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_PUBLIC_API_URL + "/graphql" }),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
