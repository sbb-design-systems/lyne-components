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

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityCloseLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  'accessibility-label': accessibilityLabel,
  'accessibility-close-label': accessibilityCloseLabel,
  'disable-animation': disableAnimation,
};

const basicArgs = {
  'accessibility-label': undefined,
  'accessibility-close-label': undefined,
  'disable-animation': isChromatic(),
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

const navigationActionsL = (active) => [
  <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>,
  <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>,
  <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>,
  <sbb-navigation-action id="nav-4" href="https://www.sbb.ch/en/" active={active}>
    Help & Contact
  </sbb-navigation-action>,
];

const navigationActionsS = (active) => [
  <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>,
  <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>,
  <sbb-navigation-action id="nav-7" active={active}>
    Italiano
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-8">English</sbb-navigation-action>,
];

const actionLabels = (num) => {
  const labels = [];
  for (let i = 1; i <= num; i++) {
    labels.push(<sbb-navigation-action>Label</sbb-navigation-action>);
  }
  return labels;
};

const DefaultTemplate = (args) => [
  triggerButton('navigation-trigger-1'),
  <sbb-navigation data-testid="navigation" id="navigation" trigger="navigation-trigger-1" {...args}>
    <sbb-navigation-marker>{navigationActionsL(false)}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">{navigationActionsS(false)}</sbb-navigation-marker>
  </sbb-navigation>,
];

const ActiveTemplate = (args) => [
  triggerButton('navigation-trigger-1'),
  <sbb-navigation data-testid="navigation" id="navigation" trigger="navigation-trigger-1" {...args}>
    <sbb-navigation-marker>{navigationActionsL(true)}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">{navigationActionsS(true)}</sbb-navigation-marker>
  </sbb-navigation>,
];

const LongContentTemplate = (args) => [
  triggerButton('navigation-trigger-1'),
  <sbb-navigation data-testid="navigation" id="navigation" trigger="navigation-trigger-1" {...args}>
    <sbb-navigation-marker>{navigationActionsL(false)}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">{actionLabels(20)}</sbb-navigation-marker>
  </sbb-navigation>,
];

export const Default = DefaultTemplate.bind({});
Default.argTypes = basicArgTypes;
Default.args = { ...basicArgs };
Default.documentation = { title: 'Default' };
Default.play = playStory;

export const Active = ActiveTemplate.bind({});
Active.argTypes = basicArgTypes;
Active.args = { ...basicArgs };
Active.documentation = { title: 'Active' };
Active.play = playStory;

export const LongContent = LongContentTemplate.bind({});
LongContent.argTypes = basicArgTypes;
LongContent.args = { ...basicArgs };
LongContent.documentation = { title: 'Long Content' };
LongContent.play = playStory;

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
      iframeHeight: '600px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/navigation/sbb-navigation',
};
