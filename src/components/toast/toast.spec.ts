import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isFirefox } from '../core/dom';

import type { SbbToastElement } from './toast';

import './toast';

describe('sbb-toast', () => {
  it('renders', async () => {
    const root: SbbToastElement = await fixture(html`
      <sbb-toast icon-name="circle-tick-small" dismissible> 'Lorem ipsum dolor' </sbb-toast>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-toast position="bottom-center" icon-name="circle-tick-small" dismissible="" data-state="closed" 
        data-has-icon data-has-action
      >
        <span>'Lorem ipsum dolor'</span>
      </sbb-toast>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-toast__overlay-container">
        <div class="sbb-toast" ${isFirefox() ? 'role="status"' : ''}>
          <div class="sbb-toast__icon">
            <slot name="icon">
              <sbb-icon name="circle-tick-small" role="img" aria-hidden="true" data-namespace="default">
              </sbb-icon>
            </slot>
          </div>
          <div class="sbb-toast__content" aria-live="polite">
            <slot></slot>
          </div>
          <div class="sbb-toast__action">
            <slot name="action">
              <sbb-button class="sbb-toast__action-button" aria-label="Close message" 
                variant="transparent" negative size="m" icon-name="cross-small" 
                dir="ltr" role="button" tabindex="0" data-icon-only sbb-toast-close 
              >
              </sbb-button>
            </slot>
          </div>
        </div>
      </div>
    `);
  });
});
