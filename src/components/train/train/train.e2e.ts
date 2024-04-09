import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../../core/testing/index.js';
import { fixture } from '../../core/testing/private/index.js';
import type { SbbTrainWagonElement } from '../train-wagon/index.js';

import { SbbTrainElement } from './train.js';

import '../train-wagon/index.js';

describe(`sbb-train with ${fixture.name}`, () => {
  let element: SbbTrainElement;

  it('should render', async () => {
    element = await fixture(html`<sbb-train></sbb-train>`, { modules: ['./train.ts'] });
    assert.instanceOf(element, SbbTrainElement);
  });

  it('should emit trainSlotChange', async () => {
    element = await fixture(
      html`
        <sbb-train>
          <sbb-train-wagon></sbb-train-wagon>
          <sbb-train-wagon></sbb-train-wagon>
          <sbb-train-wagon></sbb-train-wagon>
        </sbb-train>
      `,
      { modules: ['./train.ts', '../train-wagon/index.ts'] },
    );
    const trainSlotChangeSpy = new EventSpy(SbbTrainElement.events.trainSlotChange);

    element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.remove();
    await waitForLitRender(element);

    expect(trainSlotChangeSpy.count).to.be.equal(1);
  });
});
