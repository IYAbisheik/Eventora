import {gql, DocumentNode} from '@apollo/client';


export const GOOGLE_SIGNIN: DocumentNode = gql`
  mutation GoogleSignIn($input: GoogleLoginInput!) {
  googleSignIn(input: $input) {
    token
    user {
      id
      email
      firstname
      lastname
      photo
    }
  }
}
`;