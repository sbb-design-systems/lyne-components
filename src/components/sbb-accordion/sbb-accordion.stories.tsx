/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import { InputType } from '@storybook/types';

const multi: InputType = {
  control: {
    type: 'boolean',
  },
};

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
  table: {
    category: 'Panel',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const headerText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const contentText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Content',
  },
};

const defaultArgTypes: ArgTypes = {
  multi,
  level,
  color,
  expanded,
  headerText,
  iconName,
  contentText,
};

const defaultArgs: Args = {
  multi: false,
  level: level.options[2],
  color: 'white',
  expanded: false,
  headerText: 'This is a header',
  iconName: undefined,
  contentText: 'This is a content: "Lorem ipsum dolor sit amet".',
};

const Template = ({ color, expanded, headerText, iconName, contentText, ...args }): JSX.Element => (
  <sbb-accordion {...args}>
    <sbb-expansion-panel color={color} expanded={expanded}>
      <sbb-expansion-panel-header icon-name={iconName}>{headerText} 1</sbb-expansion-panel-header>
      <sbb-expansion-panel-content>{contentText} 1</sbb-expansion-panel-content>
    </sbb-expansion-panel>
    <sbb-expansion-panel color={color} expanded={expanded}>
      <sbb-expansion-panel-header icon-name={iconName}>{headerText} 2</sbb-expansion-panel-header>
      <sbb-expansion-panel-content>{contentText} 2</sbb-expansion-panel-content>
    </sbb-expansion-panel>
    <sbb-expansion-panel color={color} expanded={expanded}>
      <sbb-expansion-panel-header icon-name={iconName}>{headerText} 3</sbb-expansion-panel-header>
      <sbb-expansion-panel-content>{contentText} 3</sbb-expansion-panel-content>
    </sbb-expansion-panel>
  </sbb-accordion>
);
export const Story1: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
      handles: [],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion',
};

export default meta;
