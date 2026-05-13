import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTrainWagonButtonElement } from './train-wagon-button.component.ts';

import '../../train.ts';

describe(`sbb-train-wagon-button`, () => {
  let element: SbbTrainWagonButtonElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-train-wagon-button></sbb-train-wagon-button>`);
    assert.instanceOf(element, SbbTrainWagonButtonElement);
  });
});
