import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import { i18nClosePopover } from '../../core.ts';

import { SbbPopoverCloseButtonElement } from './popover-close-button.component.ts';

import '../../popover.ts';

describe('sbb-popover-close-button', () => {
  let element: SbbPopoverCloseButtonElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    document.documentElement.removeAttribute('lang');

    element = await fixture(html`<sbb-popover-close-button></sbb-popover-close-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPopoverCloseButtonElement);
  });

  it('should update the aria-label when language changes', async () => {
    expect(elementInternals.get(element)!.ariaLabel).to.equal(i18nClosePopover['en']);

    document.documentElement.setAttribute('lang', 'de');
    await waitForLitRender(element);

    expect(elementInternals.get(element)!.ariaLabel).to.equal(i18nClosePopover['de']);
  });
});
