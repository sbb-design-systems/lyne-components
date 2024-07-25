import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbPaginatorElement } from './paginator.js';
import './paginator.js';

describe(`sbb-paginator`, () => {
  it('renders', () => {
    let element: SbbPaginatorElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-paginator length="50" page-size="4"></sbb-paginator>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
