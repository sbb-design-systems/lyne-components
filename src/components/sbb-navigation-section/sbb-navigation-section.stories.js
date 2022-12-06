import { h } from 'jsx-dom';
import events from './sbb-navigation-section.events.ts';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas
      .getByTestId('navigation-section')
      .shadowRoot.querySelector('dialog.sbb-navigation-section')
  );

  const button = canvas.getByTestId('navigation-section-trigger');
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
    data-testid="navigation-section-trigger"
    id={id}
    variant="secondary"
    size="l"
    icon-name="hamburger-menu-small"
  ></sbb-button>
);

const navigationList = (label) => [
  <sbb-navigation-list label={label}>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m" href="https://www.sbb.ch/en/">
      Label
    </sbb-navigation-action>
  </sbb-navigation-list>,
];

const DefaultTemplate = (args) => [
  triggerButton('navigation-section-trigger-1'),
  <sbb-navigation-section
    title-content="Title"
    data-testid="navigation-section"
    id="navigation-section"
    trigger="navigation-section-trigger-1"
    {...args}
  >
    {navigationList('Label')}
    {navigationList('Label')}
    {navigationList('Label')}

    {navigationList('Label')}
    {navigationList('Label')}
    {navigationList('Label')}
    <sbb-button size="m" style="width: fit-content" sbb-navigation-section-close>
      Close section
    </sbb-button>
  </sbb-navigation-section>,
];

const LongContentTemplate = (args) => [
  triggerButton('navigation-section-trigger-1'),
  <sbb-navigation-section
    title-content="Title"
    data-testid="navigation-section"
    id="navigation-section"
    trigger="navigation-section-trigger-1"
    {...args}
  >
    {navigationList('Label')}
    {navigationList('Label')}
    {navigationList('Label')}

    {navigationList('Label')}
    {navigationList('Label')}
    {navigationList('Label')}
    <sbb-button size="m" style="width: fit-content" sbb-navigation-section-close>
      Close section
    </sbb-button>
  </sbb-navigation-section>,
];

export const Default = DefaultTemplate.bind({});
Default.argTypes = basicArgTypes;
Default.args = { ...basicArgs };
Default.documentation = { title: 'Default' };
Default.play = playStory;

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
  title: 'components/navigation/sbb-navigation-section',
};
