import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTrainBlockedPassage } from './train-blocked-passage';

describe('sbb-train-blocked-passage', () => {
  let element: SbbTrainBlockedPassage;

  it('renders', async () => {
    element = await fixture(html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`);
    assert.instanceOf(element, SbbTrainBlockedPassage);
  });
});
