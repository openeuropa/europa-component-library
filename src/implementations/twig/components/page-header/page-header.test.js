import {
  merge,
  renderTwigFileAsNode,
  renderTwigFileAsHtml,
} from '@ecl/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';

import demoDefault from '@ecl/specs-component-page-header/demo/data';
import dataBreadcrumbSimple from '@ecl/specs-component-breadcrumb/demo/data--ec';

expect.extend(toHaveNoViolations);
demoDefault.breadcrumb = dataBreadcrumbSimple;

const demoSimple = { ...demoDefault };
delete demoSimple.picture_background;
delete demoSimple.picture_thumbnail;

describe('Page Header Standardised', () => {
  const template = '@ecl/page-header/page-header.html.twig';
  const render = (params) => renderTwigFileAsNode(template, params);

  describe('Default', () => {
    test(`- renders correctly`, () => {
      expect.assertions(1);
      return expect(render(demoSimple)).resolves.toMatchSnapshot();
    });

    test('renders correctly with extra class names', () => {
      expect.assertions(1);

      const withExtraClasses = merge(demoSimple, {
        extra_classes: 'custom-class custom-class--test',
      });

      return expect(render(withExtraClasses)).resolves.toMatchSnapshot();
    });

    test('renders correctly with extra attributes', () => {
      expect.assertions(1);

      const withExtraAttributes = merge(demoSimple, {
        extra_attributes: [
          { name: 'data-test', value: 'data-test-value' },
          { name: 'data-test-1', value: 'data-test-value-1' },
        ],
      });

      return expect(render(withExtraAttributes)).resolves.toMatchSnapshot();
    });

    test(`passes the accessibility tests`, async () => {
      expect(
        await axe(renderTwigFileAsHtml(template, demoSimple, true)),
      ).toHaveNoViolations();
    });
  });

  describe('Background image', () => {
    test(`- renders correctly`, () => {
      expect.assertions(1);
      return expect(render(demoDefault)).resolves.toMatchSnapshot();
    });
  });

  describe('with deprectated data', () => {
    test('renders correctly', () => {
      expect.assertions(1);

      demoDefault.thumbnail = {
        alt: 'Europe map',
        src: 'https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg',
      };
      demoDefault.picture_thumbnail = {};
      demoDefault.background_image_url =
        'https://inno-ecl.s3.amazonaws.com/media/examples/example-image2.jpg';
      demoDefault.picture_background = {};

      return expect(render(demoDefault)).resolves.toMatchSnapshot();
    });
  });
});
