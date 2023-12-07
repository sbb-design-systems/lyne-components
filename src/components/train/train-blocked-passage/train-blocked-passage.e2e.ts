import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTrainBlockedPassageElement } from './train-blocked-passage';

describe('sbb-train-blocked-passage', () => {
  let element: SbbTrainBlockedPassageElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`);
    assert.instanceOf(element, SbbTrainBlockedPassageElement);
  });
});
