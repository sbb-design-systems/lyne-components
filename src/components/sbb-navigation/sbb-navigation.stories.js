import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';
import events from './sbb-navigation.events.ts';

const triggerButton = (id) => (
  <sbb-button data-testid="navigation-trigger" id={id} size="m">
    Open navigation
  </sbb-button>
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
  <sbb-navigation {...args} id="navigation">
    <sbb-navigation-list {...args}>
      <sbb-navigation-action>Label n1</sbb-navigation-action>
      <sbb-navigation-action>Label n2</sbb-navigation-action>
      <sbb-navigation-action>Label n3</sbb-navigation-action>
    </sbb-navigation-list>
  </sbb-navigation>,
];

export const Default = DefaultTemplate.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };
Default.documentation = { title: 'Default' };

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
