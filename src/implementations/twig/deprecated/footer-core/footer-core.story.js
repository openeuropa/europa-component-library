import { withNotes } from '@ecl/storybook-addon-notes';
import withCode from '@ecl/storybook-addon-code';
import { correctPaths } from '@ecl/story-utils';
import getSystem from '@ecl/builder/utils/getSystem';

import specsEc from '@ecl/specs-component-footer-core/demo/data--ec';
import specsEu from '@ecl/specs-component-footer-core/demo/data--eu';
import logoEc from '@ecl/resources-ec-logo/dist/negative/logo-ec--en.svg';
import logoEuMobile from '@ecl/resources-eu-logo/dist/condensed-version/positive/logo-eu--en.svg';
import logoEuDesktop from '@ecl/resources-eu-logo/dist/standard-version/positive/logo-eu--en.svg';
import footer from './footer-core.html.twig';
import notes from './README.md';

const system = getSystem();
const demoData = system === 'eu' ? specsEu : specsEc;

const prepareData = (data) => {
  correctPaths(data);
  if (system === 'eu') {
    data.rows[0][0][0].logo.src_mobile = logoEuMobile;
    data.rows[0][0][0].logo.src_desktop = logoEuDesktop;
  } else {
    data.rows[0][0][0].logo.src_desktop = logoEc;
  }

  return data;
};

export default {
  title: 'Deprecated/Footers/Core',
  decorators: [withCode, withNotes],
  parameters: {
    layout: 'fullscreen',
    controls: {
      disable: true,
    },
  },
};

export const Default = () => footer(prepareData(demoData));

Default.storyName = 'default';
Default.parameters = { notes: { markdown: notes, json: demoData } };
