/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEachPokemon
// ====================================================

export interface GetEachPokemon_pokemonDetails_stats_stat_name {
  __typename: "pokemon_v2_stat";
  name: string;
}

export interface GetEachPokemon_pokemonDetails_stats {
  __typename: "pokemon_v2_pokemonstat";
  base_stat: number;
  /**
   * An object relationship
   */
  stat_name: GetEachPokemon_pokemonDetails_stats_stat_name | null;
}

export interface GetEachPokemon_pokemonDetails_types_type {
  __typename: "pokemon_v2_type";
  name: string;
}

export interface GetEachPokemon_pokemonDetails_types {
  __typename: "pokemon_v2_pokemontype";
  /**
   * An object relationship
   */
  type: GetEachPokemon_pokemonDetails_types_type | null;
}

export interface GetEachPokemon_pokemonDetails {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  /**
   * An array relationship
   */
  stats: GetEachPokemon_pokemonDetails_stats[];
  /**
   * An array relationship
   */
  types: GetEachPokemon_pokemonDetails_types[];
}

export interface GetEachPokemon {
  /**
   * fetch data from the table: "pokemon_v2_pokemon" using primary key columns
   */
  pokemonDetails: GetEachPokemon_pokemonDetails | null;
}

export interface GetEachPokemonVariables {
  id: number;
}
