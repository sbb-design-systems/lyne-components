import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './teaser';
import '../title';

describe('sbb-teaser', () => {
  describe('sbb-teaser is stacked', () => {
    it('renders', async () => {
      const root = await fixture(
        html`<sbb-teaser
          href="https://github.com/lyne-design-system/lyne-components"
          is-stacked
          aria-label="Sbb teaser"
        ></sbb-teaser>`,
      );

      expect(root).dom.to.be.equal(
        `
        <sbb-teaser aria-label="Sbb teaser" href="https://github.com/lyne-design-system/lyne-components" is-stacked role="link" tabindex="0" dir="ltr">
        </sbb-teaser>
        `,
      );
      expect(root).shadowDom.to.be.equal(
        `
          <a class="sbb-teaser" href="https://github.com/lyne-design-system/lyne-components" role="presentation" tabindex="-1">
            <span class="sbb-teaser__container">
              <span class='sbb-teaser__image-wrapper'><slot name='image'></slot></span>
              <span class='sbb-teaser__text'>
                <sbb-title aria-level="5" role="heading" class="sbb-teaser__lead" level="5" visual-level="5">
                  <slot name='title'></slot>
                </sbb-title>
              <p class='sbb-teaser__description'><slot name='description'></slot></p>
            </span>
          </a>
        `,
      );
    });
  });
  describe('sbb-teaser is not stacked', () => {
    it('renders', async () => {
      const root = await fixture(
        html`<sbb-teaser
          href="https://github.com/lyne-design-system/lyne-components"
          aria-label="Sbb teaser"
        ></sbb-teaser>`,
      );

      expect(root).dom.to.be.equal(
        `
        <sbb-teaser aria-label="Sbb teaser" href="https://github.com/lyne-design-system/lyne-components" role="link" tabindex="0" dir="ltr">
        </sbb-teaser>
        `,
      );
      expect(root).shadowDom.to.be.equal(
        `
          <a class="sbb-teaser" href="https://github.com/lyne-design-system/lyne-components" role="presentation" tabindex="-1">
            <span class="sbb-teaser__container">
              <span class='sbb-teaser__image-wrapper'><slot name='image'></slot></span>
                <span class='sbb-teaser__text'>
                  <sbb-title aria-level="5" role="heading" class="sbb-teaser__lead" level="5" visual-level="5">
                    <slot name='title'></slot>
                  </sbb-title>
                <p class='sbb-teaser__description'><slot name='description'></slot></p>
              </span>
            </span>
          </a>
        `,
      );
    });
  });
});
