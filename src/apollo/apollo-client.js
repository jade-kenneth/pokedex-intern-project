import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const pokedexapi = new HttpLink({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

const authentication = new HttpLink({
  uri: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",
});
const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "pokedexapi",
    pokedexapi,
    authentication
  ),
  cache: new InMemoryCache(),
});

export default client;
