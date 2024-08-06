import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbFlipCardDetailsElement } from '../flip-card-details.js';
import type { SbbFlipCardSummaryElement } from '../flip-card-summary.js';

import { SbbFlipCardElement } from './flip-card.js';

import '../flip-card-summary.js';
import '../flip-card-details.js';
import '../../title.js';

describe('sbb-flip-card', () => {
  let element: SbbFlipCardElement;

  beforeEach(async () => {
    element = await fixture(
      html` <sbb-flip-card>
        <sbb-flip-card-summary slot="summary">
          <sbb-title> Card Title </sbb-title>
        </sbb-flip-card-summary>
        <sbb-flip-card-details slot="details">Some additional text. </sbb-flip-card-details>
      </sbb-flip-card>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardElement);
  });

  it('it toggles on click', async () => {
    const flipSpy = new EventSpy(SbbFlipCardElement.events.flip);
    const summary: SbbFlipCardSummaryElement = element.summary;
    const details: SbbFlipCardDetailsElement = element.details;

    expect(summary.inert).to.be.equal(false);
    expect(details.inert).to.be.equal(true);

    element.shadowRoot?.querySelector('button')!.click();
    await waitForLitRender(element);

    await waitForCondition(() => flipSpy.events.length === 1);
    expect(flipSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-flipped');

    expect(summary.inert).to.be.equal(true);
    expect(details.inert).to.be.equal(false);
  });

  it('it toggles programmatically', async () => {
    const flipSpy = new EventSpy(SbbFlipCardElement.events.flip);
    const summary: SbbFlipCardSummaryElement = element.summary;
    const details: SbbFlipCardDetailsElement = element.details;

    expect(summary.inert).to.be.equal(false);
    expect(details.inert).to.be.equal(true);

    element.toggle();
    await waitForLitRender(element);

    await waitForCondition(() => flipSpy.events.length === 1);
    expect(flipSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-flipped');

    expect(summary.inert).to.be.equal(true);
    expect(details.inert).to.be.equal(false);
  });
});
