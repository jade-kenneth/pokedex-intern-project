import { IBattleData } from "src/helpers/getBattleDataByIds";
import {
  GetEachPokemon_pokemonDetails,
  GetEachPokemon_pokemonDetails_abilities,
  GetEachPokemon_pokemonDetails_moves,
  GetEachPokemon_pokemonDetails_moves_move,
} from "src/types/pokemon/GetEachPokemon";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IBuffs {
  opponent: Array<{
    attack: number;
    fromPlayerWeakness: string;
  }>;
  player: Array<{
    attack: number;
    fromPlayerWeakness: string;
  }>;
}
interface IMoves {
  opponent: GetEachPokemon_pokemonDetails_moves[];
  player: GetEachPokemon_pokemonDetails_moves[];
}
interface IPopUp {
  damage: number;
  attackName: string;
}
const turnMoves: {
  opponent: GetEachPokemon_pokemonDetails_moves[];
  player: GetEachPokemon_pokemonDetails_moves[];
} = {
  opponent: [],
  player: [],
};
interface IPlayerHP {
  opponent: number;
  player: number;
}
interface IStore {
  // listView?: boolean;
  // toggleView: (value?: boolean) => void;
  // const [turn, setTurn] = useState<(keyof typeof moves)[]>([
  //   "opponent",
  //   "player",
  // ]);
  playerBuffs: IBuffs;
  moves: IMoves;
  battleData: IBattleData["battleData"];
  popUp: IPopUp;
  attacking: boolean;
  attackIdx: number;
  beforeAttack: number;
  playerHp: IPlayerHP;
  wins: boolean;
  turn: (keyof typeof turnMoves)[];
  setPlayerBuffs: (data: IBuffs) => void;
  setAttacking: (attacking: boolean) => void;
  setMoves: (data: IMoves) => void;
  setBattleData: (battleData: IBattleData["battleData"]) => void;
  setPopUp: (data: IPopUp) => void;
  setAttackIdx: (attackIdx: number) => void;
  setBeforeAttack: (beforeAttack: number) => void;
  setTurn: (data: (keyof typeof turnMoves)[]) => void;
  setPlayerHP: (playerHp: IPlayerHP) => void;
  setWins: (wins: boolean) => void;
  clearStore: () => void;
}

const useBattleStateStore = create<IStore>(
  devtools((set) => ({
    turn: ["opponent", "player"],
    playerHp: { opponent: 10, player: 10 },
    wins: false,
    attacking: false,
    attackIdx: 0,
    popUp: { attackName: "", damage: 0 },
    playerBuffs: {
      opponent: [
        { attack: 0, fromPlayerWeakness: "" },
        { attack: 0, fromPlayerWeakness: "" },
      ],
      player: [
        { attack: 0, fromPlayerWeakness: "" },
        { attack: 0, fromPlayerWeakness: "" },
      ],
    },
    beforeAttack: 5,

    battleData: [],
    moves: { opponent: [], player: [] },
    setWins: (wins: boolean) => {
      set((state) => ({
        ...state,
        wins,
      }));
    },
    setPlayerHP: (playerHP: IPlayerHP) => {
      set((state) => ({
        ...state,
        playerHp: { opponent: playerHP.opponent, player: playerHP.player },
      }));
    },
    setTurn: (data: (keyof typeof turnMoves)[]) => {
      set((state) => ({
        ...state,
        turn: data,
      }));
    },
    setBeforeAttack: (beforeAttack: number) => {
      set((state) => ({
        ...state,
        beforeAttack,
      }));
    },
    setAttackIdx: (attackIdx: number) => {
      set((state) => ({
        ...state,
        attackIdx,
      }));
    },
    setPopUp: (data: IPopUp) => {
      set((state) => ({
        ...state,
        popUp: { attackName: data.attackName, damage: data.damage },
      }));
    },
    setPlayerBuffs: (data: IBuffs) => {
      set((state) => ({
        ...state,
        playerBuffs: { opponent: data.opponent, player: data.player },
      }));
    },
    setAttacking: (attacking: boolean) => {
      set((state) => ({
        ...state,
        attacking,
      }));
    },
    setMoves: (data: IMoves) => {
      set((state) => ({
        ...state,
        moves: { opponent: data.opponent, player: data.player },
      }));
    },
    setBattleData: (battleData: IBattleData["battleData"]) => {
      set((state) => ({
        ...state,
        battleData: battleData,
      }));
    },
    clearStore: () => {
      return set({}, true);
    },
  }))
);

export default useBattleStateStore;
