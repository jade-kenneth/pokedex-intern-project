module.exports = {
  client: {
    includes: ["./src/graphql/auth/**/*.ts"],
    service: {
      name: "authapi",
      url: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",

      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
