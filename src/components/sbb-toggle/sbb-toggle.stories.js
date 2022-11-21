import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-toggle.events';

const disabled = {
  control: {
    type: 'boolean',
  },
};

const even = {
  control: {
    type: 'boolean',
  },
};

const size = {
  control: {
    type: 'inline-radio',
    options: ['m', 's'],
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  disabled,
  even,
  size,
  value,
};

const defaultArgs = {
  disabled: false,
  even: false,
  size: 'm',
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
  title: 'sbb-toggle',
};

export const sbbToggleDisabled = DefaultTemplate.bind({});
sbbToggleDisabled.args = { ...defaultArgs, disabled: true };
sbbToggleDisabled.argTypes = defaultArgTypes;
sbbToggleDisabled.documentation = {
  title: 'sbb-toggle disabled',
};

export const sbbToggleFixedWidth = DefaultTemplate.bind({});
sbbToggleFixedWidth.args = { ...defaultArgs, even: true };
sbbToggleFixedWidth.argTypes = defaultArgTypes;
sbbToggleFixedWidth.documentation = {
  title: 'sbb-toggle disabled',
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
