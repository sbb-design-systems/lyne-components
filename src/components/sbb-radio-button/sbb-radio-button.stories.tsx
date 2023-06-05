import { h } from 'jsx-dom';
import readme from './readme.md';

const value = {
  control: {
    type: 'text',
  },
};

const checked = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  value,
  checked,
  disabled,
  size,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  value: 'First value',
  checked: false,
  disabled: false,
  size: size.options[0],
  'aria-label': undefined,
};

const DefaultTemplate = (args) => <sbb-radio-button {...args}>Value</sbb-radio-button>;

const MultilineLabelTemplate = (args) => (
  <sbb-radio-button {...args}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
    the industry's standard dummy text ever since the 1500s.
  </sbb-radio-button>
);

export const Default = DefaultTemplate.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };
Default.documentation = { title: 'Default Radio Button' };

export const SizeS = DefaultTemplate.bind({});
SizeS.argTypes = defaultArgTypes;
SizeS.args = { ...defaultArgs, size: size.options[1] };
SizeS.documentation = { title: 'Radio Button - Size S' };

export const Checked = DefaultTemplate.bind({});
Checked.argTypes = defaultArgTypes;
Checked.args = { ...defaultArgs, checked: true };
Checked.documentation = { title: 'Checked Radio Button' };

export const Disabled = DefaultTemplate.bind({});
Disabled.argTypes = defaultArgTypes;
Disabled.args = { ...defaultArgs, disabled: true };
Disabled.documentation = { title: 'Disabled Radio Button' };

export const CheckedDisabled = DefaultTemplate.bind({});
CheckedDisabled.argTypes = defaultArgTypes;
CheckedDisabled.args = { ...defaultArgs, checked: true, disabled: true };
CheckedDisabled.documentation = { title: 'Checked Disabled Radio Button' };

export const MultilineLabel = MultilineLabelTemplate.bind({});
MultilineLabel.argTypes = defaultArgTypes;
MultilineLabel.args = { ...defaultArgs, checked: true };
MultilineLabel.documentation = { title: 'Multiline Label Radio Button' };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem; max-width: 1050px'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-radio-button',
};
