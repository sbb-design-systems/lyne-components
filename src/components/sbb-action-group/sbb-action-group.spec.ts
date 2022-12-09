import { SbbActionGroup } from './sbb-action-group';
import { newSpecPage } from '@stencil/core/testing';
import { AnyHTMLElement } from '@stencil/core/internal';

describe('sbb-action-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbActionGroup],
      html: `
        <sbb-action-group align="start" orientation="horizontal">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            variant="block"
            text-size="s"
            icon-name="chevron-small-left-small"
            icon-placement="start"
            href="https://github.com/lyne-design-system/lyne-components">
            Link
          </sbb-link>
        </sbb-action-group>
      `,
    });

    expect(root).toEqualHtml(`
      <sbb-action-group align="start" orientation="horizontal" align-group="start" horizontal-from="medium">
        <mock:shadow-root>
          <div class="sbb-action-group">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <sbb-button variant="secondary">Button</sbb-button>
        <sbb-link
          variant="block"
          text-size="s"
          icon-name="chevron-small-left-small"
          icon-placement="start"
          href="https://github.com/lyne-design-system/lyne-components">
          Link
        </sbb-link>
      </sbb-action-group>
      `);
  });

  describe('property sync', () => {
    const assertButtons = (
      root: AnyHTMLElement,
      assertion: (link: HTMLSbbButtonElement) => boolean
    ): boolean => Array.from(root.querySelectorAll('sbb-button')).every(assertion);

    it('should sync default size property with sbb-button', async () => {
      const { root } = await newSpecPage({
        components: [SbbActionGroup],
        html: `
          <sbb-action-group align="start" orientation="horizontal">
            <sbb-button variant="secondary">Button</sbb-button>
            <sbb-link
              variant="block"
              text-size="s"
              icon-name="chevron-small-left-small"
              icon-placement="start"
              href="https://github.com/lyne-design-system/lyne-components">
              Link
            </sbb-link>
          </sbb-action-group>
        `,
      });

      expect(assertButtons(root, (b) => b.size === 'l')).toBeTruthy();
    });

    it('should sync size property with sbb-button', async () => {
      const { root } = await newSpecPage({
        components: [SbbActionGroup],
        html: `
          <sbb-action-group align="start" orientation="horizontal" size="m">
            <sbb-button variant="secondary">Button</sbb-button>
            <sbb-link
              variant="block"
              text-size="s"
              icon-name="chevron-small-left-small"
              icon-placement="start"
              href="https://github.com/lyne-design-system/lyne-components">
              Link
            </sbb-link>
          </sbb-action-group>
        `,
      });

      expect(assertButtons(root, (b) => b.size === 'm')).toBeTruthy();
    });

    it('should apply block variant to sbb-link', async () => {
      const { root } = await newSpecPage({
        components: [SbbActionGroup],
        html: `
          <sbb-action-group align="start" orientation="horizontal" size="m">
            <sbb-button variant="secondary">Button</sbb-button>
            <sbb-link
              icon-name="chevron-small-left-small"
              icon-placement="start"
              href="https://github.com/lyne-design-system/lyne-components">
              Link
            </sbb-link>
          </sbb-action-group>
        `,
      });

      expect(
        Array.from(root.querySelectorAll('sbb-link')).every((l) => l.variant === 'block')
      ).toBeTruthy();
    });
  });
});
