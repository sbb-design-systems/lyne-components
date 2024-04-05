import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../core/testing/index.js';
import { fixture } from '../core/testing/private/index.js';

import { SbbTeaserElement } from './teaser.js';

describe(`sbb-teaser with ${fixture.name}`, () => {
  let element: SbbTeaserElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-teaser id="focus-id" href="#">Content</sbb-teaser>`, {
      modules: ['./teaser.ts'],
    });
  });

  it('should render', async () => {
    assert.instanceOf(element, SbbTeaserElement);
  });

  it('should receive focus', async () => {
    element.focus();
    await waitForLitRender(element);
    expect(document.activeElement!.id).to.be.equal('focus-id');
  });

  it('dispatches event on click', async () => {
    const clickSpy = new EventSpy('click');

    element.click();
    expect(clickSpy.count).to.be.equal(1);
  });
});
