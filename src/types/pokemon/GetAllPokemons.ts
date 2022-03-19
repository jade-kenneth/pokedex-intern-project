/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPokemons
// ====================================================

export interface GetAllPokemons_pokemons_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetAllPokemons_pokemons_types {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetAllPokemons_pokemons_types_type | null;
}

export interface GetAllPokemons_pokemons {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  types: GetAllPokemons_pokemons_types[];
}

export interface GetAllPokemons {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  pokemons: GetAllPokemons_pokemons[];
}

export interface GetAllPokemonsVariables {
  limit: number;
  offset?: number | null;
}
