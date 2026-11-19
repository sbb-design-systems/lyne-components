import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarSelectAllElement } from './calendar-select-all.component.ts';

import '../../calendar.ts';

describe(`sbb-calendar-select-all ssr`, () => {
  let root: SbbCalendarSelectAllElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-calendar-select-all></sbb-calendar-select-all>`, {
      modules: ['../../calendar.ts'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarSelectAllElement);
  });
});
