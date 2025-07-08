import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbOptionHintElement } from './option-hint.component.js';

describe('sbb-option-hint', () => {
  let element: SbbOptionHintElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-option-hint>Hint</sbb-option-hint>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbOptionHintElement);
  });
});
