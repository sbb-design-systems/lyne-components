import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbMiniCalendarElement } from './mini-calendar.component.js';

describe(`sbb-mini-calendar ssr`, () => {
  let root: SbbMiniCalendarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-mini-calendar></sbb-mini-calendar>`, {
      modules: ['./mini-calendar.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbMiniCalendarElement);
  });
});
