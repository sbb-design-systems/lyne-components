import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';

import { SbbDividerElement } from './divider.js';

describe(`sbb-divider`, () => {
  it('renders', async () => {
    const element: SbbDividerElement = await fixture(html`<sbb-divider></sbb-divider>`);
    assert.instanceOf(element, SbbDividerElement);
  });

  it('should react to change of orientation', async () => {
    const element: SbbDividerElement = await fixture(html`<sbb-divider></sbb-divider>`);
    expect(element).to.have.attribute('aria-orientation', 'horizontal');

    element.orientation = 'vertical';
    await waitForLitRender(element);
    expect(element).to.have.attribute('aria-orientation', 'vertical');
  });
});
