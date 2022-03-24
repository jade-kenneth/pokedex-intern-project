import { GetEachPokemon_pokemonDetails } from "src/types/pokemon/GetEachPokemon";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IRecent {
  id: number;
  img: string;
}

export const addToRecentView = (
  recents: IRecent[],
  id: number,
  img: string
): IRecent[] => {
  const found = recents.some((data) => data.id === id);
  if (!found) return [...recents, { id, img }];

  return recents;
};

export const viewRecent = (
  recents: IRecent[],
  id: number,
  img: string
): IRecent[] => [{ id, img }, ...recents.filter((data) => data.id !== id)];

interface IStore {
  // listView?: boolean;
  // toggleView: (value?: boolean) => void;

  recents: IRecent[];
  addToRecentView: (id: number, img: string) => void;
  viewRecent: (id: number, img: string) => void;
}

const useRecentViewStore = create<IStore>(
  persist(
    devtools((set) => ({
      recents: [],

      addToRecentView: (id: number, img: string) =>
        set((state) => ({
          ...state,
          recents: addToRecentView(state.recents, id, img),
        })),
      viewRecent: (id: number, img: string) =>
        set((state) => ({
          ...state,
          recents: viewRecent(state.recents, id, img),
        })),
    })),
    { name: "recentView" }
  )
);

export default useRecentViewStore;
