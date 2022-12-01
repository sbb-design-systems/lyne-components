import { h } from 'jsx-dom';
import events from './sbb-navigation.events.ts';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('navigation').shadowRoot.querySelector('dialog.sbb-navigation')
  );

  const button = canvas.getByTestId('navigation-trigger');
  await userEvent.click(button);
};

const triggerButton = (id) => (
  <sbb-button
    data-testid="navigation-trigger"
    id={id}
    variant="secondary"
    size="l"
    icon-name="hamburger-menu-small"
  ></sbb-button>
);

const triggerControl = {
  control: { type: 'text' },
};

const defaultArgTypes = {
  trigger: triggerControl,
};

const defaultArgs = {
  trigger: 'trigger-button',
};

const DefaultTemplate = (args) => [
  triggerButton('trigger-button'),
  <sbb-navigation data-testid="navigation" {...args} id="navigation">
    <sbb-navigation-marker>
      <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>
      <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
      <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>
      <sbb-navigation-action id="nav-4">Help & Contact</sbb-navigation-action>
    </sbb-navigation-marker>
    <sbb-navigation-marker size="s">
      <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>
      <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>
      <sbb-navigation-action id="nav-7">Italiano</sbb-navigation-action>
      <sbb-navigation-action id="nav-8">English</sbb-navigation-action>
    </sbb-navigation-marker>
    <sbb-button size="m">All tickets & offers</sbb-button>
  </sbb-navigation>,
];

export const Default = DefaultTemplate.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };
Default.documentation = { title: 'Default' };
Default.play = playStory;

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; ${isChromatic() ? 'min-height: 100vh' : ''}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.willOpen, events.didOpen, events.didClose, events.willClose],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: '400px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/navigation/sbb-navigation',
};
