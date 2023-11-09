import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';

import { SbbTrainWagon } from './train-wagon';

describe('sbb-train-wagon', () => {
  let element: SbbTrainWagon;

  it('renders', async () => {
    element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`);
    assert.instanceOf(element, SbbTrainWagon);
  });

  it('should emit sectorChange', async () => {
    element = await fixture(html`<sbb-train-wagon sector="A"></sbb-train-wagon>`);
    const sectorChangeSpy = new EventSpy('sector-change');
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
    );

    expect(
      Array.from(element.querySelectorAll('sbb-icon')).every((icon) =>
        icon.getAttribute('slot').startsWith('sbb-train-wagon-icon-'),
      ),
    ).to.be.true;

    // Remove one icon
    element.querySelector('sbb-icon').remove();
    await waitForLitRender(element);

    expect(
      Array.from(element.querySelectorAll('sbb-icon')).every(
        (icon) => icon.getAttribute('slot') === null,
      ),
    ).to.be.true;
  });
});
