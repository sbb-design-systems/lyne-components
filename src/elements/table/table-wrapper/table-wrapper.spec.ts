import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbTableWrapperElement } from './table-wrapper.js';

describe(`sbb-table-wrapper with ${fixture.name}`, () => {
  let element: SbbTableWrapperElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-table-wrapper></sbb-table-wrapper>`, {
      modules: ['./table-wrapper.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTableWrapperElement);
  });
});
