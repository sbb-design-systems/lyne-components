import type { Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import type { Args, ArgTypes, InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';

import '../button.ts';
import '../divider.ts';
import '../form-field.ts';

export const Overview: StoryObj = {
  render: () => html`
    <table class="sbb-table sbb-table--unstriped">
      <thead>
        <tr>
          <th>State</th>
          <th>Primary</th>
          <th>Secondary</th>
          <th>Accent</th>
          <th>Transparent</th>
        </tr>
      </thead>
    </table>
  `,
};

/*

export const commonDecorators = [
  (story: () => WebComponentsRenderer['storyResult'], context: StoryContext) =>
    context.args.negative
      ? html`
          <div style="--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark)">
            ${story()}
          </div>
        `
      : story(),
  withActions as Decorator,
];

*/

export const FormFieldMiniButtonSuffix: StoryObj = {
  render: (): TemplateResult => html`
    <sbb-form-field>
      <label>Demo sbb-mini-button</label>
      <input placeholder="Placeholder" />
      <sbb-mini-button slot="suffix"></sbb-mini-button>
    </sbb-form-field>
  `,
};

// sbb-mini-button-group

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l', 'xl'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  negative,
  disabled,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  size: size.options![1],
  negative: false,
  disabled: false,
  'accessibility-label': '',
};

const Template = ({ disabled, ...args }: Args): TemplateResult =>
  html` <sbb-mini-button-group ${sbbSpread(args)}>
    <sbb-mini-button
      ?disabled=${disabled}
      aria-label="previous"
      icon-name="chevron-small-left-small"
    ></sbb-mini-button>
    <sbb-mini-button
      ?disabled=${disabled}
      aria-label="next"
      icon-name="chevron-small-right-small"
    ></sbb-mini-button>
    <sbb-divider orientation="vertical"></sbb-divider>
    <sbb-mini-button aria-label="edit" icon-name="pen-small"></sbb-mini-button>
    <sbb-mini-button aria-label="duplicate" icon-name="copy-small"></sbb-mini-button>
    <sbb-mini-button aria-label="delete" icon-name="trash-small"></sbb-mini-button>
    <sbb-divider orientation="vertical"></sbb-divider>
    <sbb-mini-button aria-label="bookmark" icon-name="star-small"></sbb-mini-button>
  </sbb-mini-button-group>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Button',
};

export default meta;
