import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbStepLabelElement } from './step-label.component.ts';

describe(`sbb-step-label ssr`, () => {
  let root: SbbStepLabelElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-step-label>Label</sbb-step-label>`, {
      modules: ['./step-label.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbStepLabelElement);
  });
});
