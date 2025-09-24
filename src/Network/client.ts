import { ApolloClient, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMainDefinition } from "@apollo/client/utilities";

const SERVER_URI = __DEV__
  ? "https://eventora-server-syqd.onrender.com/graphql"
  : "https://eventora-server-syqd.onrender.com/graphql";

  //"http://192.168.1.55:4000/graphql"

  const WS_URI = SERVER_URI.startsWith("https")
  ? SERVER_URI.replace("https", "wss")
  : SERVER_URI.replace("http", "ws"); 

const httpLink = createHttpLink({ uri: SERVER_URI });

const authLink = setContext(async (_, { headers }) => {
  const token = (await AsyncStorage.getItem("token")) || "";
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URI,
    connectionParams: async () => {
      const token = await AsyncStorage.getItem("token");
      return { Authorization: token ? `Bearer ${token}` : "" };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
