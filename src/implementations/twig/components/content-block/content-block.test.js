import {
  merge,
  renderTwigFileAsNode,
  renderTwigFileAsHtml,
} from '@ecl/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';

import dataImage from '@ecl/specs-component-content-block/demo/data';

const dataSimpleTitle = { ...dataImage, title: 'title' };

expect.extend(toHaveNoViolations);

describe('Content block', () => {
  const template = '@ecl/content-block/content-block.html.twig';
  const render = (params) => renderTwigFileAsNode(template, params);

  describe('Default', () => {
    test('renders correctly', () => {
      expect.assertions(1);
      return expect(render(dataImage)).resolves.toMatchSnapshot();
    });

    test('renders correctly with simple title', () => {
      expect.assertions(1);
      return expect(render(dataSimpleTitle)).resolves.toMatchSnapshot();
    });

    test('renders correctly with extra class names', () => {
      expect.assertions(1);

      const withExtraClasses = merge(dataImage, {
        extra_classes: 'custom-class custom-class--test',
      });

      return expect(render(withExtraClasses)).resolves.toMatchSnapshot();
    });

    test('renders correctly with extra attributes', () => {
      expect.assertions(1);

      const withExtraAttributes = merge(dataImage, {
        extra_attributes: [
          { name: 'data-test', value: 'data-test-value' },
          { name: 'data-test-1', value: 'data-test-value-1' },
        ],
      });

      return expect(render(withExtraAttributes)).resolves.toMatchSnapshot();
    });

    test('renders correctly with deprecated data', () => {
      expect.assertions(1);
      delete dataImage.title.link;
      dataImage.title.path = '/example';
      dataImage.title.label = 'test title';

      return expect(render(dataImage)).resolves.toMatchSnapshot();
    });

    test('renders correctly with list extra classes', () => {
      expect.assertions(1);

      dataImage.lists.forEach((list) => {
        list.extra_classes = 'a-list-extra-class';
      });

      return expect(render(dataImage)).resolves.toMatchSnapshot();
    });

    test(`passes the accessibility tests`, async () => {
      expect(
        await axe(renderTwigFileAsHtml(template, dataImage, true)),
      ).toHaveNoViolations();
    });
  });
});
