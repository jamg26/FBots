const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            //modifyVars: { "@font-family": "Roboto" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
