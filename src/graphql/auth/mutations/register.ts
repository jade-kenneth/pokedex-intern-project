import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register(
    $emailAddress: EmailAddress!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      input: {
        emailAddress: $emailAddress
        password: $password
        firstname: $firstName
        lastname: $lastName
      }
    ) {
      token
    }
  }
`;
