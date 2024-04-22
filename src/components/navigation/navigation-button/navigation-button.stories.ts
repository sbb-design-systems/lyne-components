import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import { styleMap, type StyleInfo } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './navigation-button.js';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  type,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  size: size.options[0],
  type: type.options[0],
  name: 'detail',
  value: 'Value',
  form: 'form-name',
  'aria-label': undefined,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-navigation-button ${sbbSpread(args)}>Label</sbb-navigation-button>
`;

const style: Readonly<StyleInfo> = {
  'background-color': 'var(--sbb-color-midnight)',
  width: 'max-content',
  padding: '1rem 2rem',
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[2] },
};

const meta: Meta = {
  decorators: [(story) => html`<div style=${styleMap(style)}>${story()}</div>`],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
      source: { format: 'html' },
    },
  },
  title: 'components/sbb-navigation/sbb-navigation-button',
};

export default meta;
