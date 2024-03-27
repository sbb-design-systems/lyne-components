import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import './radio-button';

const longLabel: string =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

const value: InputType = {
  control: {
    type: 'text',
  },
};

const checked: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const bold: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  value,
  checked,
  disabled,
  size,
  'aria-label': ariaLabel,
  bold,
};

const defaultArgs: Args = {
  value: 'First value',
  checked: false,
  disabled: false,
  size: size.options[0],
  'aria-label': undefined,
  bold: false,
};

const DefaultTemplate = ({ bold, ...args }: Args): TemplateResult =>
  html`<sbb-radio-button ${sbbSpread(args)}>
    ${bold ? html`<span class="sbb-text--bold">Value</span>` : 'Value'}
  </sbb-radio-button>`;

const MultilineLabelTemplate = ({ bold, ...args }: Args): TemplateResult => html`
  <sbb-radio-button ${sbbSpread(args)}>
    ${bold ? html`<span class="sbb-text--bold">${longLabel}</span>` : longLabel}
  </sbb-radio-button>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const Checked: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
};

export const Disabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const CheckedDisabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true, disabled: true },
};

export const MultilineLabel: StoryObj = {
  render: MultilineLabelTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
};

export const DefaultBold: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, bold: true },
};

export const CheckedBold: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true, bold: true },
};

const meta: Meta = {
  decorators: [(story) => html` <div style="padding: 2rem; max-width: 1050px;">${story()}</div> `],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-radio-button/sbb-radio-button',
};

export default meta;
