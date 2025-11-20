import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbExpansionPanelContentElement } from './expansion-panel-content.component.ts';

describe(`sbb-expansion-panel-content ssr`, () => {
  let root: SbbExpansionPanelContentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
      {
        modules: ['./expansion-panel-content.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbExpansionPanelContentElement);
  });
});
