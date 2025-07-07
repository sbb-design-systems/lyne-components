import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbActionGroupElement } from './action-group.component.js';
import './action-group.component.js';
import '../button/secondary-button.js';
import '../link/block-link.js';

describe(`sbb-action-group`, () => {
  describe('renders', () => {
    let element: SbbActionGroupElement;

    describe('renders', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-action-group align-group="start" orientation="horizontal">
            <sbb-secondary-button>Button</sbb-secondary-button>
            <sbb-block-link
              icon-name="chevron-small-left-small"
              href="https://github.com/sbb-design-systems/lyne-components"
            >
              Link
            </sbb-block-link>
          </sbb-action-group>
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
});
