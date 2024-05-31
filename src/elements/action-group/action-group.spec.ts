import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../button.js';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbActionGroupElement } from './action-group.js';
import './action-group.js';
import '../button/secondary-button.js';
import '../link/block-link.js';

describe(`sbb-action-group`, () => {
  describe('renders', () => {
    let element: SbbActionGroupElement;

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

    it('renders - Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('renders - ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('property sync', () => {
    const assertButtons = (
      root: SbbActionGroupElement,
      assertion: (link: SbbSecondaryButtonElement) => boolean,
    ): boolean => Array.from(root.querySelectorAll('sbb-secondary-button')).every(assertion);

    it('should sync default button-size property with sbb-button', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal">
          <sbb-secondary-button>Button</sbb-secondary-button>
          <sbb-block-link
            icon-name="chevron-small-left-small"
            href="https://github.com/sbb-design-systems/lyne-components"
          >
            Link </sbb-block-link
          >˙
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(assertButtons(root, (b) => b.size === 'l')).to.be.ok;
    });

    it('should sync button-size="m" property with sbb-button', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" button-size="m">
          <sbb-secondary-button>Button</sbb-secondary-button>
          <sbb-block-link
            icon-name="chevron-small-left-small"
            href="https://github.com/sbb-design-systems/lyne-components"
          >
            Link
          </sbb-block-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(assertButtons(root, (b) => b.size === 'm')).to.be.ok;
    });

    it('should sync button-size="s" property with sbb-button', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" button-size="s">
          <sbb-secondary-button>Button</sbb-secondary-button>
          <sbb-block-link
            icon-name="chevron-small-left-small"
            href="https://github.com/sbb-design-systems/lyne-components"
          >
            Link
          </sbb-block-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(assertButtons(root, (b) => b.size === 's')).to.be.ok;
    });

    it('should sync link-size property with sbb-link', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" link-size="s">
          <sbb-secondary-button>Button</sbb-secondary-button>
          <sbb-block-link
            icon-name="chevron-small-left-small"
            href="https://github.com/sbb-design-systems/lyne-components"
          >
            Link
          </sbb-block-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(Array.from(root.querySelectorAll('sbb-block-link')).every((l) => l.size === 's')).to.be
        .ok;
    });
  });
});
