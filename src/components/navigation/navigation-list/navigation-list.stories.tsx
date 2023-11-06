/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import './sbb-navigation-list';
import '../sbb-navigation-action';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  label,
};

const defaultArgs: Args = {
  label: 'Label',
};

const navigationActions = (): JSX.Element[] => [
  <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>,
  <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>,
  <sbb-navigation-action>Travel information</sbb-navigation-action>,
  <sbb-navigation-action>Help & Contact</sbb-navigation-action>,
];

const style = {
  'background-color': 'var(--sbb-color-midnight-default)',
  width: 'max-content',
  padding: '2rem',
};

const DefaultTemplate = (args): JSX.Element => (
  <sbb-navigation-list {...args}>{navigationActions()}</sbb-navigation-list>
);

const SlottedLabelTemplate = (args): JSX.Element => (
  <sbb-navigation-list {...args}>
    <span slot="label">Slotted label</span>
    {navigationActions()}
  </sbb-navigation-list>
);

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SlottedLabel: StoryObj = {
  render: SlottedLabelTemplate,
  argTypes: defaultArgTypes,
  args: {},
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={style}>
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
  title: 'components/sbb-navigation/sbb-navigation-list',
};

export default meta;
