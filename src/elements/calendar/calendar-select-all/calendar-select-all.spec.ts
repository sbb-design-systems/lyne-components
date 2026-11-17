import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { i18nCalendarSelectAll } from '../../core/i18n/i18n.ts';
import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbCalendarSelectAllElement } from './calendar-select-all.component.ts';

import '../../calendar.ts';

describe('sbb-calendar-select-all', () => {
  let element: SbbCalendarSelectAllElement;
  let originalLang: string | null;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    originalLang = document.documentElement.getAttribute('lang');
    document.documentElement.lang = 'en';
    element = await fixture(html`<sbb-calendar-select-all></sbb-calendar-select-all>`);
  });

  afterEach(() => {
    if (originalLang === null) {
      document.documentElement.removeAttribute('lang');
    } else {
      document.documentElement.setAttribute('lang', originalLang);
    }
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCalendarSelectAllElement);
  });

  it('updates the accessible label when the language changes', async () => {
    expect(elementInternals.get(element)!.ariaLabel).to.equal(i18nCalendarSelectAll['en']);
    for (const language of ['de', 'fr', 'it', 'en'] as const) {
      document.documentElement.lang = language;
      await waitForLitRender(element);
      expect(elementInternals.get(element)!.ariaLabel).to.equal(i18nCalendarSelectAll[language]);
    }
  });

  it('preserves an explicitly set aria-label', async () => {
    element.setAttribute('aria-label', 'Custom label');
    document.documentElement.lang = 'de';
    await waitForLitRender(element);

    expect(element.getAttribute('aria-label')).to.equal('Custom label');
  });
});
