import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { i18nCloseSidebar } from '../../core/i18n.ts';
import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbSidebarCloseButtonElement } from './sidebar-close-button.component.ts';

describe('sbb-sidebar-close-button', () => {
  let element: SbbSidebarCloseButtonElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    document.documentElement.removeAttribute('lang');

    element = await fixture(html`<sbb-sidebar-close-button></sbb-sidebar-close-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarCloseButtonElement);
  });

  it('should update the aria-label when language changes', async () => {
    expect(elementInternals.get(element)!.ariaLabel).to.equal(i18nCloseSidebar['en']);

    document.documentElement.setAttribute('lang', 'de');
    await waitForLitRender(element);

    expect(elementInternals.get(element)!.ariaLabel).to.equal(i18nCloseSidebar['de']);
  });

  it('should not update the aria-label when language changes and aria-label is customized', async () => {
    element.setAttribute('aria-label', 'Close this thing');

    document.documentElement.setAttribute('lang', 'de');
    await waitForLitRender(element);

    expect(element).to.have.attribute('aria-label', 'Close this thing');
  });
});
