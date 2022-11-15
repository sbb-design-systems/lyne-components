import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-toggle.events';

const value = {
  control: {
    type: 'text',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  disabled,
  value,
};

const defaultArgs = {
  disabled: false,
  value: 'Option 1',
};

const DefaultTemplate = (args) => (
  <sbb-toggle {...args}>
    <sbb-toggle-option value="Option 1">Option 1</sbb-toggle-option>
    <sbb-toggle-option value="Option 2">Option 2</sbb-toggle-option>
  </sbb-toggle>
);

export const sbbToggle = DefaultTemplate.bind({});
sbbToggle.args = defaultArgs;
sbbToggle.argTypes = defaultArgTypes;

sbbToggle.documentation = {
  title: 'Title which will be rendered on documentation platform',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform'],
  },
  parameters: {
    actions: {
      handles: [events.didChange],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-toggle',
};
