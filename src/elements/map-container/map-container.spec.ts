import { assert, expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbTertiaryButtonElement } from '../button.js';
import { fixture } from '../core/testing/private.js';
import { waitForCondition } from '../core/testing.js';

import { SbbMapContainerElement } from './map-container.js';

import '../title.js';

describe(`sbb-map-container`, () => {
  let element: SbbMapContainerElement;

  it('should react to scrolling', async () => {
    await setViewport({ width: 320, height: 600 });

    element = await fixture(
      html` <sbb-map-container>
        <div>
          <sbb-title level="4">Operations & Disruptions</sbb-title>
          <div><p>Situation 1</p></div>
          <div><p>Situation 2</p></div>
          <div><p>Situation 3</p></div>
          <div><p>Situation 4</p></div>
          <div><p>Situation 5</p></div>
          <div><p>Situation 6</p></div>
          <div><p>Situation 7</p></div>
          <div><p>Situation 8</p></div>
        </div>
        <div slot="map">
          <div style="height: 1200px">map</div>
        </div>
      </sbb-map-container>`,
    );
    assert.instanceOf(element, SbbMapContainerElement);

    function getInert(): boolean {
      return element
        .shadowRoot!.querySelector<SbbTertiaryButtonElement>('sbb-tertiary-button')!
        .hasAttribute('inert');
    }

    expect(element).not.to.have.attribute('data-scroll-up-button-visible');
    expect(getInert()).to.be.equal(true);

    // Scroll down
    window.scrollTo(0, 400);
    await waitForCondition(async () => !getInert());

    expect(element).to.have.attribute('data-scroll-up-button-visible');
    expect(getInert()).to.be.equal(false);
  });
});
