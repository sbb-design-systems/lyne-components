import { h } from 'jsx-dom';
import readme from './readme.md';

const checkboxs = () => [
  <sbb-checkbox name="checkbox-1" value="checkbox-1">
    Label 1
  </sbb-checkbox>,
  <sbb-checkbox name="checkbox-2" value="checkbox-2">
    Label 2
  </sbb-checkbox>,
  <sbb-checkbox name="checkbox-3" value="checkbox-3">
    Label 3
  </sbb-checkbox>,
];

const DefaultTemplate = (args) => <sbb-checkbox-group {...args}>{checkboxs()}</sbb-checkbox-group>;

const ErrorMessageTemplate = (args) => {
  const sbbFormError = <sbb-form-error slot="error">This is a required field.</sbb-form-error>;
  return (
    <sbb-checkbox-group {...args} id="sbb-checkbox-group">
      {checkboxs()}
      {args.required && sbbFormError}
    </sbb-checkbox-group>
  );
};

const name = {
  control: {
    type: 'text',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
};

const orientation = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const basicArgTypes = {
  name,
  disabled,
  required,
  orientation,
};

const basicArgs = {
  name: 'checkbox-group-1',
  disabled: false,
  required: false,
  orientation: orientation.options[1],
};

export const checkboxGroup = DefaultTemplate.bind({});
checkboxGroup.argTypes = basicArgTypes;
checkboxGroup.args = { ...basicArgs };
checkboxGroup.documentation = {
  title: 'sbb-checkbox-group',
};

export const checkboxGroupWithSbbFormError = ErrorMessageTemplate.bind({});
checkboxGroupWithSbbFormError.argTypes = basicArgTypes;
checkboxGroupWithSbbFormError.args = { ...basicArgs, required: true };
checkboxGroupWithSbbFormError.documentation = {
  title: 'sbb-checkbox-group with sbb-form-error',
};

export const checkboxGroupWithOrientationHorizontal = DefaultTemplate.bind({});
checkboxGroupWithOrientationHorizontal.argTypes = basicArgTypes;
checkboxGroupWithOrientationHorizontal.args = { ...basicArgs, orientation: orientation.options[0] };
checkboxGroupWithOrientationHorizontal.documentation = {
  title: 'sbb-checkbox-group with orientation horizontal',
};

export const checkboxGroupWithOrientationVertical = DefaultTemplate.bind({});
checkboxGroupWithOrientationVertical.argTypes = basicArgTypes;
checkboxGroupWithOrientationVertical.args = { ...basicArgs };
checkboxGroupWithOrientationVertical.documentation = {
  title: 'sbb-checkbox-group with orientation vertical',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'components/form elements/sbb-checkbox-group',
};
