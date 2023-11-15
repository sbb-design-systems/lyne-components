import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy, waitForLitRender } from '../../core/testing';

import { SbbBreadcrumb } from './breadcrumb';

describe('sbb-breadcrumb', () => {
  let element: SbbBreadcrumb;

  beforeEach(async () => {
    element = await fixture(html`<sbb-breadcrumb id="focus-id" href="#">Test</sbb-breadcrumb>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbBreadcrumb);
  });

  it('dispatches event on click', async () => {
    const changeSpy = new EventSpy('click');

    element.click();
    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);
  });

  it('should receive focus', async () => {
    element.focus();
    await waitForLitRender(element);

    expect(document.activeElement.id).to.be.equal('focus-id');
  });
});
