import { gql } from "@apollo/client";
export const TRIGGER_RESET_PASSWORD = gql`
  mutation triggerResetPassword($emailAddress: EmailAddress!) {
    triggerPasswordReset(input: { emailAddress: $emailAddress })
  }
`;

export const GENERATE_PASSWORD_RESET_LINK = gql`
  mutation generatePasswordResetLink(
    $emailAddress: EmailAddress!
    $baseURL: String!
  ) {
    generatePasswordResetLink(
      input: { emailAddress: $emailAddress, baseUrl: $baseURL }
    )
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($passwordResetCode: String!, $newPassword: String!) {
    resetPassword(
      input: {
        passwordResetCode: $passwordResetCode
        newPassword: $newPassword
      }
    ) {
      token
    }
  }
`;
