import './sbb-toast';
import { SbbToast } from './sbb-toast';

import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('sbb-toast', () => {
  it('renders', async () => {
    const root: SbbToast = await fixture(html`
      <sbb-toast icon-name="circle-tick-small" dismissible="true"> 'Lorem ipsum dolor' </sbb-toast>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-toast position="bottom-center" icon-name="circle-tick-small" dismissible="true" data-state="closed" 
        data-has-icon data-has-action
      >
        <span>'Lorem ipsum dolor'</span>
      </sbb-toast>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-toast__overlay-container">
        <div class="sbb-toast">
          <div class="sbb-toast__icon">
            <slot name="icon">
              <sbb-icon name="circle-tick-small">
              </sbb-icon>
            </slot>
          </div>
          <div class="sbb-toast__content" aria-live="polite">
            <slot></slot>
          </div>
          <div class="sbb-toast__action">
            <slot name="action">
              <sbb-button class="sbb-toast__action-button" aria-label="Close message" variant="transparent" negative size="m" icon-name="cross-small" sbb-toast-close >
              </sbb-button>
            </slot>
          </div>
        </div>
      </div>
    `);
  });
});
