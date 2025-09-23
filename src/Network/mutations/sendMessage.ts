import { gql, DocumentNode } from "@apollo/client";

export const SEND_MESSAGE: DocumentNode = gql`
  mutation SendMessage($toUserId: ID!, $content: String!) {
    sendMessage(toUserId: $toUserId, content: $content) {
      id
      content
      sender { id username }
      receiver { id username }
      createdAt
    }
  }
`;

