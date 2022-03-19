/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_signUp {
  __typename: "Authentication";
  token: string;
}

export interface Register {
  /**
   * ### Description
   * Sign up a user and get an access token if successful.
   * 
   * ### Error Codes
   * `BAD_USER_INPUT` - Email address already used.
   */
  signUp: Register_signUp;
}

export interface RegisterVariables {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
}
