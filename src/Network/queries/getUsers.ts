import { gql, DocumentNode } from "@apollo/client";

export const GET_USERS: DocumentNode = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`;