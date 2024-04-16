import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbIconElement } from '../../icon.js';

import { SbbTrainWagonElement } from './train-wagon.js';

describe(`sbb-train-wagon with ${fixture.name}`, () => {
  let element: SbbTrainWagonElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`, {
      modules: ['./train-wagon.ts'],
    });
    assert.instanceOf(element, SbbTrainWagonElement);
  });

  it('should emit sectorChange', async () => {
    element = await fixture(html`<sbb-train-wagon sector="A"></sbb-train-wagon>`, {
      modules: ['./train-wagon.ts'],
    });
    const sectorChangeSpy = new EventSpy(SbbTrainWagonElement.events.sectorChange);
    element.sector = 'B';

    await waitForCondition(() => sectorChangeSpy.events.length === 1);
    expect(sectorChangeSpy.count).to.be.greaterThan(0);
  });

  it('should change slot name when changing from multiple to single icon', async () => {
    element = await fixture(
      html`<sbb-train-wagon sector="A">
        <sbb-icon name="sa-rs"></sbb-icon>
        <sbb-icon name="sa-rs"></sbb-icon>
      </sbb-train-wagon>`,
      { modules: ['./train-wagon.ts', '../../icon.ts'] },
    );

    Array.from(element.querySelectorAll('sbb-icon')).forEach((icon, index) => {
      expect(icon.getAttribute('slot')).to.equal(`li-${index}`);
    });

    // Remove one icon
    (element.querySelector('sbb-icon') as SbbIconElement).remove();
    await waitForLitRender(element);

    Array.from(element.querySelectorAll('sbb-icon')).forEach((icon, index) => {
      expect(icon.getAttribute('slot')).to.equal(`li-${index}`);
    });
  });
});
