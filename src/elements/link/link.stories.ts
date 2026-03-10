import type {
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
  WebComponentsRenderer,
} from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { Args, ArgTypes, InputType } from 'storybook/internal/types';

import type { SbbBlockLinkElement } from './block-link/block-link.component.ts';
import readme from './readme.md?raw';

import '../link.ts';
import '../notification.ts';
import '../table.ts';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm', null] satisfies (SbbBlockLinkElement['size'] | null)[],
  table: {
    category: 'Block Link',
  },
};

const iconPlacement: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end', null] satisfies (SbbBlockLinkElement['iconPlacement'] | null)[],
  table: {
    category: 'Block Link',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  size,
  iconPlacement,
};

const defaultArgs: Args = {
  negative: false,
  size: size.options![3],
  iconPlacement: iconPlacement.options![2],
};

const tableHeader = (negative: boolean, content: TemplateResult): TemplateResult => html`
  <sbb-table-wrapper>
    <table class="sbb-table sbb-table--unstriped ${negative ? `sbb-table--negative` : ``}">
      <thead>
        <tr>
          <th>State</th>
          <th>Inline Link</th>
          <th>Block Link</th>
        </tr>
      </thead>
      <tbody>
        ${content}
      </tbody>
    </table>
  </sbb-table-wrapper>
`;

const controlsHint = html`<sbb-notification
  type="info"
  readonly
  animation="none"
  icon-name="hand-fingers-snap-small"
>
  Use the Storybook controls to see the different sizes and negative mode.
</sbb-notification>`;

export const Overview: StoryObj = {
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  render: ({ size, negative, iconPlacement }: Args) => html`
    ${html`
      ${tableHeader(
        negative,
        html`<tr>
            <td>Default</td>
            <td><sbb-link href="#" ?negative=${negative}>Label</sbb-link></td>
            <td>
              <sbb-block-link
                href="#"
                size=${size}
                ?negative=${negative}
                icon-placement=${iconPlacement}
                icon-name="arrow-right-small"
              >
                Label
              </sbb-block-link>
            </td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td><sbb-link href="#" ?negative=${negative} disabled>Label</sbb-link></td>
            <td>
              <sbb-block-link
                href="#"
                size=${size}
                ?negative=${negative}
                icon-placement=${iconPlacement}
                icon-name="arrow-right-small"
                disabled
              >
                Label
              </sbb-block-link>
            </td>
          </tr>`,
      )}
    `}
    <p class="sbb-text-s">
      <sbb-link href="#">Inline links</sbb-link> adapt to the text size and color of the context.
    </p>
    ${controlsHint}
  `,
};

export const ButtonLink: StoryObj = {
  render: ({ size, negative, iconPlacement }: Args) =>
    html`<sbb-notification
      type="info"
      readonly
      animation="none"
    >
      The button variant can be used in contexts where the link is used as a button.
    </sbb-notification>
        ${tableHeader(
          negative,
          html`<tr>
              <td>Default</td>
              <td>
                <sbb-link-button ?negative=${negative}>Label</sbb-link-button>
              </td>
              <td>
                <sbb-block-link-button
                  size=${size}
                  ?negative=${negative}
                  icon-placement=${iconPlacement}
                  icon-name="arrow-right-small"
                >
                  Label
                </sbb-block-link-button>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <sbb-link-button ?negative=${negative} disabled>Label</sbb-link-button>
              </td>
              <td>
                <sbb-block-link-button
                  size=${size}
                  ?negative=${negative}
                  icon-placement=${iconPlacement}
                  icon-name="arrow-right-small"
                  disabled
                >
                  Label
                </sbb-block-link-button>
              </td>
            </tr>`,
        )}
       ${controlsHint}</sbb-notification
    >`,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const StaticLink: StoryObj = {
  render: ({ size, negative, iconPlacement }: Args) =>
    html`<sbb-notification type="info" readonly animation="none">
        The static variant can be used in contexts where interactive element is wrapping the link.
      </sbb-notification>
      ${tableHeader(
        negative,
        html`
          <tr>
            <td>Default</td>
            <td><sbb-link-static ?negative=${negative}>Label</sbb-link-static></td>
            <td>
              <sbb-block-link-static
                size=${size}
                ?negative=${negative}
                icon-placement=${iconPlacement}
              >
                Label
              </sbb-block-link-static>
            </td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td><sbb-link-static ?negative=${negative} disabled>Label</sbb-link-static></td>
            <td>
              <sbb-block-link-static
                size=${size}
                ?negative=${negative}
                icon-placement=${iconPlacement}
                disabled
              >
                Label
              </sbb-block-link-static>
            </td>
          </tr>
        `,
      )}
      ${controlsHint}`,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SlottedIcon: StoryObj = {
  render: ({ size, negative, iconPlacement }: Args) =>
    html`<sbb-block-link
      size=${size}
      ?negative=${negative}
      icon-placement=${iconPlacement}
      href="#"
    >
      <sbb-icon slot="icon" name="unicorn-small"></sbb-icon>
      Link with slotted icon
    </sbb-block-link>`,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, iconPlacement: iconPlacement.options![1] },
};

const meta: Meta = {
  decorators: [
    (story: () => WebComponentsRenderer['storyResult'], context: StoryContext) => html`
      <style>
        .wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--sbb-spacing-fixed-4x);
          ${context.args.negative
          ? 'color: var(--sbb-color-4-negative);'
          : 'color: var(--sbb-color-4);'};

           sbb-notification {
             max-width: 800px;
           }

          table {
            width: fit-content;
          }
        }
      </style>
      <div class="wrapper">${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Link',
};

export default meta;
