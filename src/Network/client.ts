// apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
  uri: "http://192.168.1.55:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const user = await AsyncStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  console.log("Apollo auth token:", user); // 🔹 Debug
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
