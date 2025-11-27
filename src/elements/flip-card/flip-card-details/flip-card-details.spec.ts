import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing/wait-for-render.ts';

import { SbbFlipCardDetailsElement } from './flip-card-details.component.ts';

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

  it('should have .sbb-action class', async () => {
    expect(element.querySelector('a')).to.match('.sbb-action');
  });

  it('should set .sbb-action class on a newly slotted action', async () => {
    element.append(document.createElement('button'));
    await waitForLitRender(element);

    expect(element.querySelector('button')).to.match('.sbb-action');
  });
});
