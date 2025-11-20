import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbTooltipElement } from './tooltip.component.ts';
import './tooltip.component.ts';

describe(`sbb-tooltip`, () => {
  let wrapper: HTMLElement;
  let element: SbbTooltipElement;

  beforeEach(async () => {
    wrapper = await fixture(html`
      <div style="padding: 2rem">
        <button id="trigger">Button</button>
        <sbb-tooltip trigger="trigger">Tooltip</sbb-tooltip>
      </div>
    `);
    element = wrapper.querySelector('sbb-tooltip')!;
    element.open();
  });

  it('DOM', async () => {
    await expect(wrapper).dom.to.be.equalSnapshot({ ignoreAttributes: ['style'] });
  });

  it('Shadow DOM', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
