module.exports = {
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
      playgroundAlways: true,
      defaultLimit: 100,
      maxLimit: 1000,
      shadowCRUD: true,
      introspection: true,
    },
  },
};
