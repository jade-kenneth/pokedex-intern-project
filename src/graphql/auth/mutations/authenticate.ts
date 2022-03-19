import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($emailAddress: EmailAddress!, $password: String!) {
    authenticate(input: { emailAddress: $emailAddress, password: $password }) {
      token
    }
  }
`;
