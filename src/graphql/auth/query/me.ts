import { gql } from "@apollo/client";

export const MY_ACCOUNT = gql`
  query Me {
    me {
      id
      firstname
      lastname
      createdAt
      updatedAt
    }
  }
`;
