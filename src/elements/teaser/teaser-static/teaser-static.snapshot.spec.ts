import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTeaserStaticElement } from './teaser-static.component.ts';

import '../../button.ts';
import '../../chip-label.ts';
import '../../title.ts';
import '../../teaser.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/lucerne.png');

describe(`sbb-teaser-static`, () => {
  let element: SbbTeaserStaticElement;

  describe('renders below with projected content', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser-static alignment="below">
          <figure slot="image" class="sbb-figure">
            <img src=${imageUrl} alt="400x300" />
          </figure>
          <sbb-chip-label>Chip</sbb-chip-label>
          <sbb-title level="2">Title</sbb-title>
          A brief description.
          <sbb-secondary-button-link href="#">Read more</sbb-secondary-button-link>
        </sbb-teaser-static>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot({ ignoreAttributes: ['src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
