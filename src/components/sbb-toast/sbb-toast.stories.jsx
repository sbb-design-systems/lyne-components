import events from './sbb-toast.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import isChromatic from 'chromatic';

const position = {
  control: {
    type: 'select',
    options: [
      'bottom-left',
      'bottom-center',
      'bottom-right',
      'top-left',
      'top-center',
      'top-right',
    ],
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  position,
  disableAnimation,
  iconName,
};

const defaultArgs = {
  position: 'bottom-center',
  disableAnimation: isChromatic(),
  iconName: 'clock-small',
};

const Template = (args) => [
  <sbb-button id="show-btn">Show toast</sbb-button>,
  <sbb-toast {...args} trigger="show-btn"></sbb-toast>,
];

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };
Basic.play = isChromatic();

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
      handles: [events.willOpen, events.didOpen, events.willClose, events.didClose],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-toast',
};
