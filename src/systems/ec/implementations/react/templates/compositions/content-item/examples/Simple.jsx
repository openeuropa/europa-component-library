import React from 'react';

import demoContentSimple from '@ecl/ec-specs-content-item/demo/data--simple';
import ContentItem from '../src/ContentItem';

export default function () {
  return <ContentItem {...demoContentSimple} />;
}
