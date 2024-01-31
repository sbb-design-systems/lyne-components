import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../button';
import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbActionGroupElement } from './action-group';
import './action-group';
import '../button';
import '../link';

describe('sbb-action-group', () => {
  describe('renders', () => {
    let element: SbbActionGroupElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `);
      await waitForLitRender(element);
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
      assertion: (link: SbbButtonElement) => boolean,
    ): boolean => Array.from(root.querySelectorAll('sbb-button')).every(assertion);

    it('should sync default button-size property with sbb-button', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(assertButtons(root, (b) => b.size === 'l')).to.be.ok;
    });

    it('should sync button-size property with sbb-button', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" button-size="m">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(assertButtons(root, (b) => b.size === 'm')).to.be.ok;
    });

    it('should apply block variant to sbb-link', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" button-size="m">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(Array.from(root.querySelectorAll('sbb-link')).every((l) => l.variant === 'block')).to
        .be.ok;
    });

    it('should sync link-size property with sbb-link', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" link-size="s">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(Array.from(root.querySelectorAll('sbb-link')).every((l) => l.size === 's')).to.be.ok;
    });
  });
});
