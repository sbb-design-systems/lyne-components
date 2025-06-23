import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';

import { SbbDividerElement } from './divider.component.js';

describe(`sbb-divider`, () => {
  const elementInternals = elementInternalsSpy();

  it('renders', async () => {
    const element: SbbDividerElement = await fixture(html`<sbb-divider></sbb-divider>`);
    assert.instanceOf(element, SbbDividerElement);
  });

  it('should react to change of orientation', async () => {
    const element: SbbDividerElement = await fixture(html`<sbb-divider></sbb-divider>`);
    expect(elementInternals.get(element)!.ariaOrientation).to.equal('horizontal');

    element.orientation = 'vertical';
    await waitForLitRender(element);
    expect(elementInternals.get(element)!.ariaOrientation).to.equal('vertical');
  });
});
