import { SbbActionGroup } from './sbb-action-group';
import { newSpecPage } from '@stencil/core/testing';
import { AnyHTMLElement } from '@stencil/core/internal';
import { patchSlotchangeEvent } from '../../global/testing';

describe('sbb-action-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbActionGroup],
      html: `
        <sbb-action-group align="start" orientation="horizontal">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components">
            Link
          </sbb-link>
        </sbb-action-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-action-group align="start" orientation="horizontal" align-group="start" horizontal-from="medium" button-size="l" link-size="m">
        <mock:shadow-root>
          <div class="sbb-action-group">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <sbb-button variant="secondary">Button</sbb-button>
        <sbb-link
          icon-name="chevron-small-left-small"
          href="https://github.com/lyne-design-system/lyne-components">
          Link
        </sbb-link>
      </sbb-action-group>
      `);
  });

  describe('property sync', () => {
    const assertButtons = (
      root: AnyHTMLElement,
      assertion: (link: HTMLSbbButtonElement) => boolean,
    ): boolean => Array.from(root.querySelectorAll('sbb-button')).every(assertion);

    it('should sync default button-size property with sbb-button', async () => {
      const { root } = await newSpecPage({
        components: [SbbActionGroup],
        html: `
          <sbb-action-group align="start" orientation="horizontal">
            <sbb-button variant="secondary">Button</sbb-button>
            <sbb-link
              icon-name="chevron-small-left-small"
              href="https://github.com/lyne-design-system/lyne-components">
              Link
            </sbb-link>
          </sbb-action-group>
        `,
      });
      patchSlotchangeEvent(root);

      expect(assertButtons(root, (b) => b.size === 'l')).toBeTruthy();
    });

    it('should sync button-size property with sbb-button', async () => {
      const { root } = await newSpecPage({
        components: [SbbActionGroup],
        html: `
          <sbb-action-group align="start" orientation="horizontal" button-size="m">
            <sbb-button variant="secondary">Button</sbb-button>
            <sbb-link
              icon-name="chevron-small-left-small"
              href="https://github.com/lyne-design-system/lyne-components">
              Link
            </sbb-link>
          </sbb-action-group>
        `,
      });
      patchSlotchangeEvent(root);

      expect(assertButtons(root, (b) => b.size === 'm')).toBeTruthy();
    });

    it('should apply block variant to sbb-link', async () => {
      const { root } = await newSpecPage({
        components: [SbbActionGroup],
        html: `
          <sbb-action-group align="start" orientation="horizontal" button-size="m">
            <sbb-button variant="secondary">Button</sbb-button>
            <sbb-link
              icon-name="chevron-small-left-small"
              href="https://github.com/lyne-design-system/lyne-components">
              Link
            </sbb-link>
          </sbb-action-group>
        `,
      });
      patchSlotchangeEvent(root);

      expect(
        Array.from(root.querySelectorAll('sbb-link')).every((l) => l.variant === 'block'),
      ).toBeTruthy();
    });

    it('should sync link-size property with sbb-link', async () => {
      const { root } = await newSpecPage({
        components: [SbbActionGroup],
        html: `
          <sbb-action-group align="start" orientation="horizontal" link-size="s">
            <sbb-button variant="secondary">Button</sbb-button>
            <sbb-link
              icon-name="chevron-small-left-small"
              href="https://github.com/lyne-design-system/lyne-components">
              Link
            </sbb-link>
          </sbb-action-group>
        `,
      });
      patchSlotchangeEvent(root);

      expect(
        Array.from(root.querySelectorAll('sbb-link')).every((l) => l.size === 's'),
      ).toBeTruthy();
    });
  });
});
