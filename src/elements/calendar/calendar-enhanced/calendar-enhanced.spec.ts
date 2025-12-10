import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCalendarEnhancedElement } from './calendar-enhanced.component.ts';

describe('sbb-calendar-enhanced', () => {
  let element: SbbCalendarEnhancedElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-calendar-enhanced></sbb-calendar-enhanced>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCalendarEnhancedElement);
  });
});
