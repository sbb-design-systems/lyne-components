import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbLeadContainerElement } from './lead-container.js';

import '../breadcrumb.js';
import '../image.js';
import '../link/block-link/block-link.js';
import '../title.js';
import './lead-container.js';

describe(`sbb-lead-container`, () => {
  let element: SbbLeadContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-lead-container>
        <sbb-image slot="image"></sbb-image>
      </sbb-lead-container>`,
    );
  });

  it('DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('Shadow DOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
