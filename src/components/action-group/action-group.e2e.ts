import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbSecondaryButtonElement } from '../button.js';
import { fixture } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';
import type { SbbBlockLinkElement } from '../link.js';

import { SbbActionGroupElement } from './action-group.js';

import '../button/secondary-button.js';
import '../link/block-link.js';

describe(`sbb-action-group with ${fixture.name}`, () => {
  let element: SbbActionGroupElement;

  beforeEach(async () => {
    element = await fixture(
      html`
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
      `,
      { modules: ['./action-group.ts', '../button.ts', '../link.ts'] },
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbActionGroupElement);
  });

  describe('property sync', () => {
    it('should sync default size with sbb-button', async () => {
      const buttons = Array.from(
        element.querySelectorAll('sbb-secondary-button'),
      ) as SbbSecondaryButtonElement[];
      expect(buttons.length).to.be.greaterThan(0);
      expect(buttons.every((l) => l.size === 'l')).to.be.ok;
    });

    it('should update attributes with button-size="m"', async () => {
      element.setAttribute('button-size', 'm');
      await waitForLitRender(element);
      const buttons = Array.from(
        element.querySelectorAll('sbb-secondary-button'),
      ) as SbbSecondaryButtonElement[];
      expect(buttons.length).to.be.greaterThan(0);
      expect(buttons.every((l) => l.size === 'm')).to.be.ok;
    });

    it('should update attributes with link-size="s"', async () => {
      element.setAttribute('link-size', 's');
      await waitForLitRender(element);
      const links = Array.from(element.querySelectorAll('sbb-block-link')) as SbbBlockLinkElement[];
      expect(links.length).to.be.greaterThan(0);
      expect(links.every((l) => l.size === 's')).to.be.ok;
    });
  });
});
