import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbTeaserElement } from './teaser.component.ts';

import '../chip-label.ts';
import '../title.ts';
import './teaser.component.ts';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

describe(`sbb-teaser`, () => {
  let element: SbbTeaserElement;

  describe('renders after centered', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/sbb-design-systems/lyne-components"
          alignment="after-centered"
          accessibility-label="SBB teaser"
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

  describe('renders after with title set', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/sbb-design-systems/lyne-components"
          alignment="after"
          accessibility-label="SBB teaser"
        >
          <sbb-title level="2">Title</sbb-title>
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

  describe('renders below with projected content', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/sbb-design-systems/lyne-components"
          accessibility-label="SBB teaser"
          alignment="below"
        >
          <figure slot="image" class="sbb-figure">
            <img src=${imageUrl} alt="400x300" />
          </figure>
          <sbb-chip-label>Chip</sbb-chip-label>
          <sbb-title level="2">Title</sbb-title>
          A brief description.
        </sbb-teaser>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot({ ignoreAttributes: ['src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
