import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const favorites = makeVar([]);

const client = new ApolloClient({
  uri: "http://localhost:1000/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favorites: {
            read: () => {
              return favorites();
            }
          }
        }
      }
    }
  }),
});

export default client;