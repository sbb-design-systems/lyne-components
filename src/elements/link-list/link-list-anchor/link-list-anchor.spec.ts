import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbLinkListAnchorElement } from './link-list-anchor.component.ts';
import '../../link/block-link.ts';

describe('sbb-link-list-anchor', () => {
  let element: SbbLinkListAnchorElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-link-list-anchor>
        ${new Array(3)
          .fill('')
          .map((_v, i) => html` <sbb-block-link href="#">Link ${i}</sbb-block-link> `)}
      </sbb-link-list-anchor>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbLinkListAnchorElement);
  });

  it('should sync negative', async () => {
    element.toggleAttribute('negative', true);
    await waitForLitRender(element);
    const links = Array.from(element.querySelectorAll('sbb-block-link'));
    expect(links.every((l) => l.negative)).to.be.true;
  });
});
