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

import type { SbbButtonElement } from './button/button.component.ts';
import type { SbbMiniButtonGroupElement } from './mini-button-group/mini-button-group.component.ts';
import readme from './readme.md?raw';

import '../button.ts';
import '../divider.ts';
import '../form-field.ts';
import '../notification.ts';
import '../table.ts';
import '../title.ts';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l', null] satisfies (SbbButtonElement['size'] | null)[],
};

const defaultArgTypes: ArgTypes = {
  size,
  negative,
};

const defaultArgs: Args = {
  size: size.options![1],
  negative: false,
};

const tableHeader = (negative: boolean, content: TemplateResult): TemplateResult => html`
  <sbb-table-wrapper>
    <table class="sbb-table sbb-table--unstriped ${negative ? `sbb-table--negative` : ``}">
      <thead>
        <tr>
          <th>State</th>
          <th>Primary</th>
          <th>Secondary</th>
          <th>Accent</th>
          <th>Transparent</th>
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
  render: ({ size, negative }: Args) => html`
      ${tableHeader(
        negative,
        html`<tr>
            <td>Default</td>
            <td><sbb-button size=${size} ?negative=${negative}>Label</sbb-button></td>
            <td>
              <sbb-secondary-button size=${size} ?negative=${negative}>Label</sbb-secondary-button>
            </td>
            <td><sbb-accent-button size=${size} ?negative=${negative}>Label</sbb-accent-button></td>
            <td>
              <sbb-transparent-button size=${size} ?negative=${negative}>
                Label
              </sbb-transparent-button>
            </td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td><sbb-button size=${size} ?negative=${negative} disabled>Label</sbb-button></td>
            <td>
              <sbb-secondary-button size=${size} ?negative=${negative} disabled>
                Label
              </sbb-secondary-button>
            </td>
            <td>
              <sbb-accent-button size=${size} ?negative=${negative} disabled>
                Label
              </sbb-accent-button>
            </td>
            <td>
              <sbb-transparent-button size=${size} ?negative=${negative} disabled>
                Label
              </sbb-transparent-button>
            </td>
          </tr>
          <tr>
            <td>Disabled interactive</td>
            <td>
              <sbb-button size=${size} ?negative=${negative} disabled-interactive>Label</sbb-button>
            </td>
            <td>
              <sbb-secondary-button size=${size} ?negative=${negative} disabled-interactive>
                Label
              </sbb-secondary-button>
            </td>
            <td>
              <sbb-accent-button size=${size} ?negative=${negative} disabled-interactive>
                Label
              </sbb-accent-button>
            </td>
            <td>
              <sbb-transparent-button size=${size} ?negative=${negative} disabled-interactive>
                Label
              </sbb-transparent-button>
            </td>
          </tr>
          <tr>
            <td>Loading</td>
            <td><sbb-button size=${size} ?negative=${negative} loading>Label</sbb-button></td>
            <td>
              <sbb-secondary-button size=${size} ?negative=${negative} loading>
                Label
              </sbb-secondary-button>
            </td>
            <td>
              <sbb-accent-button size=${size} ?negative=${negative} loading>
                Label
              </sbb-accent-button>
            </td>
            <td>
              <sbb-transparent-button size=${size} ?negative=${negative} loading>
                Label
              </sbb-transparent-button>
            </td>
          </tr>`,
      )}

    <div>
      <sbb-title ?negative=${negative} level="6" style="margin-block-start:0">Icon Variants</sbb-title>
      <sbb-table-wrapper>
      <table class="sbb-table sbb-table--unstriped ${negative ? `sbb-table--negative` : ``}">
        <thead>
        <tr>
          <th>Without Icon</th>
          <th>With Icon</th>
          <th>Icon Only</th>
          <th>Slotted Icon</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><sbb-button size=${size} ?negative=${negative}>Label</sbb-button></td>
          <td>
            <sbb-button size=${size} ?negative=${negative} icon-name="pie-small">Label</sbb-button>
          </td>
          <td>
            <sbb-button size=${size} ?negative=${negative} icon-name="unicorn-small"></sbb-button>
          </td>
          <td>
            <sbb-button size=${size} ?negative=${negative}>
              <sbb-icon name="train-small" slot="icon"></sbb-icon>
              </sbb-icon>
            </sbb-button>
          </td>
        </tr>
        </tbody>
      </table>
      </sbb-table-wrapper>
    </div>
   ${controlsHint}
  `,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const LinkButton: StoryObj = {
  render: ({ size, negative }: Args) =>
    html`<sbb-notification
      type="info"
      readonly
      animation="none"
    >
      The link variant can be used in contexts where the button is used as a link.
    </sbb-notification>
        ${tableHeader(
          negative,
          html`<tr>
            <td>Default</td>
            <td>
              <sbb-button-link
                href="#"
                size=${size}
                ?negative=${negative}
                icon-name="link-external-small"
              >
                Label
              </sbb-button-link>
            </td>
            <td>
              <sbb-secondary-button-link
                href="#"
                size=${size}
                ?negative=${negative}
                icon-name="link-external-small"
              >
                Label
              </sbb-secondary-button-link>
            </td>
            <td>
              <sbb-accent-button-link
                href="#"
                size=${size}
                ?negative=${negative}
                icon-name="link-external-small"
              >
                Label
              </sbb-accent-button-link>
            </td>
            <td>
              <sbb-transparent-button-link
                href="#"
                size=${size}
                ?negative=${negative}
                icon-name="link-external-small"
              >
                Label
              </sbb-transparent-button-link>
            </td>
          </tr>`,
        )}
      ${controlsHint}</sbb-notification
    >`,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const StaticButton: StoryObj = {
  render: ({ size, negative }: Args) =>
    html`<sbb-notification type="info" readonly animation="none">
        The static variant can be used in contexts where interactive element is wrapping the button.
        E.g. inside a \`sbb-teaser-product\` element.
      </sbb-notification>
      ${tableHeader(
        negative,
        html`
          <tr>
            <td>Default</td>
            <td><sbb-button-static size=${size} ?negative=${negative}>Label</sbb-button-static></td>
            <td>
              <sbb-secondary-button-static size=${size} ?negative=${negative}>
                Label
              </sbb-secondary-button-static>
            </td>
            <td>
              <sbb-accent-button-static size=${size} ?negative=${negative}>
                Label
              </sbb-accent-button-static>
            </td>
            <td>
              <sbb-transparent-button-static size=${size} ?negative=${negative}>
                Label
              </sbb-transparent-button-static>
            </td>
          </tr>
        `,
      )}
      ${controlsHint}`,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

/*
 Mini Button
 */

const miniButtonGroupSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l', 'xl', null] satisfies (SbbMiniButtonGroupElement['size'] | null)[],
};

export const MiniButton: StoryObj = {
  render: ({ negative }: Args): TemplateResult => html`
    <sbb-table-wrapper>
      <table class="sbb-table sbb-table--unstriped ${negative ? `sbb-table--negative` : ``}">
        <thead>
          <tr>
            <th>Variant</th>
            <th>Icon Only</th>
            <th>Icon Only Disabled</th>
            <th>With Label</th>
            <th>With Label Disabled</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sbb-mini-button</td>
            <td>
              <sbb-mini-button
                aria-label="Edit entry"
                icon-name="pen-small"
                ?negative=${negative}
              ></sbb-mini-button>
            </td>
            <td>
              <sbb-mini-button
                aria-label="Edit entry"
                icon-name="pen-small"
                ?negative=${negative}
                disabled
              ></sbb-mini-button>
            </td>
            <td>
              <sbb-mini-button icon-name="pen-small" ?negative=${negative}>Edit</sbb-mini-button>
            </td>
            <td>
              <sbb-mini-button icon-name="pen-small" ?negative=${negative} disabled>
                Edit
              </sbb-mini-button>
            </td>
          </tr>
          <tr>
            <td>sbb-mini-button-link</td>
            <td>
              <sbb-mini-button-link
                accessibility-label="Edit entry"
                icon-name="link-external-small"
                ?negative=${negative}
              ></sbb-mini-button-link>
            </td>
            <td>
              <sbb-mini-button-link
                accessibility-label="Edit entry"
                icon-name="link-external-small"
                ?negative=${negative}
                disabled=""
              ></sbb-mini-button-link>
            </td>
            <td>
              <sbb-mini-button icon-name="link-external-small" ?negative=${negative}>
                Edit
              </sbb-mini-button>
            </td>
            <td>
              <sbb-mini-button icon-name="link-external-small" ?negative=${negative} disabled>
                Edit
              </sbb-mini-button>
            </td>
          </tr>
        </tbody>
      </table>
    </sbb-table-wrapper>
    <div>
      <sbb-title ?negative=${negative} level="6">Mini button in form field</sbb-title>
      <sbb-form-field ?negative=${negative}>
        <label>Label</label>
        <input placeholder="Placeholder" />
        <sbb-mini-button slot="suffix" icon-name="pie-small"></sbb-mini-button>
      </sbb-form-field>
    </div>
  `,
  argTypes: {
    negative,
  },
  args: {
    negative: false,
  },
};

export const MiniButtonGroup: StoryObj = {
  render: ({ size, negative }: Args): TemplateResult =>
    html`<sbb-mini-button-group size=${size} ?negative=${negative}>
      <sbb-mini-button aria-label="previous" icon-name="chevron-small-left-small"></sbb-mini-button>
      <sbb-mini-button aria-label="next" icon-name="chevron-small-right-small"></sbb-mini-button>
      <sbb-divider orientation="vertical"></sbb-divider>
      <sbb-mini-button aria-label="edit" icon-name="pen-small"></sbb-mini-button>
      <sbb-mini-button aria-label="duplicate" icon-name="copy-small"></sbb-mini-button>
      <sbb-mini-button aria-label="delete" icon-name="trash-small"></sbb-mini-button>
      <sbb-divider orientation="vertical"></sbb-divider>
      <sbb-mini-button aria-label="bookmark" icon-name="star-small"></sbb-mini-button>
    </sbb-mini-button-group>`,
  argTypes: {
    size: miniButtonGroupSize,
    negative,
  },
  args: {
    size: null,
    negative: false,
  },
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
          ? '--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark); color: var(--sbb-color-1-negative);'
          : ''};

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
  title: 'elements/Button',
};

export default meta;
