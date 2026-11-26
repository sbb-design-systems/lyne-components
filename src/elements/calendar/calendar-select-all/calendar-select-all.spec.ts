import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCalendarSelectAllElement } from './calendar-select-all.component.ts';

import '../../calendar.ts';

describe('sbb-calendar-select-all', () => {
  let element: SbbCalendarSelectAllElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-calendar-select-all></sbb-calendar-select-all>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCalendarSelectAllElement);
  });
});
