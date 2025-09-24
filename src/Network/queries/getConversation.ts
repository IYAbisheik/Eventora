import { gql } from "@apollo/client";

export const GET_CONVERSATIONS = gql`
  query MyConversations {
    myConversations {
      id
      username
      firstname
      lastname
      photo
    }
  }
`;
