import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbMapContainerElement } from './map-container';
import '.';

describe('sbb-map-container', () => {
  let element: SbbMapContainerElement;

  it('renders the container with button', async () => {
    element = await fixture(html`<sbb-map-container></sbb-map-container>`);

    expect(element).dom.to.be.equal(
      `
        <sbb-map-container>  
        </sbb-map-container>
      `,
    );
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders the container without button', async () => {
    element = await fixture(html`<sbb-map-container hide-scroll-up-button></sbb-map-container>`);

    expect(element).dom.to.be.equal(
      `
        <sbb-map-container hide-scroll-up-button>
        </sbb-map-container>
      `,
    );
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-map-container hide-scroll-up-button></sbb-map-container>`);
});
