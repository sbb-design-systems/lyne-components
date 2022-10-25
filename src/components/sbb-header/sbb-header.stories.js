import { h } from 'jsx-dom';
import readme from './readme.md';
import events from '../sbb-header-action/sbb-header-action.events';
import isChromatic from 'chromatic/isChromatic';

const textContent = () => (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada augue. Morbi
    eget tristique nisl, sit amet dapibus erat. Donec tempor, metus et aliquam ultrices, nulla mi
    mollis urna, a lacinia mauris risus mattis massa. Quisque cursus sollicitudin enim in malesuada.
    Maecenas nec hendrerit augue. Duis porttitor mattis molestie. Sed imperdiet velit at dui
    ultrices, viverra scelerisque nisi dapibus. Nulla urna lectus, gravida eu dapibus vel, mattis
    non turpis. Nunc interdum et justo sed faucibus. Vestibulum interdum commodo mi, sed eleifend
    odio posuere in. Nunc non dui venenatis, eleifend est ut, varius odio. Quisque augue ante,
    mollis eu lorem id, commodo cursus risus.
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
    <sbb-header-action icon="globe-small" class="last-element">
      Deutsch
    </sbb-header-action>
  </sbb-header>,
  textContent(),
];

export const header = Template.bind({});
header.argTypes = basicArgTypes;
header.args = { shadow: false };
header.documentation = {
  title: 'Header',
};

export const headerWithActions = TemplateActions.bind({});
headerWithActions.argTypes = basicArgTypes;
headerWithActions.args = { shadow: false };
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
