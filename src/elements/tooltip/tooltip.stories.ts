import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import '../button/mini-button.js';
import './tooltip.component.js';

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

const defaultArgTypes: ArgTypes = {
  alignment: alignment,
  'open-delay': openDelay,
  'close-delay': closeDelay,
};

const defaultArgs: Args = {
  alignment: alignment.options![0],
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

const Template = ({ alignment, ..._args }: Args): TemplateResult => html`
  <sbb-mini-button
    icon-name="circle-information-small"
    sbb-tooltip="I'm a tooltip!!!"
    style=${styleMap({
      position: 'absolute',
      ...alignmentStyles[alignment],
    })}
  ></sbb-mini-button>
`;

const LongContentTemplate = ({ alignment, ...args }: Args): TemplateResult => html`
  <sbb-mini-button
    id="tooltip-trigger"
    icon-name="circle-information-small"
    style=${styleMap({
      position: 'absolute',
      ...alignmentStyles[alignment],
    })}
  ></sbb-mini-button>
  <sbb-tooltip trigger="tooltip-trigger" ${sbbSpread(args)}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in
    tincidunt quis, mattis eu quam.
  </sbb-tooltip>
`;

export const BelowStart: StoryObj = {
  render: Template,
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

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below-start' },
};

const meta: Meta = {
  parameters: {
    actions: {
      handles: [],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-tooltip',
};

export default meta;
