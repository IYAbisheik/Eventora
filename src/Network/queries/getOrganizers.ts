import { gql, DocumentNode } from "@apollo/client";

export const GET_ORGANIZERS: DocumentNode = gql`
  query {
    users {
        id
        username
        organizer
    }
  }
`;
