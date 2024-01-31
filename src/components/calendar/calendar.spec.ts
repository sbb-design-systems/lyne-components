import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './calendar';
import '../button';

describe('sbb-calendar', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-calendar
        selected-date="2023-01-20T00:00:00"
        data-now="1672790400000"
      ></sbb-calendar>`,
    );
    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `<sbb-calendar data-now="1672790400000" selected-date="2023-01-20T00:00:00"></sbb-calendar>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with min and max', async () => {
    const page: HTMLElement = await fixture(
      html`<sbb-calendar
        selected-date="2023-01-20T00:00:00"
        min="2023-01-09T00:00:00"
        max="2023-01-29T00:00:00"
      ></sbb-calendar>`,
    );

    const buttonPrevDay = page.shadowRoot!.querySelector(
      "sbb-button[icon-name='chevron-small-left-small']",
    );
    expect(buttonPrevDay).to.have.attribute('disabled');
    const buttonNextDay = page.shadowRoot!.querySelector(
      "sbb-button[icon-name='chevron-small-right-small']",
    );
    expect(buttonNextDay).to.have.attribute('disabled');

    const emptyCells = page.shadowRoot!.querySelectorAll("[data-day='0 1 2023']");
    expect(emptyCells.length).to.be.equal(6);

    const lastDisabledMinDate = page.shadowRoot!.querySelector("[data-day='8 1 2023']");
    expect(lastDisabledMinDate).to.have.attribute('disabled');
    expect(lastDisabledMinDate).to.have.attribute('aria-disabled', 'true');
    const firstNotDisabledMinDate = page.shadowRoot!.querySelector("[data-day='9 1 2023']");
    expect(firstNotDisabledMinDate).not.to.have.attribute('disabled');
    expect(firstNotDisabledMinDate).to.have.attribute('aria-disabled', 'false');

    const lastNotDisabledMaxDate = page.shadowRoot!.querySelector("[data-day='29 1 2023']");
    expect(lastNotDisabledMaxDate).not.to.have.attribute('disabled');
    expect(lastNotDisabledMaxDate).to.have.attribute('aria-disabled', 'false');
    const firstDisabledMaxDate = page.shadowRoot!.querySelector("[data-day='30 1 2023']");
    expect(firstDisabledMaxDate).to.have.attribute('disabled');
    expect(firstDisabledMaxDate).to.have.attribute('aria-disabled', 'true');
  });

  testA11yTreeSnapshot(
    undefined,
    html`<sbb-calendar
      selected-date="2023-01-20T00:00:00"
      data-now="1672790400000"
    ></sbb-calendar>`,
  );
});
