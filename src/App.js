import React from 'react';
import { 
  ApolloClient, 
  HttpLink, 
  InMemoryCache,
  ApolloProvider,
  split, 
} from '@apollo/client';
import ItemList from './components/ItemList/ItemList';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws'   

const GRAPHQL_ENDPOINT = "yelp-hasura-monterorf.herokuapp.com/v1/graphql";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
      reconnect: true
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return(
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})


function App() {
  return (
    <ApolloProvider client={client}>
      <ItemList/>
    </ApolloProvider>
  );
}

export default App;
