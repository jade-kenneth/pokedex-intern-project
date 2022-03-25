// module.exports = {
//   client: {
//     includes: ["./src/graphql/auth/**/*.ts"],
//     service: {
//       name: "pokeapi",
//       url: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",

//       // optional disable SSL validation check
//       skipSSLValidation: true,
//     },
//   },
// };

module.exports = {
  client: {
    includes: ["./src/graphql/pokemon/**/*.ts"],
    service: {
      name: "pokeapi",
      url: "https://beta.pokeapi.co/graphql/v1beta",

      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
