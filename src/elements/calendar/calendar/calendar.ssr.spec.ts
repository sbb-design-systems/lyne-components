import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { elementInternalsSpy, ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbCalendarElement } from './calendar.component.ts';

import '../../calendar.ts';

describe(`sbb-calendar ssr`, () => {
  let root: SbbCalendarElement;
  const elementInternals = elementInternalsSpy();

  it('renders', async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);

    root = await ssrHydratedFixture(html`<sbb-calendar></sbb-calendar>`, {
      modules: ['../../calendar.ts'],
    });
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('renders with value', async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);

    root = await ssrHydratedFixture(
      html`<sbb-calendar value="2023-01-20T00:00:00"></sbb-calendar>`,
      {
        modules: ['../../calendar.ts'],
      },
    );
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('renders with week-numbers', async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);

    root = await ssrHydratedFixture(html`<sbb-calendar week-numbers></sbb-calendar>`, {
      modules: ['../../calendar.ts'],
    });
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('renders with multiple', async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);

    root = await ssrHydratedFixture(html`<sbb-calendar multiple></sbb-calendar>`, {
      modules: ['../../calendar.ts'],
    });
    assert.instanceOf(root, SbbCalendarElement);
  });

  it('renders with orientation vertical', async function () {
    // This test seems flaky for unknown reason, so we extend the timeout for this specific test.
    this.timeout(20000);

    root = await ssrHydratedFixture(
      html`<sbb-calendar
        value="2023-01-20T00:00:00"
        week-numbers
        multiple
        orientation="vertical"
      ></sbb-calendar>`,
      {
        modules: ['../../calendar.ts'],
      },
    );
    assert.instanceOf(root, SbbCalendarElement);
  });

  describe('multiple with week-numbers', () => {
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
});
