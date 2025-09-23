import { gql } from "@apollo/client";

export const UPLOAD_PROFILE_IMAGE = gql`
  mutation UploadProfileImage($file: Upload!) {
    uploadProfileImage(file: $file) {
      id
      email
      photo
    }
  }
`;
