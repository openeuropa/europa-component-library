const publicUrl = process.env.PUBLIC_URL || '';
const exampleLink = `${publicUrl}/example`;

module.exports = {
  more_label: 'See all items',
  visible_items: 3,
  items: [
    {
      term: 'Standard text',
      definition: `Lorem ipsum dolor sit amet, <a href="${exampleLink}" class="ecl-link">consectetur adipiscing elit</a>. Suspendisse ut sapien condimentum, aliquet turpis sit amet, finibus purus. Donec porttitor iaculis felis ut dapibus. Sed blandit, massa ac suscipit facilisis`,
    },
    {
      term: 'Standalone links',
      type: 'link',
      definition: [
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
            icon_position: 'before',
          },
          icon: {
            name: 'copy',
            path: '/icons.svg',
            size: 's',
          },
        },
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
            icon_position: 'before',
          },
          icon: {
            name: 'download',
            path: '/icons.svg',
            size: 's',
          },
        },
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
            icon_position: 'before',
          },
          icon: {
            name: 'global',
            path: '/icons.svg',
            size: 's',
          },
        },
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
            icon_position: 'before',
          },
          icon: {
            name: 'file',
            path: '/icons.svg',
            size: 's',
          },
        },
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
            icon_position: 'before',
          },
          icon: {
            name: 'presentation',
            path: '/icons.svg',
            size: 's',
          },
        },
      ],
    },
    {
      term: 'Links inline',
      type: 'link-inline',
      definition: [
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
          },
        },
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
          },
        },
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
          },
        },
        {
          link: {
            label: 'Lorem ipsum dolor sit amet',
            path: exampleLink,
          },
        },
      ],
    },
    {
      term: 'Taxonomy list',
      type: 'taxonomy',
      definition: [
        'Taxonomy item 1',
        { link: { label: 'Taxonomy item 2', path: exampleLink } },
        'Taxonomy item 3',
        'Taxonomy item 4',
        { link: { label: 'Taxonomy item 5', path: exampleLink } },
      ],
    },
  ],
};
