import './visual-checkbox';

import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('sbb-visual-checkbox', () => {
  it('renders unchecked', async () => {
    expect(await fixture(html`<sbb-visual-checkbox />`)).shadowDom.to.be.equal(`
        <span class="sbb-visual-checkbox">
          <span class="sbb-visual-checkbox__icon">
          </span>
        </span>
    `);
  });

  it('renders checked', async () => {
    expect(await fixture(html`<sbb-visual-checkbox checked="" />`)).shadowDom.to.be.equal(`
        <span class="sbb-visual-checkbox">
          <span class="sbb-visual-checkbox__icon">
            <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d='M8 12.3304L10.4615 15L16 9'
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          </span>
        </span>
    `);
  });

  it('renders indeterminate', async () => {
    expect(await fixture(html`<sbb-visual-checkbox indeterminate="" />`)).shadowDom.to.be.equal(`
        <span class="sbb-visual-checkbox">
          <span class="sbb-visual-checkbox__icon">
            <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d='M9 12H15'
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          </span>
        </span>
      `);
  });
});
