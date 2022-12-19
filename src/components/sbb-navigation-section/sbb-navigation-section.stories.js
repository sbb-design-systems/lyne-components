import { h } from 'jsx-dom';
import events from './sbb-navigation-section.events.ts';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';

// Story interaction executed after the story renders
const playStory = async (trigger, canvasElement) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('navigation').shadowRoot.querySelector('dialog.sbb-navigation')
  );

  const button = canvas.getByTestId('navigation-trigger');
  await userEvent.click(button);
  const action = canvas.getByTestId(trigger);
  await userEvent.click(action);
};

const accessibilityLabel = {
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

const navigationActionsL = [
  <sbb-navigation-action id="nav-1" data-testid="navigation-section-trigger-1">
    Label
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-2" data-testid="navigation-section-trigger-2">
    Label
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-3">Label</sbb-navigation-action>,
];

const navigationList = (label) => [
  <sbb-navigation-list label={label}>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m" href="https://www.sbb.ch/en/">
      Label
    </sbb-navigation-action>
  </sbb-navigation-list>,
];

const onNavigationClose = (dialog) => {
  dialog.addEventListener('didClose', () => {
    document.getElementById('nav-marker').reset();
  });
};

const DefaultTemplate = (args) => [
  triggerButton('navigation-trigger-1'),
  <sbb-navigation
    data-testid="navigation"
    id="navigation"
    trigger="navigation-trigger-1"
    ref={(dialog) => onNavigationClose(dialog)}
    {...args}
  >
    <sbb-navigation-marker id="nav-marker">{navigationActionsL}</sbb-navigation-marker>

    <sbb-navigation-section
      title-content="Title one"
      data-testid="navigation-section"
      id="navigation-section"
      trigger="nav-1"
      {...args}
    >
      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}

      <sbb-button size="m" style="width: fit-content">
        Button
      </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section
      title-content="Title two"
      data-testid="navigation-section"
      id="navigation-section"
      trigger="nav-2"
      {...args}
    >
      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}

      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}

      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}

      <sbb-button size="m" variant="secondary" style="width: fit-content" sbb-navigation-close>
        Close navigation
      </sbb-button>
    </sbb-navigation-section>
  </sbb-navigation>,
];

export const Default = DefaultTemplate.bind({});
Default.argTypes = basicArgTypes;
Default.args = { ...basicArgs };
Default.play = ({ canvasElement }) => playStory('navigation-section-trigger-1', canvasElement);

export const LongContent = DefaultTemplate.bind({});
LongContent.argTypes = basicArgTypes;
LongContent.args = { ...basicArgs };
LongContent.play = ({ canvasElement }) => playStory('navigation-section-trigger-2', canvasElement);

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [events.didClose],
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
  title: 'components/navigation/sbb-navigation-section',
};
