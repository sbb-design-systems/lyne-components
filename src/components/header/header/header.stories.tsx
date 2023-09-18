/** @jsx h */
import { withActions } from '@storybook/addon-actions/decorator';
import { userEvent, within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import isChromatic from 'chromatic';
import { h, type JSX } from 'jsx-dom';

import { waitForComponentsReady } from '../../../storybook/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../../storybook/testing/wait-for-stable-position';

import readme from './readme.md?raw';

import './header';
import '../header-action';
import '../../divider';
import '../../menu';

const LoremIpsumTemplate = (): JSX.Element[] => [
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada augue. Morbi
    eget tristique nisl, sit amet dapibus erat. Donec tempor, metus et aliquam ultrices, nulla mi
    mollis urna, a lacinia mauris risus mattis massa. Quisque cursus sollicitudin enim in malesuada.
    Maecenas nec hendrerit augue. Duis porttitor mattis molestie. Sed imperdiet velit at dui
    ultrices, viverra scelerisque nisi dapibus. Nulla urna lectus, gravida eu dapibus vel, mattis
    non turpis. Nunc interdum et justo sed faucibus. Vestibulum interdum commodo mi, sed eleifend
    odio posuere in. Nunc non dui venenatis, eleifend est ut, varius odio. Quisque augue ante,
    mollis eu lorem id, commodo cursus risus.
  </div>,
  <br />,
];

const HeaderBasicTemplate = ({ children, attributes, ...args }): JSX.Element[] => [
  <sbb-header {...args}>
    <sbb-header-action icon-name="hamburger-menu-small" expand-from="small">
      Menu
    </sbb-header-action>
    <div class="sbb-header-spacer"></div>
    <sbb-header-action icon-name="magnifying-glass-small">Search</sbb-header-action>
    {children}
    <sbb-header-action icon-name="globe-small" id="language-menu-trigger" class="last-element">
      English
    </sbb-header-action>
    <sbb-menu trigger="language-menu-trigger" disable-animation={isChromatic()}>
      <sbb-menu-action>Deutsch</sbb-menu-action>
      <sbb-menu-action>Français</sbb-menu-action>
      <sbb-menu-action>Italiano</sbb-menu-action>
      <sbb-menu-action icon-name="tick-small">English</sbb-menu-action>
    </sbb-menu>
  </sbb-header>,
  <div {...attributes}>{new Array(12).fill(null).map(LoremIpsumTemplate)}</div>,
];

const Template = (args): JSX.Element => (
  <HeaderBasicTemplate {...args}>
    <sbb-header-action icon-name="user-small" class="sbb-header-shrinkable">
      Sign in
    </sbb-header-action>
  </HeaderBasicTemplate>
);

const TemplateWithUserMenu = (args): JSX.Element => (
  <HeaderBasicTemplate {...args}>
    <sbb-header-action
      icon-name="user-small"
      id="user-menu-trigger"
      data-testid="user-menu-trigger"
      class="sbb-header-shrinkable"
    >
      Christina Müller
    </sbb-header-action>
    <sbb-menu trigger="user-menu-trigger" disable-animation={isChromatic()} data-testid="user-menu">
      <sbb-menu-action icon-name="user-small" href="/">
        Account
      </sbb-menu-action>
      <sbb-menu-action icon-name="tickets-class-small">Tickets</sbb-menu-action>
      <sbb-menu-action icon-name="shopping-cart-small" amount="1">
        Shopping cart
      </sbb-menu-action>
      <sbb-divider></sbb-divider>
      <sbb-menu-action icon-name="exit-small">Sign out</sbb-menu-action>
    </sbb-menu>
  </HeaderBasicTemplate>
);

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('user-menu').shadowRoot.querySelector('.sbb-menu'),
  );

  await waitForStablePosition(() => canvas.getByTestId('user-menu-trigger'));

  const button = canvas.getByTestId('user-menu-trigger');
  await userEvent.click(button);
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Header attribute',
  },
};

const hideOnScroll: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Header attribute',
  },
};

const scrollOrigin: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header attribute',
  },
};

const argTypes: ArgTypes = {
  expanded,
  'hide-on-scroll': hideOnScroll,
  'scroll-origin': scrollOrigin,
};

const basicArgs: Args = {
  expanded: false,
  'hide-on-scroll': false,
  'scroll-origin': undefined,
  attributes: { class: 'sbb-page-spacing' },
};

export const Basic: StoryObj = {
  render: Template,
  argTypes,
  args: basicArgs,
};

export const Expanded: StoryObj = {
  render: Template,
  argTypes,
  args: {
    ...basicArgs,
    expanded: true,
    attributes: { class: 'sbb-page-spacing-expanded' },
  },
};

export const WithUserMenu: StoryObj = {
  render: TemplateWithUserMenu,
  argTypes,
  args: basicArgs,
  play: isChromatic() && playStory,
};

export const BasicScrollHide: StoryObj = {
  render: Template,
  argTypes,
  args: { ...basicArgs, 'hide-on-scroll': true },
};

export const ExpandedScrollHide: StoryObj = {
  render: Template,
  argTypes,
  args: {
    ...basicArgs,
    expanded: true,
    'hide-on-scroll': true,
    attributes: { class: 'sbb-page-spacing-expanded' },
  },
};

export const ContainerScrollOriginScrollHide: StoryObj = {
  render: Template,
  argTypes,
  args: {
    ...basicArgs,
    'hide-on-scroll': true,
    'scroll-origin': 'container',
    attributes: {
      id: 'container',
      class: 'sbb-page-spacing',
      style: 'height: 200px; overflow: auto;',
    },
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div>
        <Story style={isChromatic() ? { 'min-height': '100vh' } : undefined}></Story>
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    backgrounds: {
      disable: true,
    },
    actions: {
      handles: ['click'],
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: '250px',
      },
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-header/sbb-header',
};

export default meta;
