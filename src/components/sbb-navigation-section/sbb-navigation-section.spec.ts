import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-navigation-section';

describe('sbb-navigation-section', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-navigation-section />`);

    expect(root).dom.to.be.equal(
      `
        <sbb-navigation-section slot="navigation-section" data-state="closed" id="sbb-navigation-section-1">
        </sbb-navigation-section>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-navigation-section__container">
          <dialog class="sbb-navigation-section" role="group" aria-labelledby="title">
            <div class="sbb-navigation-section__wrapper">
              <div class="sbb-navigation-section__content">
                <sbb-divider class="sbb-navigation-section__divider" negative orientation="vertical"></sbb-divider>
                <slot></slot>
              </div>
            </div>
          </dialog>
        </div>
      `,
    );
  });
});
