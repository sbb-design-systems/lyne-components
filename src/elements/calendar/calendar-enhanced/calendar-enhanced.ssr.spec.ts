import { assert } from '@open-wc/testing';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';

import { defaultDateAdapter } from '../../core/datetime.ts';
import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarEnhancedElement } from './calendar-enhanced.component.ts';
import '../calendar-day/calendar-day.component.ts';

describe(`sbb-calendar-enhanced ssr`, () => {
  let root: SbbCalendarEnhancedElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-calendar-enhanced>
          ${repeat(new Array(31), (_, index) => {
            const slotName = defaultDateAdapter.toIso8601(new Date(`2025-01-${index + 1}`));
            return html` <sbb-calendar-day slot=${slotName}></sbb-calendar-day>`;
          })}
        </sbb-calendar-enhanced>
      `,
      {
        modules: ['./calendar-enhanced.component.js', '../calendar-day/calendar-day.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarEnhancedElement);
  });

  it('renders shadow DOM', () => {
    assert.instanceOf(root.shadowRoot?.querySelector('.sbb-calendar__controls'), HTMLDivElement);
  });
});
