import { gql, DocumentNode } from "@apollo/client";

export const GET_CURRENT_USER: DocumentNode = gql`
  query GetCurrentUser {
    me {
      id
      email
      firstname
      lastname
      username
      phoneNumber
      birthDate
      gender
      photo
      organizer
    }
  }
`;
