/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  __typename: "Account";
  id: any;
  firstname: string;
  lastname: string;
  createdAt: any;
  updatedAt: any;
}

export interface Me {
  /**
   * Returns user's own information.
   */
  me: Me_me;
}
