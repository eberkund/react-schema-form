const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = neutrino => {
  const env = process.env.NODE_ENV;
  const pkg = neutrino.options.packageJson;

  if (env === 'test') {
    neutrino.use([
      '@neutrinojs/jest',
      {
        moduleDirectories: ['node_modules'],
        moduleFileExtensions: ['js']
      }
    ]);
  } else {
    /**
     * Playgrounds are private
     */
    if (pkg.private) {
      neutrino.use([
        '@neutrinojs/react',
        {
          babel: { presets: ['react-app'] },
          html: { title: pkg.description }
        }
      ]);
    } else {
      /**
       * Components are tested together in @react-schema-form/playground
       * We don't use multiple entries (https://webpack.js.org/guides/author-libraries/#expose-the-library)
       * We don't need dev server for components
       * So we can use @neutrinojs/library instead of @neutrinojs/react-components
       * - no need for multiple outputs (tree shaking or direct access to the src/)
       * - enables reloading with components changes
       * - enables HMR
       *
       * !REQUIRED!: key `libName` in package.json
       */
      neutrino.use([
        '@neutrinojs/library',
        {
          name: pkg.variable,
          babel: { presets: ['react-app'] }
        }
      ]);

      /**
       * It solves monorepo issue with parent node_modules
       * related issues:
       * - https://github.com/liady/webpack-node-externals/issues/39
       * - https://github.com/mozilla-neutrino/neutrino-dev/issues/921
       *
       * (without this it bundles external modules in production)
       */
      neutrino.config.externals([
        nodeExternals({
          modulesDir: path.resolve(__dirname, 'node_modules')
        })
      ]);
    }
  }
};
