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
    type: 'select',
  },
  options: ['info', 'success', 'warn', 'error'],
};

const variant = {
  control: {
    type: 'select',
  },
  options: ['default', 'transparent', 'colorful'],
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
  'disable-animation': disableAnimation,
};

const basicArgs = {
  'title-content': 'Title',
  type: type.options[0],
  variant: variant.options[0],
  'disable-animation': isChromatic(),
};

const DefaultTemplate = (args) => (
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
  </sbb-notification>
);

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
