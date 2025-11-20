import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbFlipCardDetailsElement } from './flip-card-details.component.ts';
import './flip-card-details.component.ts';

describe(`sbb-flip-card-details`, () => {
  let element: SbbFlipCardDetailsElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-flip-card-details>Example text</sbb-flip-card-details>`);
  });

  it('DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('Shadow DOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
