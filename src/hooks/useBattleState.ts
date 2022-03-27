import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IStore {
  // listView?: boolean;
  // toggleView: (value?: boolean) => void;
  mode: "list" | "battle";
  opponentId: number;
  playerId: number;
  force?: boolean;
  setMode: (mode: "list" | "battle") => void;
  setOpponent: (opponentId: number) => void;
  setPlayer: (playerId: number) => void;
}

const useBattleState = create<IStore>(
  persist(
    devtools((set) => ({
      mode: "list",
      opponentId: 0,
      playerId: 0,
      force: false,
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
    })),
    { name: "battleState" }
  )
);

export default useBattleState;
