import { gql, DocumentNode } from "@apollo/client";

export const GET_MESSAGES: DocumentNode = gql`
  query Messages($conversationWith: ID!) {
    messages(conversationWith: $conversationWith) {
      id
      content
      sender { id username }
      createdAt
    }
  }
`;
