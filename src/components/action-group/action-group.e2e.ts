import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../button/secondary-button';
import { waitForLitRender } from '../core/testing';
import type { SbbBlockLinkElement } from '../link';

import { SbbActionGroupElement } from './action-group';

describe('sbb-action-group', () => {
  let element: SbbActionGroupElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-action-group align-group="start" orientation="horizontal">
        <sbb-secondary-button>Button</sbb-secondary-button>
        <sbb-block-link
          icon-name="chevron-small-left-small"
          icon-placement="start"
          href="https://github.com/lyne-design-system/lyne-components"
        >
          Link
        </sbb-block-link>
      </sbb-action-group>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbActionGroupElement);
  });

  describe('property sync', () => {
    it('should sync default size with sbb-button', async () => {
      const links = Array.from(
        document.querySelectorAll('sbb-action-group sbb-secondary-button'),
      ) as SbbSecondaryButtonElement[];
      expect(links.every((l) => l.size === 'l')).to.be.ok;
    });

    it('should update attributes with button-size="m"', async () => {
      element.setAttribute('button-size', 'm');
      await waitForLitRender(element);
      const links = Array.from(
        document.querySelectorAll('sbb-action-group sbb-secondary-button'),
      ) as SbbSecondaryButtonElement[];
      expect(links.every((l) => l.size === 'm')).to.be.ok;
    });

    it('should update attributes with link-size="s"', async () => {
      element.setAttribute('link-size', 's');
      await waitForLitRender(element);
      const links = Array.from(
        document.querySelectorAll('sbb-action-group sbb-block-link'),
      ) as SbbBlockLinkElement[];
      expect(links.every((l) => l.size === 's')).to.be.ok;
    });
  });
});
