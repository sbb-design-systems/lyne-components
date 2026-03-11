import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbStepElement } from './step.component.ts';

import '../../stepper.ts';

describe(`sbb-step ssr`, () => {
  let root: SbbStepElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-step>Step</sbb-step>`, {
      modules: ['../../stepper.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbStepElement);
  });
});
