export const menuItems = [
  "grass",
  "fire",
  "steel",
  "fighter",
  "dark",
  "electric",
  "ground",
  "fairy",
  "poison",
  "metal",
  "rock",

  "water",
];

type Item = [
  name: string,
  size: [width: number, height: number],
  posit: [leftOrRight: number, bottom: number],
  rotate: number,
  anchor: "left" | "right"
];
export const items: Item[] = [
  // left
  ["fire", [2.5, 3.188], [130, 350], 20.05, "left"],
  ["electric", [3.375, 3.5], [2, 270], 8.37, "left"],
  ["metal", [2.375, 2.063], [155, 229], 0, "left"],
  ["grass", [4.063, 5.563], [5, 45], 0, "left"],
  ["steel", [2.25, 2.75], [240, 33], -25.7, "left"],
  // right
  ["rock", [1.688, 1.875], [57, 354], 22.96, "right"],
  ["fairy", [2.375, 3.5], [103, 185], -27.98, "right"],
  ["poison", [2.125, 3.25], [10.77, 120], 14.5, "right"],
  ["water", [3.688, 6.25], [149, 37], 0, "right"],
];
