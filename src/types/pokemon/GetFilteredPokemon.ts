/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFilteredPokemon
// ====================================================

export interface GetFilteredPokemon_filtered_pokemons_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetFilteredPokemon_filtered_pokemons_types {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetFilteredPokemon_filtered_pokemons_types_type | null;
}

export interface GetFilteredPokemon_filtered_pokemons {
  __typename: "pokemon_v2_pokemon";
  name: string;
  id: number;
  /**
   * An array relationship
   */
  types: GetFilteredPokemon_filtered_pokemons_types[];
}

export interface GetFilteredPokemon {
  /**
   * fetch data from the table: "pokemon_v2_pokemon"
   */
  filtered_pokemons: GetFilteredPokemon_filtered_pokemons[];
}

export interface GetFilteredPokemonVariables {
  type?: string[] | null;
}
