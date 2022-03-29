// {idx === battleData.length - 1
//     ? cap?.playerWeakness[root][
//         `${t.type?.name}`
//       ].map((s) => {
//         console.log(s.name);
//         return (
//           <Tag key={s} color="red">
//             {s}
//           </Tag>
//         );
//       })
//     : cap?.opponentWeakness[root][
//         `${t.type?.name}`
//       ].map((s) => {
//         console.log(s);
//         return (
//           <Tag key={s} color="red">
//             {s}
//           </Tag>
//         );
//       })}

import {
  GetEachPokemon,
  GetEachPokemon_pokemonDetails,
} from "src/types/pokemon/GetEachPokemon";

interface getPlayerBuffProps {
  playerType: GetEachPokemon_pokemonDetails["types"];
  playerWeaknesses: string[];
}

const getPlayerBuff = async ({
  playerType,
  playerWeaknesses,
}: getPlayerBuffProps) => {
  let buff: Array<{ attack: number; fromPlayerWeakness: string }> = [];

  {
    /**check if player type is weakness of opponent then
 init attack +5 and name of weakness: ex 'poison' */
  }
  for (const eachType of playerType) {
    for (const type of playerWeaknesses) {
      if (eachType.type?.name === type) {
        buff.push({ attack: 5, fromPlayerWeakness: eachType.type?.name });
      }
    }
  }

  return {
    buff,
  };
};
export default getPlayerBuff;
