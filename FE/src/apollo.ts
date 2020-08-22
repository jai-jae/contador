import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
    ApolloLink
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from '@apollo/client/link/ws';


const getToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
        return token;
    } else {
        return "";
    }
};

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            "X-JWT": token ? `${token}` : "",
        }
    }
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4242/subscription`,
    options: {
        reconnect: true,
        connectionParams: {
            "X-JWT": getToken()
        }
    }
});
  
  const httpLink = createHttpLink({
    uri: 'http://localhost:4242/graphql',
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    authLink.concat(wsLink),
    authLink.concat(httpLink),
);

const client = new ApolloClient({
    cache: cache,
    link: ApolloLink.from([splitLink]),
});

export default client;