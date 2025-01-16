import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import readme from './readme.md?raw';
import { SbbStickyBarElement } from './sticky-bar.js';

import '../../action-group.js';
import '../../button/button.js';
import '../../button/secondary-button.js';
import '../../link.js';
import '../../title.js';
import '../container.js';

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

const color: InputType = {
  control: {
    type: 'select',
  },
  table: {
    category: 'Sticky Bar',
  },
  options: ['unset', 'white', 'milk', 'midnight', 'charcoal'],
};

const defaultArgTypes: ArgTypes = {
  color,
  containerColor,
  containerExpanded,
  containerBackgroundExpanded,
};

const defaultArgs: Args = {
  color: color.options![0],
  containerColor: containerColor.options![0],
  containerExpanded: false,
  containerBackgroundExpanded: false,
};

const actionGroup = (): TemplateResult => html`
  <sbb-action-group
    align-group="stretch"
    orientation="vertical"
    horizontal-from="medium"
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

function isDark(colorArg: string): boolean {
  return colorArg === 'midnight' || colorArg === 'charcoal';
}

const containerContent = (title: string, isDark: boolean): TemplateResult => html`
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

const DefaultTemplate = ({
  color,
  containerExpanded,
  containerColor,
  containerBackgroundExpanded,
}: Args): TemplateResult => html`
  <sbb-container
    color=${containerColor}
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
  >
    ${containerContent('Example title', isDark(containerColor))}
    ${containerContent('Another one', isDark(containerColor))}
    ${containerContent('And another one', isDark(containerColor))}
    ${containerContent('And a last one', isDark(containerColor))}
    <sbb-sticky-bar color=${color !== 'unset' ? color : nothing}> ${actionGroup()} </sbb-sticky-bar>
  </sbb-container>
`;

const ShortTemplate = ({
  color,
  containerExpanded,
  containerColor,
  containerBackgroundExpanded,
}: Args): TemplateResult => html`
  <sbb-container
    color=${containerColor}
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
  >
    ${containerContent('Example title', isDark(containerColor))}
    <sbb-sticky-bar color=${color !== 'unset' ? color : nothing}> ${actionGroup()} </sbb-sticky-bar>
  </sbb-container>
`;

const WithContentAfterTemplate = ({
  color,
  containerExpanded,
  containerColor,
  containerBackgroundExpanded,
}: Args): TemplateResult => html`
  <sbb-container
    color=${containerColor}
    ?expanded=${containerExpanded}
    ?background-expanded=${containerBackgroundExpanded}
  >
    ${containerContent('Example title', isDark(containerColor))}
    ${containerContent('Another one', isDark(containerColor))}
    ${containerContent('And another one', isDark(containerColor))}
    ${containerContent('And a last one', isDark(containerColor))}

    <sbb-sticky-bar
      color=${color !== 'unset' ? color : nothing}
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
      ${containerContent('Content after first container', isDark(containerColor))}
      ${containerContent('Another one', isDark(containerColor))}
    </div>
  </sbb-container>
`;

export const Standalone: StoryObj = {
  render: Template,
};

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const White: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1] },
};

export const WhiteStickyBarWithMilkContainer: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![2], color: color.options![1] },
};

export const WhiteWithContainerExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1], containerExpanded: true },
};

export const Milk: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![2] },
};

export const MilkStickyBarWithWhiteContainer: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![1], color: color.options![2] },
};

export const MilkWithContainerBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![2], containerBackgroundExpanded: true },
};

export const Midnight: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![3] },
};

export const MidnightWithContainerBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![3], containerBackgroundExpanded: true },
};

export const Charcoal: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![4] },
};

export const CharcoalWithContainerBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options![4], containerBackgroundExpanded: true },
};

export const ShortContent: StoryObj = {
  render: ShortTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const ShortContentMilk: StoryObj = {
  render: ShortTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: containerColor.options![2] },
};

export const WithContentAfter: StoryObj = {
  render: WithContentAfterTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: 'milk', color: 'white' },
};

export const ControlStickyState: StoryObj = {
  render: WithContentAfterTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: 'milk', color: 'white' },
  decorators: [
    (story) =>
      html`<div
          style=${styleMap({
            position: 'fixed',
            'inset-block-start': 0,
            'background-color': 'var(--sbb-color-white)',
            padding: 'var(--sbb-spacing-responsive-xs)',
            'z-index': 1,
            'border-block-end': 'var(--sbb-border-width-1x) solid var(--sbb-color-black)',
            'border-inline-end': 'var(--sbb-border-width-1x) solid var(--sbb-color-black)',
          })}
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
        SbbStickyBarElement.events.willStick,
        SbbStickyBarElement.events.didStick,
        SbbStickyBarElement.events.willUnstick,
        SbbStickyBarElement.events.didUnstick,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  decorators: [withActions],
  title: 'elements/sbb-container/sbb-sticky-bar',
};

export default meta;
