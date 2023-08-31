/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, Decorator } from '@storybook/html';

const Template = (): JSX.Element => (
  <sbb-form-field label="Label" floating-label>
    <sbb-icon slot="prefix" name="pie-small" />
    <input type="text" value="Input value" />
    <sbb-form-field-clear />
  </sbb-form-field>
);

const TemplateSelect = (): JSX.Element => (
  <sbb-form-field label="Label" floating-label>
    <select>
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </select>
    <sbb-form-field-clear />
  </sbb-form-field>
);

export const Story1: StoryObj = {
  render: Template,
  args: {
    'some-prop': 'opt1',
  },
};

export const Story2: StoryObj = {
  render: TemplateSelect,
  args: {
    'some-prop': 'opt1',
  },
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
  title: 'components/sbb-form-field-clear',
};

export default meta;
