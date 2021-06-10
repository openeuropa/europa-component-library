import { withNotes } from '@ecl/storybook-addon-notes';
import withCode from '@ecl/storybook-addon-code';

import dataImg from '@ecl/specs-component-media-container/demo/data--image';
import dataVideo from '@ecl/specs-component-media-container/demo/data--video';
import dataEmbed from '@ecl/specs-component-media-container/demo/data--embed-video';
import mediaContainer from './media-container.html.twig';
import notes from './README.md';

const getArgTypes = (data) => {
  const argTypes = {};

  argTypes.description = {
    name: 'description',
    type: 'string',
    defaultValue: data.description,
    description: 'Media description',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
      category: 'Content',
    },
  };

  if (data.image && !data.sources) {
    argTypes.image = {
      name: 'image',
      type: { name: 'string', required: true },
      defaultValue: data.image,
      description: 'Path or Url of the image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    };
  }

  if (data.ratio) {
    argTypes.ratio = {
      name: 'ratio',
      type: { name: 'select' },
      defaultValue: data.ratio,
      description: 'Media ratio',
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
      control: {
        type: 'select',
        defaultValue: { summary: '16-9' },
        options: ['16-9', '4-3', '3-2', '1-1'],
      },
    };
  }

  argTypes.width = {
    name: 'width',
    defaultValue: 'outside',
    description: `The media container extends to the whole viewport by default when outside the grid,
      if it's inside it can still be extended by adding class .ecl-media-container--full-width`,
    table: {
      type: { summary: 'radio' },
      defaultValue: { summary: 'outside the grid container' },
      category: 'Display',
    },
    control: {
      type: 'radio',
      options: {
        'outside the grid container': 'outside',
        'inside the grid container': 'container',
        'inside the grid container, with fullwidth class': 'inside',
      },
    },
  };

  return argTypes;
};

const prepareData = (data, args) => {
  data.full_width = args.width === 'inside';

  return Object.assign(data, args);
};

const renderStory = (data, args) => {
  let story = mediaContainer(prepareData(data, args));
  if (args.width === 'container' || args.width === 'inside') {
    story = `<div class="ecl-container">${story}</div>`;
  }

  return story;
};

export default {
  title: 'Components/Media container',
  decorators: [withNotes, withCode],
  parameters: {
    creevey: { delay: 1000 },
  },
};

export const Image = (args) => renderStory(dataImg, args);

Image.storyName = 'image';
Image.argTypes = getArgTypes(dataImg);
Image.parameters = {
  notes: { markdown: notes, json: dataImg },
};

export const Video = (args) => renderStory(dataVideo, args);

Video.storyName = 'video';
Video.argTypes = getArgTypes(dataVideo);
Video.parameters = {
  notes: { markdown: notes, json: dataVideo },
  creevey: { skip: 'Mmhh...' },
};

export const EmbeddedVideo = (args) => renderStory(dataEmbed, args);

EmbeddedVideo.storyName = 'embedded video';
EmbeddedVideo.argTypes = getArgTypes(dataEmbed);
EmbeddedVideo.parameters = {
  notes: { markdown: notes, json: dataEmbed },
  creevey: { skip: 'Mmhh...' },
};
