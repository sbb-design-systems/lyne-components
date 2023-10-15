import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForLitRender } from '../../global/testing';
import { SbbTrainWagon } from './sbb-train-wagon';

describe('sbb-train-wagon', () => {
  let element: SbbTrainWagon;

  it('renders', async () => {
    element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`);
    assert.instanceOf(element, SbbTrainWagon);
  });

  it('should emit sectorChange', async () => {
    element = await fixture(html`<sbb-train-wagon sector="A"></sbb-train-wagon>`);
    const sectorChangeSpy = new EventSpy('sectorChange', element);
    element.sector = 'B';
    await waitForLitRender(element);
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
    ).to.be.equal(true);

    // Remove one icon
    document.querySelector('sbb-icon').remove();
    await waitForLitRender(element);

    expect(
      Array.from(element.querySelectorAll('sbb-icon')).every(
        (icon) => icon.getAttribute('slot') === null,
      ),
    ).to.be.equal(true);
  });
});
