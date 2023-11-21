import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import '../../link';
import '../tooltip';
import './tooltip-trigger';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
  color: context.args.negative
    ? 'var(--sbb-color-white-default)'
    : 'var(--sbb-color-black-default)',
});

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    disable: true,
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  'aria-label': ariaLabel,
  'icon-name': iconName,
  disabled,
  active,
};

const defaultArgs: Args = {
  negative: false,
  'aria-label': 'Click to open the tooltip',
  'icon-name': 'circle-information-small',
  disabled: false,
  active: false,
};

const tooltip = (): TemplateResult => html`
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger">
    <span id="tooltip-content" class="sbb-text-s">
      Simple information tooltip with link.
      <sbb-link
        size="s"
        variant="block"
        icon-name="chevron-small-right-small"
        icon-placement="end"
        sbb-tooltip-close
      >
        Learn More
      </sbb-link>
    </span>
  </sbb-tooltip>
`;

const Template = ({ active, ...args }: Args): TemplateResult => html`
  <span class="sbb-text-s" style="display: flex; align-items: center;">
    <span style="margin-inline-end: var(--sbb-spacing-fixed-1x);"> This is a demo text. </span>
    <sbb-tooltip-trigger
      id="tooltip-trigger"
      ?data-active=${active}
      ${sbbSpread(args)}
    ></sbb-tooltip-trigger>
  </span>
  ${tooltip()}
`;

const TemplateWithCustomContent = (args: Args): TemplateResult => html`
  <div class="sbb-text-xl" style="color: var(--sbb-color-sky-default);">
    <sbb-tooltip-trigger id="tooltip-trigger" ${sbbSpread(args)}>
      This is a long tooltip trigger text which should wrap at a certain viewport. It inherits all
      the font styles from the parent element.
    </sbb-tooltip-trigger>
  </div>
  ${tooltip()}
`;

export const IconSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const IconSizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'circle-information-medium' },
};

export const IconSizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'circle-information-large' },
};

export const CustomContent: StoryObj = {
  render: TemplateWithCustomContent,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const IconSizeSNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const CustomContentNegative: StoryObj = {
  render: TemplateWithCustomContent,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const DisabledNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true, negative: true },
};

export const IconSizeSActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, active: true },
};

export const IconSizeSNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, active: true },
};

const meta: Meta = {
  excludeStories: /.*Active$/,
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tooltip/sbb-tooltip-trigger',
};

export default meta;
