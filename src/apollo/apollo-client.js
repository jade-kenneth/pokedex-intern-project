import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token if it exists
  const session = await getSession();
  console.log("session", session);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: session ? `Bearer ${session.token}` : "",
    },
  };
});

const pokeapi = new HttpLink({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

const authentication = new HttpLink({
  uri: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",
});
const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "pokeapi",
    pokeapi,
    authLink.concat(authentication)
  ),
  cache: new InMemoryCache(),
});

export default client;
