import { gql } from "@apollo/client";

export const UPLOAD_PROFILE_PHOTO = gql`
  mutation UploadProfilePhoto($file: Upload!) {
    uploadProfilePhoto(file: $file) {
      id
      photo
    }
  }
`;
