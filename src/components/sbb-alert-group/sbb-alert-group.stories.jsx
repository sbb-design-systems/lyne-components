import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-alert-group.events';

const Template = (args) => (
  <sbb-alert-group {...args}>
    <sbb-alert
      title-content="Interruption between Genève and Lausanne"
      href="https://www.sbb.ch"
      size="l"
    >
      The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
    </sbb-alert>
    <sbb-alert title-content="Interruption between Berne and Olten" href="https://www.sbb.ch">
      Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
      construction work will take place. You have to expect changed travel times and changed
      connections.
    </sbb-alert>
  </sbb-alert-group>
);

const accessibilityTitle = {
  control: {
    type: 'text',
  },
};

const accessibilityTitleLevel = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const role = {
  control: {
    type: 'text',
  },
};

const ariaLive = {
  control: {
    type: 'select',
  },
  options: ['off', 'polite', 'assertive'],
};

const defaultArgTypes = {
  'accessibility-title': accessibilityTitle,
  'accessibility-title-level': accessibilityTitleLevel,
  role,
  'aria-live': ariaLive,
};

const defaultArgs = {
  'accessibility-title': 'Disruptions',
  'accessibility-title-level': accessibilityTitleLevel.options[1],
  role: 'status',
  'aria-live': undefined,
};

export const multipleAlerts = Template.bind({});
multipleAlerts.argTypes = defaultArgTypes;
multipleAlerts.args = { ...defaultArgs };

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
      handles: [events.didDismissAlert, events.empty],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-alert-group',
};
