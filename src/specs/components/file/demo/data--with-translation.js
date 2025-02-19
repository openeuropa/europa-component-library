const publicUrl = process.env.PUBLIC_URL || '';
const exampleLink = `${publicUrl}/example`;

module.exports = {
  title: 'State of the Union 2018 brochure',
  language: 'English',
  meta: '(16.2 MB - PDF)',
  icon: {
    name: 'file',
    size: '2xl',
    path: '/icons.svg',
  },
  download: {
    link: {
      label: 'Download',
      path: exampleLink,
      aria_label: 'Download file State of the Union 2018 brochure',
    },
    icon: {
      path: '/icons.svg',
    },
  },
  translation: {
    toggle: {
      label: 'Other languages (3)',
      icon: {
        path: '/icons.svg',
      },
    },
    description: `Looking for another language which is not on the list? <a href="${exampleLink}" class="ecl-link">Find out why</a>.`,
    items: [
      {
        title: 'български',
        meta: '(15.7 MB - PDF)',
        lang: 'bg',
        download: {
          link: {
            label: 'Download',
            path: '/example#bg',
            aria_label: 'Download file български',
          },
          icon: {
            path: '/icons.svg',
          },
        },
      },
      {
        title: 'español',
        meta: '(15.8 MB - PDF)',
        lang: 'es',
        download: {
          link: {
            label: 'Download',
            path: '/example#es',
            aria_label: 'Download file español',
          },
          icon: {
            path: '/icons.svg',
          },
        },
      },
      {
        title: 'français',
        meta: '(15.4 MB - PDF)',
        lang: 'fr',
        download: {
          link: {
            label: 'Download',
            path: '/example#fr',
            aria_label: 'Download file français',
          },
          icon: {
            path: '/icons.svg',
          },
        },
      },
    ],
  },
};
