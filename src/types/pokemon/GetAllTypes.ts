/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTypes
// ====================================================

export interface GetAllTypes_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetAllTypes {
  /**
   * fetch data from the table: "pokemon_v2_type"
   */
  type: GetAllTypes_type[];
}
