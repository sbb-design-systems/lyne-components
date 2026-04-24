import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import { SbbStickyBarElement } from '../container.ts';
import { sampleImages } from '../core/images.private.ts';

import '../action-group.ts';
import '../button.ts';
import '../card.ts';
import '../image.ts';
import '../link.ts';
import '../title.ts';

import readme from './readme.md?raw';

const containerContent = (title: string, isDark: boolean, last = false): TemplateResult => html`
  <sbb-title level="4" ?negative=${isDark}>${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    ${isDark
      ? html`
          In <code>"midnight"</code> and <code>"charcoal"</code> variants the slotted text has
          <code>"white"</code> color; however, you have to manually set the
          <code>"negative"</code> property on sbb-components when needed.
        `
      : html`
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        `}
  </p>
  <sbb-secondary-button style=${last ? 'margin-block-end: 3rem;' : nothing}>
    See more
  </sbb-secondary-button>
`;

const card = (title: string): TemplateResult => html`
  <sbb-card class="sbb-card-spacing-s">
    <sbb-title level="5">${title}</sbb-title>
    <p class="sbb-text-s" style="margin: 0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
    <sbb-secondary-button style="margin-block-start: var(--sbb-spacing-responsive-xs)">
      See more
    </sbb-secondary-button>
  </sbb-card>
`;

const color: InputType = {
  control: {
    type: 'select',
  },
  options: ['white', 'transparent', 'milk', 'midnight', 'charcoal'],
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const backgroundExpanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const imageSrc: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  color,
  expanded,
  'background-expanded': backgroundExpanded,
  'image-src': imageSrc,
};

const defaultArgs: Args = {
  color: color.options![0],
  expanded: false,
  'background-expanded': false,
  'image-src': undefined,
};

function isDark(colorArg: string): boolean {
  return colorArg === 'midnight' || colorArg === 'charcoal';
}

const DefaultTemplate = (args: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)}>
    ${containerContent('Example title', isDark(args.color))}
    ${containerContent('Another one', isDark(args.color))}
    ${containerContent('And another one', isDark(args.color), true)}
  </sbb-container>
`;

const BackgroundImageTemplate = ({ 'image-src': imageSrc, ...args }: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)}>
    <sbb-title level="2" style="margin: 0; color: var(--sbb-color-charcoal)"
      >Container with background image</sbb-title
    >
    <style>
      .content {
        display: flex;
        margin-block-start: var(--sbb-spacing-responsive-m);
        gap: var(--sbb-spacing-fixed-6x);
        justify-content: center;
        flex-direction: column;

        /* Starting from breakpoint large. Please use design token. */
        @media screen and (width >= 1024px) {
          flex-direction: row;
        }
      }
    </style>
    <div class="content">${card('Example title')} ${card('Another one')}</div>
    <sbb-image
      slot="image"
      image-src=${imageSrc}
      alt="Train"
      style="--sbb-image-object-position: bottom;"
    ></sbb-image>
  </sbb-container>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Transparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1] },
};

export const Milk: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2] },
};

export const Midnight: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![3] },
};

export const Charcoal: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![4] },
};

export const BackgroundImage: StoryObj = {
  render: BackgroundImageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'image-src': sampleImages[9],
  },
};

export const Expanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const MilkBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2], 'background-expanded': true },
};

export const MidnightBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![3], 'background-expanded': true },
};

export const CharcoalBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![4], 'background-expanded': true },
};

// Sticky Bar

const containerColor: InputType = {
  name: 'color',
  control: {
    type: 'select',
  },
  table: {
    category: 'Container',
  },
  options: ['transparent', 'white', 'milk', 'midnight', 'charcoal'],
};

const containerExpanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Container',
  },
};

const containerBackgroundExpanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Container',
  },
};

const stickyBarColor: InputType = {
  control: {
    type: 'select',
  },
  table: {
    category: 'Sticky Bar',
  },
  options: ['unset', 'white', 'milk', 'midnight', 'charcoal'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const stickyBarArgTypes: ArgTypes = {
  color: stickyBarColor,
  containerColor,
  containerExpanded,
  containerBackgroundExpanded,
  size,
};

const stickyBarArgs: Args = {
  color: stickyBarColor.options![0],
  containerColor: containerColor.options![0],
  containerExpanded: false,
  containerBackgroundExpanded: false,
  size: size.options![1],
};

const actionGroup = (): TemplateResult => html`
  <sbb-action-group
    class="sbb-action-group-vertical-full-width sbb-action-group-horizontal-from-large"
    button-size="l"
    style="width:100%;"
  >
    <sbb-block-link
      align-self="start"
      icon-name="chevron-small-left-small"
      href="https://www.sbb.ch/en/"
    >
      Link
    </sbb-block-link>
    <sbb-secondary-button>Cancel</sbb-secondary-button>
    <sbb-button>Confirm</sbb-button>
  </sbb-action-group>
`;

const containerContentSticky = (title: string, isDark: boolean): TemplateResult => html`
  <sbb-title level="4" ?negative=${isDark}>${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <sbb-secondary-button style="margin-block-end: 0.75rem;">See more</sbb-secondary-button>
`;

const Template = (): TemplateResult =>
  html` <sbb-sticky-bar>
    <sbb-secondary-button>Example</sbb-secondary-button>
  </sbb-sticky-bar>`;

const StickyTemplate = ({
  color,
  size,
  containerExpanded,
  containerColor,
  containerBackgroundExpanded,
}: Args): TemplateResult => html`
  <sbb-container
    color=${containerColor}
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
  >
    ${containerContentSticky('Example title', isDark(containerColor))}
    ${containerContentSticky('Another one', isDark(containerColor))}
    ${containerContentSticky('And another one', isDark(containerColor))}
    ${containerContentSticky('And a last one', isDark(containerColor))}
    <sbb-sticky-bar color=${color !== 'unset' ? color : nothing} size=${size}>
      ${actionGroup()}
    </sbb-sticky-bar>
  </sbb-container>
`;

const ShortTemplate = ({
  color,
  size,
  containerExpanded,
  containerColor,
  containerBackgroundExpanded,
}: Args): TemplateResult => html`
  <sbb-container
    color=${containerColor}
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
  >
    ${containerContentSticky('Example title', isDark(containerColor))}
    <sbb-sticky-bar color=${color !== 'unset' ? color : nothing} size=${size}>
      ${actionGroup()}
    </sbb-sticky-bar>
  </sbb-container>
`;

const WithContentAfterTemplate = ({
  color,
  size,
  containerExpanded,
  containerColor,
  containerBackgroundExpanded,
}: Args): TemplateResult => html`
  <sbb-container
    color=${containerColor}
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
  >
    ${containerContentSticky('Example title', isDark(containerColor))}
    ${containerContentSticky('Another one', isDark(containerColor))}
    ${containerContentSticky('And another one', isDark(containerColor))}
    ${containerContentSticky('And a last one', isDark(containerColor))}

    <sbb-sticky-bar
      color=${color !== 'unset' ? color : nothing}
      size=${size}
      style="--sbb-sticky-bar-bottom-overlapping-height: var(--sbb-spacing-responsive-l);"
    >
      ${actionGroup()}
    </sbb-sticky-bar>
  </sbb-container>
  <sbb-container
    color=${containerColor}
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
    aria-hidden="true"
  >
    <div style="height: var(--sbb-spacing-responsive-l);"></div>
  </sbb-container>
  <sbb-container
    color="white"
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
  >
    <div style="padding-block: 4rem;">
      ${containerContentSticky('Content after first container', isDark(containerColor))}
      ${containerContentSticky('Another one', isDark(containerColor))}
    </div>
  </sbb-container>
`;

export const StickyBarStandalone: StoryObj = {
  render: Template,
};

export const StickyBar: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: stickyBarArgs,
};

export const StickyBarSizeS: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, size: size.options![0] },
};

export const StickyBarWhite: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, color: color.options![1] },
};

export const StickyBarWhiteStickyBarWithMilkContainer: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![2], color: color.options![1] },
};

export const StickyBarWhiteWithContainerExpanded: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, color: color.options![1], containerExpanded: true },
};

export const StickyBarMilk: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![2] },
};

export const StickyBarMilkWithWhiteContainer: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![1], color: color.options![2] },
};

export const StickyBarMilkWithContainerBackgroundExpanded: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![2], containerBackgroundExpanded: true },
};

export const StickyBarMidnight: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![3] },
};

export const StickyBarMidnightWithContainerBackgroundExpanded: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![3], containerBackgroundExpanded: true },
};

export const StickyBarCharcoal: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![4] },
};

export const StickyBarCharcoalWithContainerBackgroundExpanded: StoryObj = {
  render: StickyTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: color.options![4], containerBackgroundExpanded: true },
};

export const StickyBarShortContent: StoryObj = {
  render: ShortTemplate,
  argTypes: stickyBarArgTypes,
  args: stickyBarArgs,
};

export const StickyBarShortContentMilk: StoryObj = {
  render: ShortTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: containerColor.options![2] },
};

export const StickyBarWithContentAfter: StoryObj = {
  render: WithContentAfterTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: 'milk', color: 'white' },
};

export const StickyBarControlStickyState: StoryObj = {
  render: WithContentAfterTemplate,
  argTypes: stickyBarArgTypes,
  args: { ...stickyBarArgs, containerColor: 'milk', color: 'white' },
  decorators: [
    (story) =>
      html`<div
          style="
            position: fixed;
            inset-block-start: 0;
            background-color: var(--sbb-background-color-1);
            padding: var(--sbb-spacing-responsive-xs);
            z-index: 1;
            border-block-end: var(--sbb-border-width-1x) solid var(--sbb-border-color-4);
            border-inline-end: var(--sbb-border-width-1x) solid var(--sbb-border-color-4);
          "
        >
          Control whether the sticky bar has \`position: sticky\`.
          <sbb-secondary-button
            size="s"
            @click=${(e: PointerEvent) => {
              console.log(e);
              (e.target as HTMLElement)?.parentElement?.parentElement
                ?.querySelector('sbb-sticky-bar')
                ?.stick();
            }}
          >
            Stick
          </sbb-secondary-button>
          <sbb-secondary-button
            size="s"
            @click=${(e: PointerEvent) => {
              (e.target as HTMLElement)?.parentElement?.parentElement
                ?.querySelector('sbb-sticky-bar')
                ?.unstick();
            }}
          >
            Unstick
          </sbb-secondary-button>
        </div>
        ${story()}`,
  ],
};

const meta: Meta = {
  parameters: {
    actions: {
      handles: [
        SbbStickyBarElement.events.beforestick,
        SbbStickyBarElement.events.stick,
        SbbStickyBarElement.events.beforeunstick,
        SbbStickyBarElement.events.unstick,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  decorators: [withActions],
  title: 'elements/Container',
};

export default meta;
