/** @jsx h */
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { h, type JSX } from 'jsx-dom';

import readme from './readme.md?raw';
import './navigation-marker';
import '../navigation-action';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 's'],
};

const defaultArgTypes: ArgTypes = {
  size,
};

const defaultArgs: Args = {
  size: size.options[0],
};

const style = {
  'background-color': 'var(--sbb-color-midnight-default)',
  width: 'max-content',
  padding: '2rem',
};

const navigationActionsL = (active): JSX.Element[] => [
  <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>,
  <sbb-navigation-action id="nav-2" active={active}>
    Vacations & Recreation
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>,
  <sbb-navigation-action id="nav-4">Help & Contact</sbb-navigation-action>,
];

const navigationActionsS = (active): JSX.Element[] => [
  <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>,
  <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>,
  <sbb-navigation-action id="nav-7" active={active}>
    Italiano
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-8">English</sbb-navigation-action>,
];

const SizeLTemplate = (args): JSX.Element => (
  <sbb-navigation-marker {...args}>{navigationActionsL(false)}</sbb-navigation-marker>
);

const SizeSTemplate = (args): JSX.Element => (
  <sbb-navigation-marker {...args}>{navigationActionsS(false)}</sbb-navigation-marker>
);

const SizeLActiveTemplate = (args): JSX.Element => (
  <sbb-navigation-marker {...args}>{navigationActionsL(true)}</sbb-navigation-marker>
);

const SizeSActiveTemplate = (args): JSX.Element => (
  <sbb-navigation-marker {...args}>{navigationActionsS(true)}</sbb-navigation-marker>
);

export const SizeL: StoryObj = {
  render: SizeLTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeS: StoryObj = {
  render: SizeSTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const SizeLActive: StoryObj = {
  render: SizeLActiveTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeSActive: StoryObj = {
  render: SizeSActiveTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={style}>
        <Story></Story>
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
  title: 'components/sbb-navigation/sbb-navigation-marker',
};

export default meta;
