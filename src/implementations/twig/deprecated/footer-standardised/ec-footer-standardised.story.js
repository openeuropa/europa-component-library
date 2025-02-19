import { withNotes } from '@ecl/storybook-addon-notes';
import withCode from '@ecl/storybook-addon-code';
import { correctPaths } from '@ecl/story-utils';
import getSystem from '@ecl/builder/utils/getSystem';

import specsEc from '@ecl/specs-component-footer-standardised/demo/data--ec';
import specsEu from '@ecl/specs-component-footer-standardised/demo/data--eu';
import logoEc from '@ecl/resources-ec-logo/dist/negative/logo-ec--en.svg';
import logoEuMobile from '@ecl/resources-eu-logo/dist/condensed-version/positive/logo-eu--en.svg';
import logoEuDesktop from '@ecl/resources-eu-logo/dist/standard-version/positive/logo-eu--en.svg';
import footer from './footer-standardised.html.twig';
import notes from './README.md';

const system = getSystem();
const demoData = system === 'eu' ? specsEu : specsEc;

const getArgs = () => {
  const args = {
    hide_contact: true,
    hide_follow: true,
    hide_relate_site: true,
    hide_logo: true,
  };
  if (system !== 'eu') {
    args.hide_about = true;
  }

  return args;
};

const getArgTypes = () => {
  const argTypes = {};
  argTypes.hide_contact = {
    name: system === 'eu' ? 'contact site name' : 'contact us',
    type: { name: 'boolean' },
    description:
      system === 'eu'
        ? 'Show "Contact site name" section'
        : 'Show "Contact us" section',
    table: {
      category: 'Optional sections',
    },
  };

  argTypes.hide_logo = {
    name: 'logo',
    type: { name: 'boolean' },
    description: 'Show logo',
    table: {
      category: 'Optional sections',
    },
  };

  argTypes.hide_follow = {
    name: 'follow us',
    type: { name: 'boolean' },
    description: 'Show "Follow us" section',
    table: {
      category: 'Optional sections',
    },
  };

  if (system !== 'eu') {
    argTypes.hide_about = {
      name: 'about us',
      type: { name: 'boolean' },
      description: 'Show "About us" section',
      table: {
        category: 'Optional sections',
      },
    };
  }

  argTypes.hide_relate_site = {
    name: system === 'eu' ? 'optional links' : 'related sites',
    type: { name: 'boolean' },
    description:
      system === 'eu'
        ? 'Show "Optional links" section'
        : 'Show "Related sites" section',
    table: {
      category: 'Optional sections',
    },
  };

  return argTypes;
};

const prepareData = (data, args) => {
  correctPaths(data);

  const res = JSON.parse(JSON.stringify(data));
  if (system === 'eu') {
    res.rows[1][0][0].logo.src_mobile = logoEuMobile;
    res.rows[1][0][0].logo.src_desktop = logoEuDesktop;
  } else {
    res.rows[2][0][0].logo.src_desktop = logoEc;
  }
  if (!args.hide_logo && res.rows[1][0][0].logo) {
    delete res.rows[1][0][0].logo;
  }
  if (!args.hide_logo && res.rows[2]) {
    delete res.rows[2][0][0].logo;
  }
  if (!args.hide_contact) {
    res.rows[0][1].splice(0, 1);
  }
  if (!args.hide_follow) {
    res.rows[0][1].splice(1, 1);
  }
  if (!args.hide_about && system !== 'eu') {
    res.rows[0][2].splice(0, 1);
  }
  if (!args.hide_relate_site && system === 'eu') {
    res.rows[0].splice(2, 1);
  } else if (!args.hide_relate_site) {
    res.rows[0][2].splice(1, 1);
  }
  if (!args.hide_about && !args.hide_relate_site) {
    res.rows[0].splice(2, 1);
  }
  if (!args.hide_contact && !args.hide_follow) {
    res.rows[0].splice(1, 1);
  }

  return res;
};

export default {
  title: 'Deprecated/Footers/Standardised',
  decorators: [withCode, withNotes],
  parameters: { layout: 'fullscreen' },
};

export const Default = (args) => footer(prepareData(demoData, args));

Default.storyName = 'default';
Default.args = getArgs();
Default.argTypes = getArgTypes();
Default.parameters = { notes: { markdown: notes, json: demoData } };
