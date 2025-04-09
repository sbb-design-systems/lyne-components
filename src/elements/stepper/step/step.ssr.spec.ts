import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbStepElement } from './step.component.js';

describe(`sbb-step ssr`, () => {
  let root: SbbStepElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-step>Step</sbb-step>`, {
      modules: ['./step.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbStepElement);
  });
});
