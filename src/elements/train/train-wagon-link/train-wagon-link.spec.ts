import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTrainWagonLinkElement } from './train-wagon-link.component.ts';

import '../../train.ts';

describe(`sbb-train-wagon-link`, () => {
  let element: SbbTrainWagonLinkElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-train-wagon-link href="#"></sbb-train-wagon-link>`);
    assert.instanceOf(element, SbbTrainWagonLinkElement);
  });
});
