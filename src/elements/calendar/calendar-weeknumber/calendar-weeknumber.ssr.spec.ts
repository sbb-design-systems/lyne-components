import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarWeeknumberElement } from './calendar-weeknumber.component.ts';

describe(`sbb-calendar-weeknumber ssr`, () => {
  let root: SbbCalendarWeeknumberElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-calendar-weeknumber .value=${'42'}></sbb-calendar-weeknumber>`,
      {
        modules: ['./calendar-weeknumber.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarWeeknumberElement);
  });
});
