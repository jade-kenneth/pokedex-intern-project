/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEachPokemon
// ====================================================

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

export interface GetEachPokemon_pokemonDetails_abilities_ability {
  __typename: "pokemon_v2_ability";
  name: string;
}

export interface GetEachPokemon_pokemonDetails_abilities {
  __typename: "pokemon_v2_pokemonability";
  /**
   * An object relationship
   */
  ability: GetEachPokemon_pokemonDetails_abilities_ability | null;
}

export interface GetEachPokemon_pokemonDetails_stats_stat {
  __typename: "pokemon_v2_stat";
  name: string;
}

export interface GetEachPokemon_pokemonDetails_stats {
  __typename: "pokemon_v2_pokemonstat";
  base_stat: number;
  /**
   * An object relationship
   */
  stat: GetEachPokemon_pokemonDetails_stats_stat | null;
}

export interface GetEachPokemon_pokemonDetails_pokemon_specy_eggroups_names {
  __typename: "pokemon_v2_egggroup";
  name: string;
}

export interface GetEachPokemon_pokemonDetails_pokemon_specy_eggroups {
  __typename: "pokemon_v2_pokemonegggroup";
  /**
   * An object relationship
   */
  names: GetEachPokemon_pokemonDetails_pokemon_specy_eggroups_names | null;
}

export interface GetEachPokemon_pokemonDetails_pokemon_specy_description {
  __typename: "pokemon_v2_pokemonspeciesflavortext";
  flavor_text: string;
}

export interface GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions_evovleTrigger {
  __typename: "pokemon_v2_pokemonevolution";
  min_level: number | null;
}

export interface GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An array relationship
   */
  evovleTrigger: GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions_evovleTrigger[];
  id: number;
  evolveFrom: number | null;
  name: string;
}

export interface GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain {
  __typename: "pokemon_v2_evolutionchain";
  id: number;
  /**
   * An array relationship
   */
  evolutions: GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain_evolutions[];
}

export interface GetEachPokemon_pokemonDetails_pokemon_specy {
  __typename: "pokemon_v2_pokemonspecies";
  /**
   * An array relationship
   */
  eggroups: GetEachPokemon_pokemonDetails_pokemon_specy_eggroups[];
  /**
   * An array relationship
   */
  description: GetEachPokemon_pokemonDetails_pokemon_specy_description[];
  egg_cycle: number | null;
  gender_rate: number | null;
  /**
   * An object relationship
   */
  evolution_chain: GetEachPokemon_pokemonDetails_pokemon_specy_evolution_chain | null;
}

export interface GetEachPokemon_pokemonDetails_moves_move_effects_effect {
  __typename: "pokemon_v2_moveeffecteffecttext";
  effect: string;
}

export interface GetEachPokemon_pokemonDetails_moves_move_effects {
  __typename: "pokemon_v2_moveeffect";
  /**
   * An array relationship
   */
  effect: GetEachPokemon_pokemonDetails_moves_move_effects_effect[];
}

export interface GetEachPokemon_pokemonDetails_moves_move {
  __typename: "pokemon_v2_move";
  accuracy: number | null;
  name: string;
  power: number | null;
  pp: number | null;
  /**
   * An object relationship
   */
  effects: GetEachPokemon_pokemonDetails_moves_move_effects | null;
}

export interface GetEachPokemon_pokemonDetails_moves {
  __typename: "pokemon_v2_pokemonmove";
  /**
   * An object relationship
   */
  move: GetEachPokemon_pokemonDetails_moves_move | null;
}

export interface GetEachPokemon_pokemonDetails {
  __typename: "pokemon_v2_pokemon";
  id: number;
  name: string;
  height: number | null;
  weight: number | null;
  /**
   * An array relationship
   */
  types: GetEachPokemon_pokemonDetails_types[];
  /**
   * An array relationship
   */
  abilities: GetEachPokemon_pokemonDetails_abilities[];
  /**
   * An array relationship
   */
  stats: GetEachPokemon_pokemonDetails_stats[];
  /**
   * An object relationship
   */
  pokemon_specy: GetEachPokemon_pokemonDetails_pokemon_specy | null;
  /**
   * An array relationship
   */
  moves: GetEachPokemon_pokemonDetails_moves[];
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
