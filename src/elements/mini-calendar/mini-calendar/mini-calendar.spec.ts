import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbMiniCalendarElement } from './mini-calendar.component.js';

describe('sbb-mini-calendar', () => {
  let element: SbbMiniCalendarElement;

  beforeEach(async () => {
    element = await fixture(html` <sbb-mini-calendar></sbb-mini-calendar>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbMiniCalendarElement);
  });
});
