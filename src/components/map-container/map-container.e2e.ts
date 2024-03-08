import { assert, expect, fixture } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbTertiaryButtonElement } from '../button';
import { waitForCondition } from '../core/testing';

import { SbbMapContainerElement } from './map-container';

describe('sbb-map-container', () => {
  let element: SbbMapContainerElement;

  it('should react to scrolling', async () => {
    await setViewport({ width: 320, height: 600 });

    await fixture(
      html` <sbb-map-container>
        <div>
          <sbb-title level="4">Operations & Disruptions</sbb-title>
          ${[...Array(10).keys()].map(
            (value) =>
              html` <div>
                <p>Situation ${value}</p>
              </div>`,
          )}
        </div>
        <div slot="map">
          <div style="height: 1200px">map</div>
        </div>
      </sbb-map-container>`,
    );
    element = document.querySelector<SbbMapContainerElement>('sbb-map-container')!;
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
