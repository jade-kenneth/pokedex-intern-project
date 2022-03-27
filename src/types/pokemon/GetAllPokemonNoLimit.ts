/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPokemonNoLimit
// ====================================================

export interface GetAllPokemonNoLimit_pokemonDetails_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetAllPokemonNoLimit_pokemonDetails_types {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetAllPokemonNoLimit_pokemonDetails_types_type | null;
}

export interface GetAllPokemonNoLimit_pokemonDetails {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  types: GetAllPokemonNoLimit_pokemonDetails_types[];
}

export interface GetAllPokemonNoLimit {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemonDetails: GetAllPokemonNoLimit_pokemonDetails[];
}
