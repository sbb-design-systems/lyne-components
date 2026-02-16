import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTagGroupElement } from './tag-group.component.ts';
import './tag-group.component.ts';
import '../tag.ts';

describe(`sbb-tag-group`, () => {
  let element: SbbTagGroupElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-tag-group>
          <sbb-tag value="tag-1">First tag</sbb-tag>
          <sbb-tag value="tag-2">Second tag</sbb-tag>
          <div></div>
          <sbb-tag value="tag-3">Third tag</sbb-tag>
        </sbb-tag-group>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
