const getPokemonElementColor = (type: string) => {
  let color: string = "";
  switch (type) {
    case "electric":
      color = "#F7E403";
      break;
    case "psychic":
      color = "#E86487";
      break;
    case "fighting":
      color = "#F55A03";
      break;
    case "poison":
      color = "#A846B5";
      break;
    case "fire":
      color = "#E16235";
      break;
    case "water":
      color = "#3B7DCE";
      break;
    case "ground":
      color = "#DDBE72";
      break;
    case "normal":
      color = "#66C6B0";
      break;
    case "ice":
      color = "#73C3C8";
      break;
    case "dragon":
      color = "#753AEC";
      break;
    case "dark":
      color = "#644F48";
      break;
    case "bug":
      color = "#A9B621";
      break;
    case "steel":
      color = "#8E9CBC";
      break;
    case "ghost":
      color = "#725792";
      break;
    case "fairy":
      color = "#EC77C2";
      break;

    default:
      color = "#2CDBB0";
  }

  return color;
};

export default getPokemonElementColor;
