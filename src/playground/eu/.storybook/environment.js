const path = require('path');
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');

const componentAbsPath = path.resolve(
  __dirname,
  '../../../implementations/twig/components',
);
const compositionsAbsPath = path.resolve(
  __dirname,
  '../../../implementations/twig/compositions',
);
const deprecatedAbsPath = path.resolve(
  __dirname,
  '../../../implementations/twig/deprecated',
);

const loader = new TwingLoaderFilesystem(componentAbsPath);

// In storybook we get this returned as an instance of
// TWigLoaderNull, we need to avoid processing this.
if (typeof loader.addPath === 'function') {
  // Add namespace.
  loader.addPath(componentAbsPath, 'ecl');
  loader.addPath(compositionsAbsPath, 'ecl');
  loader.addPath(deprecatedAbsPath, 'ecl');
}

module.exports = new TwingEnvironment(loader, { autoescape: false });
