import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../core/testing.js';

import { SbbPaginatorElement } from './paginator.js';

describe('sbb-paginator', () => {
  let element: SbbPaginatorElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-paginator length="50" page-size="4"></sbb-paginator>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPaginatorElement);
  });

  it('emits on click', async () => {
    const myEventNameSpy = new EventSpy(SbbPaginatorElement.events.pageChanged);
    const pages = element.shadowRoot!.querySelectorAll('.sbb-paginator__page--number');
    pages[2].dispatchEvent(new Event('click'));
    await waitForLitRender(element);
    expect(myEventNameSpy.count).to.be.equal(1);
  });
});
