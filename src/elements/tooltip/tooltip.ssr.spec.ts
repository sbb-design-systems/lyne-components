import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbTooltipElement } from './tooltip.component.ts';

describe(`sbb-tooltip ssr`, () => {
  let root: SbbTooltipElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-tooltip trigger="trigger">Test</sbb-tooltip>
        <button id="trigger">Label</button>
      `,
      {
        modules: ['./tooltip.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTooltipElement);
  });
});
