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
  ...attributeUsageArgTypes,
  'open-delay': openDelay,
  'close-delay': closeDelay,
};

const attributeUsageArgs: Args = {
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

const trigger = (alignment = 'below-start'): TemplateResult => html`
  <sbb-button
    id="tooltip-trigger"
    style=${styleMap({
      position: 'absolute',
      ...alignmentStyles[alignment],
    })}
    >Button</sbb-button
  >
`;

const Template =
  (alignment?: string) =>
  (args: Args): TemplateResult => html`
    ${trigger(alignment)}
    <sbb-tooltip trigger="tooltip-trigger" ${sbbSpread(args)}> I'm a tooltip!!! </sbb-tooltip>
  `;

const LongContentTemplate = (args: Args): TemplateResult => html`
  ${trigger()}
  <sbb-tooltip trigger="tooltip-trigger" ${sbbSpread(args)}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in
    tincidunt quis, mattis eu quam.
  </sbb-tooltip>
`;

const AttributeTemplate = (_args: Args): TemplateResult => html`
  <sbb-button
    style=${styleMap({
      position: 'absolute',
      ...alignmentStyles['below-start'],
    })}
    sbb-tooltip="I'm a tooltip from the [sbb-tooltip] attribute"
    >Button</sbb-button
  >
`;

export const Default: StoryObj = {
  render: Template(),
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

export const BelowCentred: StoryObj = {
  render: Template('below-centred'),
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const BelowEnd: StoryObj = {
  render: Template('below-end'),
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const AboveStart: StoryObj = {
  render: Template('above-start'),
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const AboveCentred: StoryObj = {
  render: Template('above-centred'),
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const AboveEnd: StoryObj = {
  render: Template('above-end'),
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
