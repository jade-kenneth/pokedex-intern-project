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
