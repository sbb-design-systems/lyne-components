import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { elementInternalsSpy, ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarElement } from './calendar.component.ts';

import '../../calendar.ts';

describe(`sbb-calendar ssr`, () => {
  let root: SbbCalendarElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);
    root = await ssrHydratedFixture(
      html`<sbb-calendar value="2023-01-20T00:00:00" week-numbers multiple></sbb-calendar>`,
      { modules: ['../../calendar.ts'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('renders shadow DOM', () => {
    assert.instanceOf(
      root.shadowRoot?.querySelector('.sbb-calendar__table-header'),
      HTMLDivElement,
    );
  });

  it('sets aria label', () => {
    const selectAllButton = root.shadowRoot?.querySelector('sbb-calendar-select-all');
    expect(elementInternals.get(selectAllButton!)?.ariaLabel).to.be.equal(
      'Select all days of January 2023',
    );
  });
});
