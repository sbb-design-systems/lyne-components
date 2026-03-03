import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import type { StoryContext } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';

import './form-field-remaining-chars.component.ts';
import '../form-field/form-field.component.ts';
import '../error/error.component.ts';

const maxlength: InputType = {
  control: {
    type: 'number',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  maxlength,
  disabled,
  readonly,
  negative,
};

const defaultArgs: Args = {
  maxlength: 200,
  disabled: false,
  readonly: false,
  negative: false,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread({ negative: args.negative })}>
    <label>Description</label>
    <textarea
      placeholder="Enter your description"
      ${sbbSpread({ maxlength: args.maxlength, disabled: args.disabled, readonly: args.readonly })}
    ></textarea>
    <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
  </sbb-form-field>
`;

const InputTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread({ negative: args.negative })}>
    <label>Username</label>
    <input
      placeholder="Enter your username"
      ${sbbSpread({ maxlength: args.maxlength, disabled: args.disabled, readonly: args.readonly })}
    />
    <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
  </sbb-form-field>
`;

const WithErrorTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread({ negative: args.negative })}>
    <label>Description</label>
    <textarea
      placeholder="Enter your description"
      ${sbbSpread({ maxlength: args.maxlength, disabled: args.disabled, readonly: args.readonly })}
    ></textarea>
    <sbb-error>This field has an error</sbb-error>
    <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
  </sbb-form-field>
`;

export const Textarea: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Input: StoryObj = {
  render: InputTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, maxlength: 20 },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const WithError: StoryObj = {
  render: WithErrorTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
  title: 'elements/sbb-form-field/sbb-form-field-remaining-chars',
};

export default meta;
