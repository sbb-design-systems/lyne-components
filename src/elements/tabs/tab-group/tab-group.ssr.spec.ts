import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTabGroupElement } from './tab-group.component.ts';
import '../tab-label.ts';
import '../tab.ts';

describe(`sbb-tab-group ssr`, () => {
  let root: SbbTabGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html` <sbb-tab-group initial-selected-index="1">
        <sbb-tab-label id="sbb-tab-1">Test tab label 1</sbb-tab-label>
        <sbb-tab> Test tab content 1 </sbb-tab>
        <sbb-tab-label id="sbb-tab-2">Test tab label 2</sbb-tab-label>
        <sbb-tab> Test tab content 2 </sbb-tab>
        <sbb-tab-label id="sbb-tab-3" disabled>Test tab label 3</sbb-tab-label>
        <sbb-tab> Test tab content 3 </sbb-tab>
        <sbb-tab-label id="sbb-tab-4">Test tab label 4</sbb-tab-label>
        <sbb-tab> Test tab content 4 </sbb-tab>
      </sbb-tab-group>`,
      { modules: ['./tab-group.component.js', '../tab-label.js', '../tab.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTabGroupElement);
  });
});
