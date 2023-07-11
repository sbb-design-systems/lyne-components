/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import { InputType } from '@storybook/types';

const numberOfPanels: InputType = {
  control: {
    type: 'number',
  },
};

const multi: InputType = {
  control: {
    type: 'boolean',
  },
};

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6, null],
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

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const disabled: InputType = {
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
  numberOfPanels,
  multi,
  level,
  color,
  expanded,
  borderless,
  disabled,
  headerText,
  iconName,
  contentText,
};

const defaultArgs: Args = {
  numberOfPanels: 3,
  multi: false,
  level: level.options[2],
  color: 'white',
  expanded: false,
  borderless: false,
  disabled: false,
  headerText: 'This is the header',
  iconName: undefined,
  contentText: 'This is the content: "Lorem ipsum dolor sit amet".',
};

const greyDecorator: Decorator = (Story) => (
  <div
    style={{
      background: '#bdbdbd',
      padding: '2rem',
    }}
  >
    <Story />
  </div>
);

const createExpansionPanelTemplate = (
  numberOfPanels,
  color,
  expanded,
  borderless,
  disabled,
  headerText,
  iconName,
  contentText
): JSX.Element[] => {
  return new Array(numberOfPanels).fill(null).map((_, index) => (
    <sbb-expansion-panel
      color={color}
      expanded={expanded}
      borderless={borderless}
      disabled={disabled && index === 0}
    >
      <sbb-expansion-panel-header icon-name={iconName}>
        {headerText} {index + 1}
      </sbb-expansion-panel-header>
      <sbb-expansion-panel-content>
        <p>Content {index + 1}</p>
        {contentText}
      </sbb-expansion-panel-content>
    </sbb-expansion-panel>
  ));
};

const Template = ({
  numberOfPanels,
  color,
  expanded,
  borderless,
  disabled,
  headerText,
  iconName,
  contentText,
  ...args
}): JSX.Element => (
  <sbb-accordion {...args}>
    {createExpansionPanelTemplate(
      numberOfPanels,
      color,
      expanded,
      borderless,
      disabled,
      headerText,
      iconName,
      contentText
    )}
  </sbb-accordion>
);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Milk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1] },
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: [greyDecorator],
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const MilkBorderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1], borderless: true },
  decorators: [greyDecorator],
};

export const WithIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, iconName: 'swisspass-medium' },
};

export const Expanded: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const Multi: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multi: true },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion/sbb-accordion',
};

export default meta;
