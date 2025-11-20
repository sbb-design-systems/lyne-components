import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbExpansionPanelHeaderElement } from './expansion-panel-header.component.ts';

describe(`sbb-expansion-panel-header ssr`, () => {
  let root: SbbExpansionPanelHeaderElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>`,
      {
        modules: ['./expansion-panel-header.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbExpansionPanelHeaderElement);
  });
});
