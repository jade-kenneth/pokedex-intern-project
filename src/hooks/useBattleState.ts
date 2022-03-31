import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IStore {
  // listView?: boolean;
  // toggleView: (value?: boolean) => void;
  mode: "list" | "battle";
  opponentId: number;
  playerId: number;

  setMode: (mode: "list" | "battle") => void;
  setOpponent: (opponentId: number) => void;
  setPlayer: (playerId: number) => void;
  clearStore: () => void;
}

const useBattleState = create<IStore>(
  persist(
    devtools((set) => ({
      mode: "list",
      opponentId: 0,
      playerId: 0,

      //set mode to battle if there is opponent (clicked a pokemon)
      //
      setMode: (mode: "list" | "battle") => {
        set((state) => ({
          ...state,
          mode: state.opponentId > 0 ? "battle" : mode,
        }));
      },
      setOpponent: (opponentId: number) => {
        set((state) => ({
          ...state,
          opponentId,
        }));
      },
      setPlayer: (playerId: number) => {
        set((state) => ({
          ...state,
          playerId,
        }));
      },
      clearStore: () => {
        return set({}, true);
      },
    })),

    { name: "battleState" }
  )
);

export default useBattleState;
