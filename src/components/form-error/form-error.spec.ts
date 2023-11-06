import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './form-error';

describe('sbb-form-error', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-form-error>Required</sbb-form-error>`);

    expect(root).dom.to.be.equal(`
      <sbb-form-error id="sbb-form-error-1">
        Required
      </sbb-form-error>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class="form-error__icon">
        <slot name='icon'>
          <svg
            class="form-error__icon-svg"
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="3" x2="7" y2="8.5" />
            <line x1="7" y1="10" x2="7" y2="11" />
            <circle cx="7" cy="7" r="6.5" />
          </svg>
        </slot>
      </span>
      <span class="form-error-content">
        <slot></slot>
      </span>
    `);
  });
});
