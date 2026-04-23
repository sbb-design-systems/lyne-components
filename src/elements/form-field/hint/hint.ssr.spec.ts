import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbHintElement } from './hint.component.ts';

import '../../form-field.ts';

describe(`sbb-hint ssr`, () => {
  let root: SbbHintElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-hint></sbb-hint>`, {
      modules: ['../../form-field.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbHintElement);
  });
});
