import { h } from 'jsx-dom';
import readme from './readme.md';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tortor enim, dictum at vestibulum
    vel, convallis vel tellus. Nunc sed nulla vestibulum, elementum felis quis, convallis velit. Sed
    molestie nunc vitae risus rutrum fermentum. Donec dictum ullamcorper nulla sit amet dignissim.
    Nam ipsum odio, faucibus quis lectus ut, suscipit sollicitudin eros. Fusce dignissim lorem id
    quam fermentum, at feugiat dolor auctor. Duis posuere non tellus vel aliquet. Suspendisse
    consectetur odio nulla, nec imperdiet libero placerat id. Donec mollis varius aliquam. Sed
    faucibus euismod risus ac rhoncus. Maecenas pulvinar odio quis neque pulvinar rutrum. Ut sodales
    commodo fermentum. Proin in orci enim. Nullam augue nibh, cursus eget vestibulum at, ullamcorper
    ut tortor. Sed eget augue ac odio accumsan fermentum. Morbi volutpat lectus vitae urna mattis
    elementum. Nam pharetra, erat a varius porta, quam lacus venenatis libero, at pretium arcu velit
    vel lectus.`;

const shadow = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  shadow,
};

const basicArgs = {
  shadow: true,
};

const Template = (args) => [
  <sbb-header {...args}>
    <sbb-header-action
      icon="hamburger-menu-small"
      href="https://lyne-icons.netlify.app/icons/hamburger-menu-small.svg"
    >
      Test
    </sbb-header-action>
  </sbb-header>,
  <div style="height: 60vh">{text}</div>,
  <div style="height: 60vh">{text}</div>,
];

const TemplateActions = (args) => [
  <sbb-header {...args}>
    <sbb-header-action icon="hamburger-menu-small">Menu</sbb-header-action>
    <sbb-header-action icon="magnifying-glass-small">Suchen</sbb-header-action>
    <sbb-header-action icon="user-small">Anmelden</sbb-header-action>
    <sbb-header-action icon="globe-small">Deutsch</sbb-header-action>
  </sbb-header>,
  <div style="height: 60vh">{text}</div>,
  <div style="height: 60vh">{text}</div>,
  <div style="height: 60vh">{text}</div>,
];

export const header = Template.bind({});
header.args = JSON.parse(JSON.stringify(basicArgs));
header.argTypes = basicArgTypes;

header.documentation = {
  title: 'Header',
};

export const headerAction = TemplateActions.bind({});
headerAction.args = JSON.parse(JSON.stringify(basicArgs));
headerAction.argTypes = basicArgTypes;

headerAction.documentation = {
  title: 'Header with actions',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'components/header/sbb-header',
};
