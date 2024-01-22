import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../core/testing';

import { SbbTeaserElement } from './teaser';

describe('sbb-teaser', () => {
  let element: SbbTeaserElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-teaser id="focus-id" href="#">Content</sbb-teaser>`);
    await waitForLitRender(element);
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

  it('should dispatch event on click if is-static', async () => {
    element.setAttribute('is-static', 'true');

    const clickSpy = new EventSpy('click');
    await waitForLitRender(element);

    element.click();
    expect(clickSpy.count).to.be.equal(1);
  });
});
