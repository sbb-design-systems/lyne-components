import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';

import { defaultDateAdapter } from '../../core/datetime.ts';
import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing/wait-for-render.ts';

import { SbbMiniCalendarElement } from './mini-calendar.component.ts';
import '../mini-calendar-month.ts';
import '../mini-calendar-day.ts';

describe('sbb-mini-calendar', () => {
  let element: SbbMiniCalendarElement;

  const getActiveElementDate: () => string | null = () =>
    document.activeElement!.getAttribute('date');

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-mini-calendar>
        <sbb-mini-calendar-month date="2025-01">
          ${repeat(
            new Array(31),
            (_, index) =>
              html`<sbb-mini-calendar-day
                date=${defaultDateAdapter.toIso8601(new Date(2025, 0, index + 1))}
              ></sbb-mini-calendar-day>`,
          )}
        </sbb-mini-calendar-month>
        <sbb-mini-calendar-month date="2025-02">
          ${repeat(
            new Array(28),
            (_, index) =>
              html`<sbb-mini-calendar-day
                date=${defaultDateAdapter.toIso8601(new Date(2025, 1, index + 1))}
              ></sbb-mini-calendar-day>`,
          )}
        </sbb-mini-calendar-month>
      </sbb-mini-calendar>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbMiniCalendarElement);
  });

  describe('keyboard navigation', () => {
    it('it should focus on first element', () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should not navigate when unmapped keys are pressed', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'a' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: '1' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should not navigate out of bounds with special keys', async () => {
      element.focus();
      // no navigation before
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      // go to lower bound
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
      // no navigation after
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
      await sendKeys({ press: 'PageDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
    });

    it('it should navigate with arrows', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-02');
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-09');
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-08');
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should navigate with special keys', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'PageDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-29');
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-30');
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-02');
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should navigate to next month if last day is reached', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-02-01');
    });

    it('it should navigate between months if last week is reached', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-29');
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-02-05');
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-02-04');
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-28');
    });
  });

  describe('keyboard navigation vertical', () => {
    beforeEach(async () => {
      element.orientation = 'vertical';
      await waitForLitRender(element);
    });

    it('it should focus on first element', () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should not navigate when unmapped keys are pressed', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'a' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: '1' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should not navigate out of bounds with special keys', async () => {
      element.focus();
      // no navigation before
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      // go to lower bound
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
      // no navigation after
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
    });

    it('it should navigate with arrows', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-08');
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-09');
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-02');
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should navigate with special keys', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'PageDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-05');
      await sendKeys({ press: 'End' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
      await sendKeys({ press: 'PageUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-27');
      await sendKeys({ press: 'Home' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
    });

    it('it should navigate to next month if last day is reached', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-31');
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-02-01');
    });

    it('it should navigate between months if last week is reached', async () => {
      element.focus();
      expect(getActiveElementDate()).to.be.equal('2025-01-01');
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowRight' });
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-29');
      await sendKeys({ press: 'ArrowRight' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-02-05');
      await sendKeys({ press: 'ArrowUp' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-02-04');
      await sendKeys({ press: 'ArrowLeft' });
      await waitForLitRender(element);
      expect(getActiveElementDate()).to.be.equal('2025-01-28');
    });
  });
});
