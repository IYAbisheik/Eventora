import { gql, DocumentNode } from "@apollo/client";

export const REGISTER: DocumentNode = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;
