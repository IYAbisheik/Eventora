import { gql, DocumentNode } from "@apollo/client";

export const UPDATE_USER: DocumentNode = gql`
  mutation UpdateUser(
    $firstname: String
    $lastname: String
    $username: String
    $phoneNumber: String
    $birthDate: Date   # <-- change this from String to Date
    $gender: String
  ) {
    updateUser(
      firstname: $firstname
      lastname: $lastname
      username: $username
      phoneNumber: $phoneNumber
      birthDate: $birthDate
      gender: $gender
    ) {
      id
      email
      firstname
      lastname
      username
      phoneNumber
      birthDate
      gender
    }
  }
`;
