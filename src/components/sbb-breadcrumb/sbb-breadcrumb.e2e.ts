import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { EventSpy, waitForLitRender } from '../../global/testing';
import { SbbBreadcrumb } from './sbb-breadcrumb';

describe('sbb-breadcrumb', () => {
  let element: SbbBreadcrumb;

  beforeEach(async () => {
    await fixture(html`<sbb-breadcrumb id="focus-id" href="/">Test</sbb-breadcrumb>`);
    element = document.querySelector('sbb-breadcrumb');
  });

  it('renders', async () => {
    await waitForLitRender(element);
    assert.instanceOf(element, SbbBreadcrumb);
  });

  it('dispatches event on click', async () => {
    await waitForLitRender(element);
    const changeSpy = new EventSpy('click');

    await element.click();
    await waitForCondition(() => changeSpy.events.length === 1);
    expect(changeSpy.count).to.be.equal(1);
  });

  it('should receive focus', async () => {
    await element.focus();
    await waitForLitRender(element);

    expect(document.activeElement.id).to.be.equal('focus-id');
  });
});
