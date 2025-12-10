import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarEnhancedElement } from './calendar-enhanced.component.ts';

describe(`sbb-calendar-enhanced ssr`, () => {
  let root: SbbCalendarEnhancedElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-calendar-enhanced></sbb-calendar-enhanced>`, {
      modules: ['./calendar-enhanced.component.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarEnhancedElement);
  });
});
