import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbMapContainer } from './map-container';
import '../map-container';

describe('sbb-map-container', () => {
  let element: SbbMapContainer;

  it('renders the container with button', async () => {
    element = await fixture(html`<sbb-map-container></sbb-map-container>`);

    expect(element).dom.to.be.equal(
      `
        <sbb-map-container>  
        </sbb-map-container>
      `,
    );
    expect(element).shadowDom.to.be.equal(
      `
        <div class="sbb-map-container">
          <div class="sbb-map-container__sidebar">
            <span></span>
            <slot></slot>
            <sbb-button
              dir="ltr"
              class="sbb-map-container__sidebar-button"
              variant="tertiary"
              inert
              role="button"
              size="l"
              tabindex="0"
              icon-name="location-pin-map-small"
              type="button"
            >Show map</sbb-button>
          </div>
          <div class="sbb-map-container__map">
            <slot name="map"></slot>
          </div>
        </div>
      `,
    );
  });
  it('renders the container without button', async () => {
    element = await fixture(html`<sbb-map-container hide-scroll-up-button></sbb-map-container>`);

    expect(element).dom.to.be.equal(
      `
        <sbb-map-container hide-scroll-up-button>
        </sbb-map-container>
      `,
    );
    expect(element).shadowDom.to.be.equal(
      `
        <div class="sbb-map-container">
          <div class="sbb-map-container__sidebar">
            <slot></slot>
          </div>
          <div class="sbb-map-container__map">
            <slot name="map"></slot>
          </div>
        </div>
      `,
    );
  });
});
