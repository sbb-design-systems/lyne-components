import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbTrainWagonElement } from '../train-wagon.js';

import { SbbTrainElement } from './train.js';

import '../train-wagon.js';

describe(`sbb-train`, () => {
  let element: SbbTrainElement;

  it('should render', async () => {
    element = await fixture(html`<sbb-train></sbb-train>`);
    assert.instanceOf(element, SbbTrainElement);
  });

  it('should emit trainSlotChange', async () => {
    element = await fixture(html`
      <sbb-train>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
      </sbb-train>
    `);
    const trainSlotChangeSpy = new EventSpy(SbbTrainElement.events.trainSlotChange);

    element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.remove();
    await waitForLitRender(element);

    expect(trainSlotChangeSpy.count).to.be.equal(1);
  });
});
