const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "viteFederation",
          filename: "remoteEntry.js",
          remotes: {
            viteRemote: `promise import("http://localhost:5001/assets/remoteEntry.js")`,
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
};
