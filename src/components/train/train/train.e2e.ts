import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../../core/testing';

import { SbbTrain } from './train';
import '../../icon';

describe('sbb-train', () => {
  let element: SbbTrain;

  it('should render', async () => {
    element = await fixture(html`<sbb-train></sbb-train>`);
    assert.instanceOf(element, SbbTrain);
  });

  it('should emit trainSlotChange', async () => {
    element = await fixture(html`
      <sbb-train>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
      </sbb-train>
    `);
    const trainSlotChangeSpy = new EventSpy(SbbTrain.events.trainSlotChange);

    element.querySelector('sbb-train-wagon').remove();
    await waitForLitRender(element);

    expect(trainSlotChangeSpy.count).to.be.equal(1);
  });
});
