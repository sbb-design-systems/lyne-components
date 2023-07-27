/** @jsx h */
import events from './sbb-expansion-panel-header.events';
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import { InputType } from '@storybook/types';

const headerText: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  headerText,
  'icon-name': iconName,
  expanded,
  disabled,
};

const defaultArgs: Args = {
  headerText: 'Header title',
  'icon-name': undefined,
  expanded: false,
  disabled: false,
};

const Template = ({ headerText, expanded, ...args }): JSX.Element => (
  <sbb-expansion-panel-header aria-expanded={expanded} {...args}>
    {headerText}
  </sbb-expansion-panel-header>
);

const TemplateSlottedIcon = ({ headerText, expanded, ...args }): JSX.Element => (
  <sbb-expansion-panel-header aria-expanded={expanded} {...args}>
    {headerText}
    <sbb-icon slot="icon" name="dog-medium" />
  </sbb-expansion-panel-header>
);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'swisspass-medium' },
};

export const WithSlottedIcon: StoryObj = {
  render: TemplateSlottedIcon,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Expanded: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
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
    actions: {
      handles: [events.toggleExpanded],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion/sbb-expansion-panel-header',
};

export default meta;
