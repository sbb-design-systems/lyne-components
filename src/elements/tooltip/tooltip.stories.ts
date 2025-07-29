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
import '../button/mini-button.js';

const alignment: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'below-centred',
    'below-start',
    'below-end',
    'above-centred',
    'above-start',
    'above-end',
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
  alignment,
  disabled,
};

const defaultArgTypes: ArgTypes = {
  ...attributeUsageArgTypes,
  'open-delay': openDelay,
  'close-delay': closeDelay,
};

const attributeUsageArgs: Args = {
  alignment: alignment.options![0],
  disabled: false,
};

const defaultArgs: Args = {
  ...attributeUsageArgs,
  'open-delay': undefined,
  'close-delay': undefined,
};

const alignmentStyles: { [x: string]: any } = {
  'below-centred': { 'inset-inline-start': 'calc(50% - 44px)' },
  'below-start': { 'inset-inline-start': '2rem' },
  'below-end': { 'inset-inline-end': '2rem' },
  'above-centred': { 'inset-inline-start': 'calc(50% - 44px)', 'inset-block-end': '2rem' },
  'above-start': { 'inset-block-end': '2rem' },
  'above-end': { 'inset-inline-end': '2rem', 'inset-block-end': '2rem' },
};

const trigger = (alignment: string, disabled?: boolean): TemplateResult => html`
  <sbb-mini-button
    id="tooltip-trigger"
    icon-name="circle-information-small"
    ?disabled=${disabled}
    style=${styleMap({
      position: 'absolute',
      ...alignmentStyles[alignment],
    })}
  ></sbb-mini-button>
`;

const Template = ({ alignment, ...args }: Args): TemplateResult => html`
  ${trigger(alignment, args.disabled)}
  <sbb-tooltip trigger="tooltip-trigger" ${sbbSpread(args)}> I'm a tooltip!!! </sbb-tooltip>
`;

const LongContentTemplate = ({ alignment, ...args }: Args): TemplateResult => html`
  ${trigger(alignment, args.disabled)}
  <sbb-tooltip trigger="tooltip-trigger" ${sbbSpread(args)}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in
    tincidunt quis, mattis eu quam.
  </sbb-tooltip>
`;

const AttributeTemplate = ({ alignment, ...args }: Args): TemplateResult => html`
  <sbb-mini-button
    icon-name="circle-information-small"
    ?disabled=${args.disabled}
    style=${styleMap({
      position: 'absolute',
      ...alignmentStyles[alignment],
    })}
    sbb-tooltip="I'm a tooltip from the [sbb-tooltip] attribute"
  ></sbb-mini-button>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below-start' },
};

export const AttributeUsage: StoryObj = {
  render: AttributeTemplate,
  argTypes: attributeUsageArgTypes,
  args: { ...attributeUsageArgs, alignment: 'below-start' },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below-start' },
};

export const BelowCentred: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below-centred' },
};

export const BelowEnd: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below-end' },
};

export const AboveStart: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'above-start' },
};

export const AboveCentred: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'above-centred' },
};

export const AboveEnd: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'above-end' },
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
