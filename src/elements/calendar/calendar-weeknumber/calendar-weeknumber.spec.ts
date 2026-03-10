import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbCalendarWeeknumberElement } from './calendar-weeknumber.component.ts';

describe('sbb-calendar-weeknumber', () => {
  let element: SbbCalendarWeeknumberElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-calendar-weeknumber .value=${'27'}></sbb-calendar-weeknumber>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCalendarWeeknumberElement);
  });
});
