import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbExpansionPanelElement } from './expansion-panel.component.ts';

import '../expansion-panel-header.ts';
import '../expansion-panel-content.ts';

describe(`sbb-expansion-panel ssr`, () => {
  let root: SbbExpansionPanelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-expansion-panel>
          <sbb-expansion-panel-header icon-name="dog-medium">Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      `,
      {
        modules: [
          './expansion-panel.component.js',
          '../expansion-panel-header.js',
          '../expansion-panel-content.js',
        ],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbExpansionPanelElement);
  });
});
