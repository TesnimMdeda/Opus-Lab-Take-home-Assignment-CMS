module.exports = ({ env }) => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      defaultLimit: 100,
      maxLimit: 1000,
      introspection: env.bool("GRAPHQL_INTROSPECTION", true),
      "import-export-entries": {
        enabled: true,
      },
    },
  },
});
