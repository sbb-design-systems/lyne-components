import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import type { SbbJourneyHeaderElement } from './journey-header.component.ts';
import readme from './readme.md?raw';

import '../journey-header.ts';

const origin: InputType = {
  control: {
    type: 'text',
  },
};

const destination: InputType = {
  control: {
    type: 'text',
  },
};

const roundTrip: InputType = {
  control: {
    type: 'boolean',
  },
};

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', '3', '4', '5', '6'] satisfies SbbJourneyHeaderElement['level'][],
};

const visualLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', '3', '4', '5', '6'] satisfies SbbJourneyHeaderElement['visualLevel'][],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  origin,
  destination,
  'round-trip': roundTrip,
  level,
  'visual-level': visualLevel,
  negative,
};

const defaultArgs: Args = {
  origin: 'La Chaux de Fonds',
  destination: 'Loèche-les-Bains',
  'round-trip': false,
  level: level.options![2],
  'visual-level': visualLevel.options![4],
  negative: false,
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-journey-header ${sbbSpread(args)}></sbb-journey-header>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const VisualLevel4: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'visual-level': visualLevel.options![3] },
};

export const VisualLevel6: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'visual-level': visualLevel.options![5] },
};

export const RoundTrip: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'round-trip': true },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const ShortText: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    origin: 'Bern',
    destination: 'Thun',
    'round-trip': true,
  },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Journey Header',
};

export default meta;
