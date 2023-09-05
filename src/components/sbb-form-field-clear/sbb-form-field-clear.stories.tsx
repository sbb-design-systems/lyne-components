/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, Decorator, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const disabledArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonlyArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const basicArgTypes: ArgTypes = {
  disabled: disabledArg,
  readonly: readonlyArg,
};

const basicArgs: Args = {
  disabled: false,
  readonly: false,
};

const DefautlTemplate = ({ ...args }): JSX.Element => (
  <sbb-form-field label="Label">
    <sbb-icon slot="prefix" name="pie-small" />
    <input type="text" placeholder="Input placeholder" value="Input value" {...args} />
    <sbb-form-field-clear />
  </sbb-form-field>
);

export const Default: StoryObj = {
  render: DefautlTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Disabled: StoryObj = {
  render: DefautlTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const Readonly: StoryObj = {
  render: DefautlTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-form-field/sbb-form-field-clear',
};

export default meta;
