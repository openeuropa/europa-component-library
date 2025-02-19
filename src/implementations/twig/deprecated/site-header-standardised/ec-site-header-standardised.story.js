import { withNotes } from '@ecl/storybook-addon-notes';
import { correctPaths } from '@ecl/story-utils';
import withCode from '@ecl/storybook-addon-code';

import englishBanner from '@ecl/resources-ec-logo/dist/positive/logo-ec--en.svg';
import frenchBanner from '@ecl/resources-ec-logo/dist/positive/logo-ec--fr.svg';
import englishData from '@ecl/specs-component-site-header-standardised/demo/data';
import frenchData from '@ecl/specs-component-site-header-standardised/demo/data--fr';
import dataMenuEn from '@ecl/specs-component-menu/demo/data--en';
import dataMenuFr from '@ecl/specs-component-menu/demo/data--fr';
import siteHeaderStandardised from './site-header-standardised.html.twig';
import notes from './README.md';

// Preserve original data.
const enData = { ...englishData };
const frData = { ...frenchData };
const enMenu = { ...dataMenuEn };
const frMenu = { ...dataMenuFr };
const enSearchForm = { ...englishData.search_form };
const enSearchToggle = { ...englishData.search_toggle };
const frSearchForm = { ...frenchData.search_form };
const frSearchToggle = { ...frenchData.search_toggle };
const languageSelector = { ...enData.language_selector };
const loggedInData = { ...enData, logged: true };
const clonedLoggedInData = { ...loggedInData };
const enCtaLinkClone = { ...enData.cta_link };
const frCtaLinkClone = { ...frData.cta_link };

const getArgs = (data) => ({
  login: true,
  language_selector: true,
  menu: true,
  site_name: data.site_name || '',
  banner_top: true,
  cta_link: false,
  search: true,
});

const getArgTypes = () => {
  const argTypes = {};
  argTypes.site_name = {
    name: 'site name',
    type: { name: 'string', required: true },
    description: 'The site name',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  };
  argTypes.login = {
    type: 'boolean',
    description: 'Toggle login box visibility',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
    },
  };
  argTypes.language_selector = {
    name: 'language selector',
    type: 'boolean',
    description: 'Toggle language selector visibility',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
    },
  };
  argTypes.search = {
    type: { name: 'boolean' },
    description: 'Toggle search form visibility',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
    },
  };
  argTypes.banner_top = {
    name: 'class',
    type: 'boolean',
    description: 'Toggle class visibility (EC only)',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
    },
  };
  argTypes.cta_link = {
    name: 'call to action',
    type: { name: 'boolean' },
    description: 'Call to action link (optional)',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  };
  argTypes.menu = {
    type: 'boolean',
    description: 'Toggle menu visibility',
    table: {
      type: { summary: 'object' },
      defaultValue: { summary: '{}' },
    },
  };

  return argTypes;
};

const prepareData = (data, demo, args) => {
  if (!args.login) {
    delete data.login_box;
    delete data.login_toggle;
  } else if (args.login && !data.login_box) {
    if (demo === 'logged') {
      data = clonedLoggedInData;
    } else {
      data = demo === 'default' ? enData : frData;
    }
  }

  if (!args.menu) {
    delete data.menu;
  } else if (args.menu && !data.menu) {
    data.menu = demo !== 'translated' ? enMenu : frMenu;
  }

  if (!args.language_selector) {
    delete data.language_selector;
  } else if (args.language_selector && !data.language_selector) {
    data.language_selector = languageSelector;
  }

  if (!args.search) {
    delete data.search_form;
    delete data.search_toggle;
  } else if (args.search && !data.search_form) {
    if (demo === 'translated') {
      data.search_form = frSearchForm;
      data.search_toggle = frSearchToggle;
    } else {
      data.search_form = enSearchForm;
      data.search_toggle = enSearchToggle;
    }
  }

  if (args.cta_link) {
    data.cta_link = demo !== 'translated' ? enCtaLinkClone : frCtaLinkClone;
    if (data.menu) {
      data.menu.cta_link =
        demo !== 'translated' ? enCtaLinkClone : frCtaLinkClone;
    }
  } else {
    delete data.cta_link;
    if (data.menu) {
      delete data.menu.cta_link;
    }
  }

  correctPaths(data);

  if (demo !== 'translated') {
    data.logo.src_desktop = englishBanner;
    data.banner_top = enData.banner_top;
  } else {
    data.logo.src_desktop = frenchBanner;
    data.banner_top = frData.banner_top;
  }
  if (!args.banner_top) {
    delete data.banner_top;
  }

  data.site_name = args.site_name;

  return data;
};

export default {
  title: 'Deprecated/Site Headers/Standardised',
  decorators: [withNotes, withCode],
  parameters: { layout: 'fullscreen' },
};

export const Default = (args) =>
  siteHeaderStandardised(prepareData(englishData, 'default', args));

Default.storyName = 'default';
Default.args = getArgs(englishData);
Default.argTypes = getArgTypes();
Default.parameters = { notes: { markdown: notes, json: englishData } };

export const LoggedIn = (args) =>
  siteHeaderStandardised(prepareData(loggedInData, 'logged', args));

LoggedIn.storyName = 'logged in';
LoggedIn.args = getArgs(loggedInData);
LoggedIn.argTypes = getArgTypes();
LoggedIn.parameters = { notes: { markdown: notes, json: loggedInData } };

export const Translated = (args) =>
  siteHeaderStandardised(prepareData(frenchData, 'translated', args));

Translated.storyName = 'translated';
Translated.args = getArgs(frenchData);
Translated.argTypes = getArgTypes();
Translated.parameters = { notes: { markdown: notes, json: frenchData } };
