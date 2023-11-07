import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { waitForLitRender } from '../core/testing';
import { SbbActionGroup } from './action-group';
import { SbbButton } from '../button';
import { SbbLink } from '../link';

describe('sbb-action-group', () => {
  let element: SbbActionGroup;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-action-group align-group="start" orientation="horizontal">
        <sbb-button variant="secondary">Button</sbb-button>
        <sbb-link
          icon-name="chevron-small-left-small"
          icon-placement="start"
          href="https://github.com/lyne-design-system/lyne-components"
        >
          Link
        </sbb-link>
      </sbb-action-group>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbActionGroup);
  });

  describe('property sync', () => {
    it('should sync default size with sbb-button', async () => {
      const links = Array.from(
        document.querySelectorAll('sbb-action-group sbb-button'),
      ) as SbbButton[];
      expect(links.every((l) => l.size === 'l')).to.be.ok;
    });

    it('should update attributes with button-size="m"', async () => {
      element.setAttribute('button-size', 'm');
      await waitForLitRender(element);
      const links = Array.from(
        document.querySelectorAll('sbb-action-group sbb-button'),
      ) as SbbButton[];
      expect(links.every((l) => l.size === 'm')).to.be.ok;
    });

    it('should update attributes with link-size="s"', async () => {
      element.setAttribute('link-size', 's');
      await waitForLitRender(element);
      const links = Array.from(document.querySelectorAll('sbb-action-group sbb-link')) as SbbLink[];
      expect(links.every((l) => l.size === 's')).to.be.ok;
    });

    it('should apply variant block to sbb-link', async () => {
      await waitForLitRender(element);
      const links = Array.from(document.querySelectorAll('sbb-action-group sbb-link')) as SbbLink[];
      expect(links.every((l) => l.variant === 'block')).to.be.ok;
    });
  });
});
