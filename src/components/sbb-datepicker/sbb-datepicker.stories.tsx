/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';
import { withActions } from '@storybook/addon-actions/decorator';
import isChromatic from 'chromatic';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const wide: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Datepicker attribute',
  },
};
const cutoffYearOffset: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const filterFunctions = [
  () => true,
  (d) => d.getDay() !== 6 && d.getDay() !== 0,
  (d) => d.getDate() % 2 === 1,
];
const dateFilter: InputType = {
  options: Object.keys(filterFunctions),
  mapping: filterFunctions,
  control: {
    type: 'select',
    labels: {
      0: 'No dateFilter function.',
      1: 'The dateFilter function includes only working days.',
      2: 'The dateFilter function excludes even days.',
    },
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Datepicker attribute',
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

const dataNow: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Testing',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Testing',
  },
};

const basicArgTypes: ArgTypes = {
  value,
  form,
  disabled,
  readonly,
  required,
  min,
  max,
  wide,
  dateFilter,
  'aria-label': ariaLabel,
  'data-now': dataNow,
  disableAnimation,
  cutoffYearOffset: cutoffYearOffset,
};

const basicArgs: Args = {
  value: `15.02.2023`,
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  min: undefined,
  max: undefined,
  wide: false,
  dateFilter: dateFilter.options[0],
  'aria-label': undefined,
  disableAnimation: isChromatic(),
  dataNow: isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : undefined,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label,
  size,
  optional,
  borderless,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options[0],
  optional: false,
  borderless: false,
};

const getInputAttributes = (min, max): Record<string, number> => {
  const attr: Record<string, number> = {};
  if (min) {
    attr.min = new Date(min).getTime() / 1000;
  }
  if (max) {
    attr.max = new Date(max).getTime() / 1000;
  }
  return attr;
};

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('toggle').shadowRoot.querySelector('sbb-tooltip-trigger')
  );

  await waitForStablePosition(() =>
    canvas.getByTestId('toggle').shadowRoot.querySelector('sbb-tooltip-trigger')
  );

  const toggle = await canvas.getByTestId('toggle').shadowRoot.querySelector('sbb-tooltip-trigger');
  userEvent.click(toggle);
};

const changeEventHandler = async (event): Promise<void> => {
  const div = document.createElement('div');
  div.innerText = `valueAsDate is: ${await event.target.getValueAsDate()}.`;
  document.getElementById('container-value').append(div);
};

const Template = ({
  min,
  max,
  wide,
  cutoffYearOffset,
  dateFilter,
  'data-now': dataNow,
  disableAnimation,
  ...args
}): JSX.Element => {
  return (
    <Fragment>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <sbb-datepicker-previous-day date-picker="datepicker" />
        <sbb-datepicker-toggle
          date-picker="datepicker"
          data-testid="toggle"
          disable-animation={disableAnimation}
        />
        <input {...args} id="datepicker-input" {...getInputAttributes(min, max)} />
        <sbb-datepicker
          id="datepicker"
          input="datepicker-input"
          ref={(calendarRef) => {
            calendarRef.dateFilter = dateFilter;
          }}
          wide={wide}
          cutoffYearOffset={cutoffYearOffset}
          onChange={(event) => changeEventHandler(event)}
          data-now={dataNow}
        ></sbb-datepicker>
        <sbb-datepicker-next-day date-picker="datepicker" />
      </div>
      <div id="container-value" style={{ 'margin-block-start': '1rem' }}>
        Change date to get the latest value:
      </div>
    </Fragment>
  );
};

const TemplateFormField = ({
  min,
  max,
  label,
  optional,
  borderless,
  size,
  wide,
  cutoffYearOffset,
  dateFilter,
  'data-now': dataNow,
  disableAnimation,
  ...args
}): JSX.Element => {
  return (
    <Fragment>
      <sbb-form-field
        size={size}
        label={label}
        optional={optional}
        borderless={borderless}
        width="collapse"
      >
        <sbb-datepicker-previous-day />
        <sbb-datepicker-next-day />
        <sbb-datepicker-toggle data-testid="toggle" disable-animation={disableAnimation} />
        <input {...args} {...getInputAttributes(min, max)} />
        <sbb-datepicker
          ref={(calendarRef) => {
            calendarRef.dateFilter = dateFilter;
          }}
          wide={wide}
          cutoffYearOffset={cutoffYearOffset}
          onChange={(event) => changeEventHandler(event)}
          data-now={dataNow}
        ></sbb-datepicker>
      </sbb-form-field>
      <div id="container-value" style={{ 'margin-block-start': '1rem' }}>
        Change date to get the latest value:
      </div>
    </Fragment>
  );
};

export const InFormField: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs },
  play: isChromatic() && playStory,
};

export const InFormFieldDisabled: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, disabled: true },
};

export const InFormFieldReadonly: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, readonly: true },
};

export const InFormFieldWide: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, wide: true },
};

export const InFormFieldWithMinAndMax: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgs,
    min: new Date(2023, 1, 8),
    max: new Date(2023, 1, 22),
  },
};

export const InFormFieldWithDateFilter: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, dateFilter: dateFilter.options[1] },
};

export const InFormFieldLarge: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, size: size.options[1] },
};

export const InFormFieldOptional: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, optional: true },
};

export const InFormFieldBorderless: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, borderless: true },
};

export const WithoutFormField: StoryObj = {
  render: Template,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', 'min-height': isChromatic() ? '100vh' : undefined }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: ['input', 'change'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '600px' },

      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-datepicker',
};

export default meta;
