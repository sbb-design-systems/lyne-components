import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../core/images';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private';

import type { SbbTeaserElement } from './teaser';

import './teaser';

describe(`sbb-teaser`, () => {
  let element: SbbTeaserElement;

  describe('renders after centered', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/lyne-design-system/lyne-components"
          alignment="after-centered"
          aria-label="SBB teaser"
        ></sbb-teaser>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders after with title level set', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/lyne-design-system/lyne-components"
          alignment="after"
          aria-label="SBB teaser"
          title-level="2"
        ></sbb-teaser>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('renders below with projected content', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/lyne-design-system/lyne-components"
          aria-label="SBB teaser"
          alignment="below"
        >
          <img slot="image" src=${images[0]} alt="400x300" />
          <span slot="chip">Chip</span>
          <span slot="title">TITLE</span>
          description
        </sbb-teaser>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
