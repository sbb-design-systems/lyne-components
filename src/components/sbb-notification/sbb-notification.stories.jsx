import events from './sbb-notification.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { withActions } from '@storybook/addon-actions/decorator';

const titleContent = {
  control: {
    type: 'text',
  },
};

const type = {
  control: {
    type: 'radio',
  },
  options: ['info', 'success', 'warn', 'error'],
};

const variant = {
  control: {
    type: 'radio',
  },
  options: ['default', 'transparent', 'colorful'],
};

const readonly = {
  control: {
    type: 'boolean',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  'title-content': titleContent,
  type: type,
  variant: variant,
  readonly: readonly,
  'disable-animation': disableAnimation,
};

const basicArgs = {
  'title-content': 'Title',
  type: type.options[0],
  variant: variant.options[0],
  readonly: false,
  'disable-animation': isChromatic(),
};

const trigger = () => (
  <sbb-button
    size="m"
    style={'margin-block-end: var(--sbb-spacing-fixed-4x)'}
    onClick={() => document.querySelector('sbb-notification').open()}
  >
    Trigger
  </sbb-button>
);

const DefaultTemplate = (args) => [
  trigger(),
  <sbb-notification {...args}>
    The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.&nbsp;
    <sbb-link href="/" variant="inline">
      Link one
    </sbb-link>
    &nbsp;
    <sbb-link href="/" variant="inline">
      Link two
    </sbb-link>
    &nbsp;
    <sbb-link href="/" variant="inline">
      Link three
    </sbb-link>
  </sbb-notification>,
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  </p>,
];

export const Default = DefaultTemplate.bind({});
Default.argTypes = basicArgTypes;
Default.args = { ...basicArgs };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
    withActions,
  ],
  parameters: {
    actions: {
      handles: [events.didOpen, events.didClose, events.willOpen, events.willClose],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-notification',
};
