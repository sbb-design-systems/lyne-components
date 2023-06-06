import events from './sbb-toast.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import isChromatic from 'chromatic';

const position = {
  control: {
    type: 'select',
  },
  options: ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right'],
};

const iconName = {
  control: {
    type: 'text',
  },
};

const dismissible = {
  control: {
    type: 'boolean',
  },
};

const timeout = {
  control: {
    type: 'number',
    step: 500,
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  position,
  'icon-name': iconName,
  dismissible,
  timeout,
  disableAnimation,
};

const defaultArgs = {
  position: 'bottom-center',
  'icon-name': 'circle-tick-small',
  dismissible: false,
  timeout: 0,
  disableAnimation: isChromatic(),
};

const triggerBtnTemplate = () => <sbb-button id="show-btn">Show toast</sbb-button>;

const toastTemplate = (args, action, contentLength = 's') => (
  <sbb-toast {...args} trigger="show-btn">
    {contentLength === 's'
      ? 'Lorem ipsum dolor'
      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}

    {action === 'button' && <sbb-button slot="action" icon-name="clock-small"></sbb-button>}

    {action === 'link' && <sbb-link slot="action">Link action</sbb-link>}
  </sbb-toast>
);

const Template = (args) => [triggerBtnTemplate(), toastTemplate(args, null, 's')];

const LongContentTemplate = (args) => [triggerBtnTemplate(), toastTemplate(args, 'button', 'l')];

const ActionButtonTemplate = (args) => [triggerBtnTemplate(), toastTemplate(args, 'button', 's')];

const ActionLinkTemplate = (args) => [triggerBtnTemplate(), toastTemplate(args, 'link', 's')];

export const Basic = Template.bind({});
Basic.argTypes = defaultArgTypes;
Basic.args = { ...defaultArgs };
Basic.play = isChromatic();

export const Dismissible = Template.bind({});
Dismissible.argTypes = defaultArgTypes;
Dismissible.args = { ...defaultArgs, dismissible: true };
Dismissible.play = isChromatic();

export const LongContent = LongContentTemplate.bind({});
LongContent.argTypes = defaultArgTypes;
LongContent.args = { ...defaultArgs };
LongContent.play = isChromatic();

export const WithActionButton = ActionButtonTemplate.bind({});
WithActionButton.argTypes = defaultArgTypes;
WithActionButton.args = { ...defaultArgs };
WithActionButton.play = isChromatic();

export const WithActionLink = ActionLinkTemplate.bind({});
WithActionLink.argTypes = defaultArgTypes;
WithActionLink.args = { ...defaultArgs };
WithActionLink.play = isChromatic();

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
