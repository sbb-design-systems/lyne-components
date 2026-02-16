import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';
import { waitForImageReady } from '../core/testing.ts';

import type { SbbLeadContainerElement } from './lead-container.component.ts';

import '../breadcrumb.ts';
import '../image.ts';
import '../link/block-link/block-link.component.ts';
import '../title.ts';
import './lead-container.component.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-lead-container`, () => {
  let element: SbbLeadContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-lead-container>
        <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
      </sbb-lead-container>`,
    );
    await waitForImageReady(element.querySelector('sbb-image')!);
  });

  it('DOM', async () => {
    await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
  });

  it('Shadow DOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
