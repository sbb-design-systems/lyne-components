import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForCondition } from '../../global/testing';
import { SbbTrain } from './sbb-train';
import '../sbb-icon';

describe('sbb-train', () => {
  let element: SbbTrain;

  it('should render', async () => {
    await fixture(html`<sbb-train></sbb-train>`);

    element = document.querySelector('sbb-train');
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
    const trainSlotChangeSpy = new EventSpy('train-slot-change');

    document.querySelector('sbb-train-wagon').remove();

    await waitForCondition(() => trainSlotChangeSpy.events.length === 4);
    expect(trainSlotChangeSpy.count).to.be.greaterThan(0);
  });
});
