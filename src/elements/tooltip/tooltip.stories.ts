import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import type { Decorator } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import { SbbTooltipElement } from './tooltip.component.js';
import '../button/button.js';

const position: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'block-end',
    'block-start',
    'inline-start',
    'inline-end',
    'bottom',
    'top',
    'left',
    'right',
  ],
};

const openDelay: InputType = {
  control: {
    type: 'number',
  },
};

const closeDelay: InputType = {
  control: {
    type: 'number',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const attributeUsageArgTypes: ArgTypes = {
  disabled,
};

const defaultArgTypes: ArgTypes = {
  position,
  'open-delay': openDelay,
  'close-delay': closeDelay,
  ...attributeUsageArgTypes,
};

const attributeUsageArgs: Args = {
  disabled: false,
};

const defaultArgs: Args = {
  position: position.options![0],
  'open-delay': undefined,
  'close-delay': undefined,
  ...attributeUsageArgs,
};

const trigger = (): TemplateResult => html`
  <sbb-button id="tooltip-trigger" style="margin-block-start: 10rem; margin-inline-start: 10rem;"
    >Button</sbb-button
  >
`;

const Template = ({ position, ...args }: Args): TemplateResult => html`
  ${trigger()}
  <sbb-tooltip
    trigger="tooltip-trigger"
    style=${styleMap({ '--sbb-overlay-controller-position-area': `${position}` })}
    ${sbbSpread(args)}
  >
    I'm a tooltip!!!!!!
  </sbb-tooltip>
`;

const LongContentTemplate = ({ position, ...args }: Args): TemplateResult => html`
  ${trigger()}
  <sbb-tooltip
    trigger="tooltip-trigger"
    style=${styleMap({ '--sbb-overlay-controller-position-area': `${position}` })}
    ${sbbSpread(args)}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in
    tincidunt quis, mattis eu quam.
  </sbb-tooltip>
`;

const AttributeTemplate = (): TemplateResult => html`
  <sbb-button sbb-tooltip="I'm a tooltip from the [sbb-tooltip] attribute">Button</sbb-button>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const AttributeUsage: StoryObj = {
  render: AttributeTemplate,
  argTypes: attributeUsageArgTypes,
  args: { ...attributeUsageArgs },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Below: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, position: 'block-end' },
};

export const Above: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, position: 'block-start' },
};

export const OnTheLeft: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, position: 'inline-start' },
};

export const OnTheRight: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, position: 'inline-end' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbTooltipElement.events.beforeopen,
        SbbTooltipElement.events.open,
        SbbTooltipElement.events.beforeclose,
        SbbTooltipElement.events.close,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-tooltip',
};

export default meta;
