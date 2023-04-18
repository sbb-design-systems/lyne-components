import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';

const LoremIpsumTemplate = () => [
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

const HeaderBasicTemplate = ({ children, attributes, ...args }) => [
  <sbb-header {...args}>
    <sbb-header-action icon-name="hamburger-menu-small" expand-from="small">
      Menu
    </sbb-header-action>
    <div class="spacer" />
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

const Template = (args) => (
  <HeaderBasicTemplate {...args}>
    <sbb-header-action icon-name="user-small">Sign in</sbb-header-action>
  </HeaderBasicTemplate>
);

const TemplateWithUserMenu = (args) => (
  <HeaderBasicTemplate {...args}>
    <sbb-header-action
      icon-name="user-small"
      id="user-menu-trigger"
      data-testid="user-menu-trigger"
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
      <sbb-divider />
      <sbb-menu-action icon-name="exit-small">Sign out</sbb-menu-action>
    </sbb-menu>
  </HeaderBasicTemplate>
);

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('user-menu').shadowRoot.querySelector('dialog.sbb-menu')
  );

  await waitForStablePosition(() => canvas.getByTestId('user-menu-trigger'));

  const button = canvas.getByTestId('user-menu-trigger');
  await userEvent.click(button);
};

const expanded = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Header attribute',
  },
};

const hideOnScroll = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Header attribute',
  },
};

const scrollOrigin = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header attribute',
  },
};

const basicArgTypes = {
  expanded,
  'hide-on-scroll': hideOnScroll,
  'scroll-origin': scrollOrigin,
};

const basicArgs = {
  expanded: false,
  'hide-on-scroll': false,
  'scroll-origin': undefined,
  attributes: { class: 'sbb-page-spacing' },
};

export const Basic = Template.bind({});
Basic.argTypes = basicArgTypes;
Basic.args = { ...basicArgs };

export const Expanded = Template.bind({});
Expanded.argTypes = basicArgTypes;
Expanded.args = {
  ...basicArgs,
  expanded: true,
  attributes: { class: 'sbb-page-spacing-expanded' },
};

export const WithUserMenu = TemplateWithUserMenu.bind({});
WithUserMenu.argTypes = basicArgTypes;
WithUserMenu.args = { ...basicArgs };
WithUserMenu.play = isChromatic() && playStory;

export const BasicScrollHide = Template.bind({});
BasicScrollHide.argTypes = basicArgTypes;
BasicScrollHide.args = { ...basicArgs, 'hide-on-scroll': true };

export const ExpandedScrollHide = Template.bind({});
ExpandedScrollHide.argTypes = basicArgTypes;
ExpandedScrollHide.args = {
  ...basicArgs,
  expanded: true,
  'hide-on-scroll': true,
  attributes: { class: 'sbb-page-spacing-expanded' },
};

export const ContainerScrollOriginScrollHide = Template.bind({});
ContainerScrollOriginScrollHide.argTypes = basicArgTypes;
ContainerScrollOriginScrollHide.args = {
  ...basicArgs,
  'hide-on-scroll': true,
  'scroll-origin': 'container',
  attributes: {
    id: 'container',
    class: 'sbb-page-spacing',
    style: 'height: 200px; overflow: auto;',
  },
};

export default {
  decorators: [
    (Story) => (
      <div>
        <Story style={`${isChromatic() && 'min-height: 100vh'}`} />
      </div>
    ),
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
      inlineStories: false,
      iframeHeight: '250px',
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-header',
};
