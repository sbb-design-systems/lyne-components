/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/html';
import type { InputType } from '@storybook/types';

const formError = document.createElement('sbb-form-error');
formError.innerText = 'Error';

const updateFormError = (): void => {
  const input = document.getElementById('input-id') as HTMLInputElement;
  if (input.hasAttribute('data-sbb-invalid') && !formError.isConnected) {
    document.getElementsByTagName('sbb-form-field')[0].append(formError);
  } else if (!input.hasAttribute('data-sbb-invalid')) {
    formError.remove();
  }
};

const invalidMutationObserver = new MutationObserver(() => updateFormError());
const storyRenderCallback = () => {
  return (Story) => {
    setTimeout(() => {
      const input = document.getElementById('input-id') as HTMLInputElement;
      invalidMutationObserver.disconnect();
      invalidMutationObserver.observe(input, {
        attributes: true,
        attributeFilter: ['data-sbb-invalid'],
      });
      updateFormError();
    });

    return Story();
  };
};

const changeEventHandler = async (event): Promise<void> => {
  const div = document.createElement('div');
  div.innerText = `value is: ${
    (document.getElementById('input-id') as HTMLInputElement).value
  }; valueAsDate is: ${await event.target.getValueAsDate()}.`;
  document.getElementById('container-value').append(div);
};

const setValueAsDate = (): void => {
  const timeInput = document.getElementsByTagName('sbb-time-input')[0];
  timeInput.setValueAsDate(new Date());
};

const setValue = (): void => {
  const input = document.getElementById('input-id') as HTMLInputElement;
  input.setAttribute('value', '0');
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input attribute',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input attribute',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 'l'],
  table: {
    category: 'Form-field attribute',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const iconStart: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const iconEnd: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes: ArgTypes = {
  value,
  disabled,
  readonly,
  required,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label,
  size,
  optional,
  borderless,
  iconStart,
  iconEnd,
};

const basicArgs: Args = {
  value: '12:00',
  disabled: false,
  readonly: false,
  required: false,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options[0],
  optional: false,
  borderless: false,
  iconStart: undefined,
  iconEnd: undefined,
};

const formFieldBasicArgsWithIcons = {
  ...basicArgs,
  label: 'Label',
  size: size.options[0],
  optional: false,
  borderless: false,
  iconStart: 'clock-small',
  iconEnd: 'circle-information-small',
};

const TemplateSbbTimeInput = ({
  label,
  optional,
  borderless,
  iconStart,
  iconEnd,
  size,
  ...args
}): JSX.Element => (
  <Fragment>
    <sbb-form-field
      size={size}
      label={label}
      optional={optional}
      borderless={borderless}
      width="collapse"
    >
      {iconStart && <sbb-icon slot="prefix" name={iconStart} />}
      <sbb-time-input onChange={(event) => changeEventHandler(event)}></sbb-time-input>
      <input id="input-id" {...args} />
      {iconEnd && <sbb-icon slot="suffix" name={iconEnd} />}
    </sbb-form-field>
    <div style={{ display: 'flex', gap: '1em', 'margin-block-start': '2rem' }}>
      <sbb-button variant="secondary" size="m" onClick={() => setValueAsDate()}>
        Set valueAsDate to current datetime
      </sbb-button>
      <sbb-button variant="secondary" size="m" onClick={() => setValue()}>
        Set value to 0
      </sbb-button>
    </div>
    <div style={{ 'margin-block-start': '1rem' }}>Change time in input:</div>
    <div id="container-value"></div>
  </Fragment>
);

export const SbbTimeInput: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs },
};

export const SbbTimeInputWithIcons: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgsWithIcons },
};

export const SbbTimeInputBorderless: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    borderless: true,
  },
};

export const SbbTimeInputDisabled: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    disabled: true,
  },
};

export const SbbTimeInputReadonly: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    readonly: true,
  },
};

export const SbbTimeInputWithError: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    value: '99:99',
  },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
    storyRenderCallback(),
  ],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-time-input',
};

export default meta;
