import { h } from 'jsx-dom';
import readme from './readme.md';
import events from '../sbb-header-action/sbb-header-action.events';
import isChromatic from 'chromatic/isChromatic';

const textContent = () => (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tortor enim, dictum at vestibulum
    vel, convallis vel tellus. Nunc sed nulla vestibulum, elementum felis quis, convallis velit. Sed
    molestie nunc vitae risus rutrum fermentum. Donec dictum ullamcorper nulla sit amet dignissim.
    Nam ipsum odio, faucibus quis lectus ut, suscipit sollicitudin eros.
  </div>
);

const shadow = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  shadow,
};

const Template = (args) => [
  <sbb-header {...args}>
    <sbb-header-action
      icon="pie-small"
      href="https://lyne-icons.netlify.app/icons/pie-small.svg"
      target="_blank"
    >
      Pie
    </sbb-header-action>
    <sbb-header-action icon="balloons-small">Balloons</sbb-header-action>
    <sbb-header-action icon="bottle-apple-small">Bottle & Apple</sbb-header-action>
  </sbb-header>,
  textContent(),
];

const TemplateActions = (args) => [
  <sbb-header {...args}>
    <sbb-header-action icon="hamburger-menu-small" expand-from="small">
      Menu
    </sbb-header-action>
    <div class="spacer" />
    <sbb-header-action icon="magnifying-glass-small">Suchen</sbb-header-action>
    <sbb-header-action icon="user-small">Anmelden</sbb-header-action>
    <sbb-header-action icon="globe-small">Deutsch</sbb-header-action>
  </sbb-header>,
  textContent(),
];

export const headerShadow = Template.bind({});
headerShadow.args = { shadow: true };
headerShadow.argTypes = basicArgTypes;
headerShadow.documentation = {
  title: 'Header with shadow on',
};

export const headerNoShadow = Template.bind({});
headerNoShadow.args = { shadow: false };
headerNoShadow.argTypes = basicArgTypes;
headerNoShadow.documentation = {
  title: 'Header with shadow off',
};

export const headerWithActions = TemplateActions.bind({});
headerWithActions.args = { shadow: true };
headerWithActions.argTypes = basicArgTypes;
headerWithActions.documentation = {
  title: 'Header with custom actions',
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
    backgrounds: {
      disable: true,
    },
    actions: {
      handles: [events.click],
    },
    docs: {
      inlineStories: false,
      iframeHeight: '250px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/header/sbb-header',
};
