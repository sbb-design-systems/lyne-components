import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing/wait-for-render.js';

import { SbbFlipCardDetailsElement } from './flip-card-details.js';

describe('sbb-flip-card-details', () => {
  let element: SbbFlipCardDetailsElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-flip-card-details>
        Content
        <a href="">Link</a>
      </sbb-flip-card-details>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFlipCardDetailsElement);
  });

  it('should have data-card-focusable attribute', async () => {
    expect(element.querySelector('a')).to.have.attribute('data-card-focusable');
  });

  it('should set data-card-focusable on a newly slotted action', async () => {
    element.append(document.createElement('button'));
    await waitForLitRender(element);

    expect(element.querySelector('button')).to.have.attribute('data-card-focusable');
  });
});
