import { withNotes } from '@ecl/storybook-addon-notes';
import withCode from '@ecl/storybook-addon-code';
import { correctPaths } from '@ecl/story-utils';
import getSystem from '@ecl/builder/utils/getSystem';

import logoPathEC from '@ecl/resources-ec-logo/dist/logo-ec--mute.svg';
import logoPathEU from '@ecl/resources-eu-logo/dist/logo-eu--mute.svg';
import dataSplash from '@ecl/specs-component-language-list/demo/data--splash';
import dataOverlay from '@ecl/specs-component-language-list/demo/data--overlay';
import languageList from './language-list.html.twig';
import notes from './README.md';

const system = getSystem();

const prepareData = (data) => {
  correctPaths(data);
  if (data.logo) {
    data.logo.path = system === 'eu' ? logoPathEU : logoPathEC;
  }

  return data;
};

export default {
  title: 'Deprecated/Language list',
  decorators: [withCode, withNotes],
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
};

export const Splash = () => languageList(prepareData(dataSplash));

Splash.storyName = 'splash';
Splash.parameters = { notes: { markdown: notes, json: dataSplash } };

export const Overlay = () => languageList(prepareData(dataOverlay));

Overlay.storyName = 'overlay';
Overlay.parameters = { notes: { markdown: notes, json: dataOverlay } };
