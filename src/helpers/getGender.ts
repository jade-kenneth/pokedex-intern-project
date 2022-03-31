interface PokemonGenderIdentifierProps {
  gender_rate: number | null | undefined;
}
interface PokemonGenderIdentifierReturn {
  gender: string;
}
const getGender = ({
  gender_rate,
}: PokemonGenderIdentifierProps): PokemonGenderIdentifierReturn => {
  let gender = "";
  if (gender_rate === null || gender_rate || undefined) gender = "N/A";
  if (gender_rate! >= 8) gender = `${gender_rate! * 10}% Female `;
  if (gender_rate! < 8 && gender_rate! >= 1)
    gender = `${gender_rate! * 10}% Male `;
  if (gender_rate! <= 0) gender = "N/A";

  return {
    gender,
  };
};
export default getGender;
