import { getDiffableHTML } from '@open-wc/semantic-dom-diff/get-diffable-html.js';
import { getOuterHtml, getCleanedShadowDom } from '@open-wc/semantic-dom-diff/src/utils.js';
import { html } from 'lit';
import { describe, it, expect, beforeEach } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';

import { a11yTreeSnapshot } from '../../../tools/web-test-runner/aria-tree-plugin-vitest.ts';
import { waitForLitRender } from '../core/testing.ts';

import type { SbbChipLabelElement } from './chip-label.component.ts';

import '../chip-label.ts';

describe(`sbb-chip-label`, () => {
  let element: SbbChipLabelElement;

  it('renders', async () => {
    const screen = render(html`<sbb-chip-label>Label</sbb-chip-label>`); // We can make a "fixture" function
    element = screen.container.firstElementChild as SbbChipLabelElement;
    await waitForLitRender(element);

    expect(true).to.be.true;
  });

  it('user interaction', async () => {
    const screen = render(html`<sbb-chip-label>Label</sbb-chip-label>`);
    element = screen.container.firstElementChild as SbbChipLabelElement;
    await waitForLitRender(element);

    const screen2 = render(html`<input />`);
    const input = screen2.container.firstElementChild as HTMLInputElement;

    await userEvent.click(element);
    await userEvent.click(element, { modifiers: ['Shift'] });
    await userEvent.tab();

    // Uses https://testing-library.com/docs/user-event/keyboard/ syntax
    input.focus();
    await userEvent.keyboard('foo');
    await userEvent.keyboard('{enter}');

    expect(true).to.be.true;
  });

  // ### SNAPSHOT ###
  // Snapshot file is different but whatever
  describe('snapshots', () => {
    beforeEach(async () => {
      const screen = render(html`
        <div aria-label="Fixture Container">
          <sbb-chip-label id="a11y-test" aria-label="test-aria-label">Label</sbb-chip-label>
        </div>
      `);
      element = screen.container.firstElementChild!.querySelector(
        'sbb-chip-label',
      ) as SbbChipLabelElement;
      await waitForLitRender(element);
    });

    it('DOM', async () => {
      await expect(getDiffableHTML(getOuterHtml(element))).toMatchSnapshot(); // TODO improve usage by making an assertion plugin "expect(..).dom.toMatchSnapshot()"
    });

    it('Shadow DOM', async () => {
      await expect(getDiffableHTML(getCleanedShadowDom(element))).toMatchSnapshot();
    });

    it('A11y tree', async () => {
      const result = await a11yTreeSnapshot();
      await expect(result).toMatchSnapshot();
    });
  });

  // ### VISUAL SPEC ###
  // TODO: We need something to retrieve the true baseline
  it('visual spec', async () => {
    await page.viewport(414, 896);

    const screen = render(
      html` <div style="padding: 1rem">
        <sbb-chip-label color="charcoal">Label</sbb-chip-label>
      </div>`,
    );
    element = screen.container.firstElementChild as SbbChipLabelElement;
    await waitForLitRender(element);

    await expect(element).toMatchScreenshot();
  });

  // TODO SSR
});

// TODO: find an equivalent of "emulateMedia"
