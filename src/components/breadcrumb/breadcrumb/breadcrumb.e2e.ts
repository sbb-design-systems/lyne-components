import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForCondition, EventSpy, waitForLitRender, fixture } from '../../core/testing';

import { SbbBreadcrumbElement } from './breadcrumb';

describe(`sbb-breadcrumb with ${fixture.name}`, () => {
  let element: SbbBreadcrumbElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-breadcrumb id="focus-id" href="#">Test</sbb-breadcrumb>`, {
      modules: ['./breadcrumb.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbBreadcrumbElement);
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

    expect(document.activeElement!.id).to.be.equal('focus-id');
  });
});
