import { gql, DocumentNode } from "@apollo/client";

export const REGISTER: DocumentNode = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        firstname
        lastname
        email
        username
        phoneNumber
        organizer
      }
    }
  }
`;
