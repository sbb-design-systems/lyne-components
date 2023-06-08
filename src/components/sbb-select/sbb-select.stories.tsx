/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import events from './sbb-select.events';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import isChromatic from 'chromatic/isChromatic';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot.querySelector('div.sbb-form-field__space-wrapper')
  );

  await waitForStablePosition(() => canvas.getByTestId('select'));
  const select = await canvas.getByTestId('select');
  userEvent.click(select);
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const value: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['Option 1', 'Option 2'],
  table: {
    category: 'Select',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const placeholder: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Select',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Option',
  },
};

const disableOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const withOptionGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes: ArgTypes = {
  borderless,
  floatingLabel,
  value,
  multiple,
  placeholder,
  disabled,
  required,
  readonly,
  'disable-animation': disableAnimation,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
};

const defaultArgs: Args = {
  borderless: false,
  floatingLabel: false,
  value: undefined,
  multiple: false,
  placeholder: 'Please select value.',
  disabled: false,
  required: false,
  readonly: false,
  'disable-animation': isChromatic(),
  numberOfOptions: 5,
  disableOption: false,
  withOptionGroup: false,
  disableGroup: false,
};

const changeEventHandler = (event): void => {
  const div = document.createElement('div');
  div.innerText = `current value is: ${event.target.value}`;
  document.getElementById('container-value').append(div);
};

const textBlockStyle: Args = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle: Args = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const defaultDecorator: Decorator[] = [
  (Story) => (
    <div style={{ padding: '2rem', height: 'calc(100vh - 2rem)' }}>
      <Story />
    </div>
  ),
];

const aboveDecorator: Decorator[] = [
  (Story) => (
    <div
      style={{
        height: '100%',
        display: 'flex',
        'align-items': 'end',
      }}
    >
      <Story />
    </div>
  ),
];

const scrollDecorator: Decorator[] = [
  (Story) => (
    <div
      style={{
        height: '200%',
        padding: '1rem',
        'background-color': 'var(--sbb-color-milk-default)',
        display: 'flex',
        'align-items': 'center',
      }}
    >
      <Story />
    </div>
  ),
];

const valueEllipsis = 'This label name is so long that it needs ellipsis to fit.';

const textBlock = (): JSX.Element => {
  return (
    <div style={textBlockStyle}>
      This text block has a <code style={codeStyle}>z-index</code> greater than the form field, but
      it must always be covered by the select overlay.
    </div>
  );
};

const createOptions = (
  numberOfOptions,
  disableOption,
  group,
  selectValue = null
): JSX.Element[] => {
  return new Array(numberOfOptions).fill(null).map((_, i) => {
    const value = group ? `Option ${i + 1} ${' - ' + group}` : `Option ${i + 1}`;
    const selected = Array.isArray(selectValue)
      ? selectValue.includes(value)
      : selectValue === value;
    return (
      <sbb-option value={value} disabled={disableOption && i < 2} selected={selected}>
        {value}
      </sbb-option>
    );
  });
};

const createOptionsGroup = (numberOfOptions, disableOption, disableGroup): JSX.Element[] => {
  return [
    <sbb-optgroup label="Group 1" disabled={disableGroup}>
      {createOptions(numberOfOptions, disableOption, '1')}
    </sbb-optgroup>,
    <sbb-optgroup label="Group 2">
      {createOptions(numberOfOptions, disableOption, '2')}
    </sbb-optgroup>,
  ];
};

const FormFieldTemplate = ({
  borderless,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}): JSX.Element => (
  <Fragment>
    <div>
      <sbb-form-field
        borderless={borderless}
        floating-label={floatingLabel}
        label="Select"
        data-testid="form-field"
      >
        <sbb-select {...args} onChange={(event) => changeEventHandler(event)} data-testid="select">
          {withOptionGroup
            ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
            : createOptions(numberOfOptions, disableOption, false, args.value)}
        </sbb-select>
      </sbb-form-field>
      {textBlock()}
    </div>
    <div id="container-value" style={{ 'margin-block-start': '2rem' }}></div>
  </Fragment>
);

const SelectEllipsisTemplate = ({
  borderless,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}): JSX.Element => {
  const ellipsisSelected = valueEllipsis === args.value;
  if (args.multiple && args.value) {
    args.value = [args.value];
  }

  return (
    <Fragment>
      <div>
        <sbb-form-field
          borderless={borderless}
          floating-label={floatingLabel}
          label="Select"
          data-testid="form-field"
        >
          <sbb-select
            {...args}
            onChange={(event) => changeEventHandler(event)}
            data-testid="select"
          >
            <sbb-option value={valueEllipsis} selected={ellipsisSelected}>
              {valueEllipsis}
            </sbb-option>
            {withOptionGroup
              ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
              : createOptions(numberOfOptions, disableOption, false, args.value)}
          </sbb-select>
        </sbb-form-field>
        {textBlock()}
      </div>
      <div id="container-value" style={{ 'margin-block-start': '2rem' }}></div>
    </Fragment>
  );
};

const FormFieldTemplateWithError = ({
  borderless,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}): JSX.Element => {
  if (args.multiple && args.value) {
    args.value = [args.value];
  }
  const sbbFormError = <sbb-form-error>Error</sbb-form-error>;
  return (
    <div>
      <sbb-form-field
        borderless={borderless}
        floating-label={floatingLabel}
        id="sbb-form-field"
        label="Select"
        data-testid="form-field"
      >
        <sbb-select
          {...args}
          id="sbb-select"
          class="sbb-invalid"
          data-testid="select"
          onChange={(event) => {
            if (event.target.value !== '') {
              sbbFormError.remove();
              document.getElementById('sbb-select').classList.remove('sbb-invalid');
            } else {
              document.getElementById('sbb-form-field').append(sbbFormError);
              document.getElementById('sbb-select').classList.add('sbb-invalid');
            }
          }}
        >
          {withOptionGroup
            ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
            : createOptions(numberOfOptions, disableOption, false, args.value)}
        </sbb-select>
        {sbbFormError}
      </sbb-form-field>
      {textBlock()}
    </div>
  );
};

const KeyboardInteractionTemplate = ({ borderless, floatingLabel, ...args }): JSX.Element => (
  <div style={{ padding: '2rem', 'background-color': 'var(--sbb-color-milk-default)' }}>
    <sbb-form-field
      borderless={borderless}
      floating-label={floatingLabel}
      label="Select"
      data-testid="form-field"
    >
      <sbb-select multiple={args.multiple} placeholder={args.placeholder} data-testid="select">
        <sbb-option value="Bellinzona">Bellinzona</sbb-option>
        <sbb-option value="Bern">Bern</sbb-option>
        <sbb-option value="Chur">Chur</sbb-option>
        <sbb-option value="Glarus">Glarus</sbb-option>
        <sbb-option value="Lugano">Lugano</sbb-option>
        <sbb-option value="Winterthur">Winterthur</sbb-option>
        <sbb-option value="Zermatt">Zermatt</sbb-option>
        <sbb-option value="Zürich">Zürich</sbb-option>
      </sbb-select>
    </sbb-form-field>
    <div style={{ 'padding-block-start': '1rem' }}>
      Focus the select and type letters with closed or open panel.
    </div>
  </div>
);

export const SingleSelect: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() && playStory,
};

export const MultipleSelect: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multiple: true },
  play: isChromatic() && playStory,
};

export const SingleSelectWithGrouping: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withOptionGroup: true },
  play: isChromatic() && playStory,
};

export const MultipleSelectWithGrouping: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multiple: true, withOptionGroup: true },
  play: isChromatic() && playStory,
};

export const SingleSelectEllipsis: StoryObj = {
  render: SelectEllipsisTemplate,
  argTypes: {
    ...defaultArgTypes,
    value: { ...value, options: [...value.options, valueEllipsis] },
  },
  args: { ...defaultArgs, value: valueEllipsis },
  play: isChromatic() && playStory,
};

export const MultipleSelectEllipsis: StoryObj = {
  render: SelectEllipsisTemplate,
  argTypes: {
    ...defaultArgTypes,
    value: { ...value, options: [...value.options, valueEllipsis] },
  },
  args: { ...defaultArgs, multiple: true, value: valueEllipsis },
  play: isChromatic() && playStory,
};

export const Required: StoryObj = {
  render: FormFieldTemplateWithError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, required: true },
  play: isChromatic() && playStory,
};

export const Disabled: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  play: isChromatic() && playStory,
};

export const Readonly: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
  play: isChromatic() && playStory,
};

export const Borderless: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  play: isChromatic() && playStory,
};

export const BorderlessOpenAbove: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: aboveDecorator,
  play: isChromatic() && playStory,
};

export const InScrollableContainer: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: scrollDecorator,
  play: isChromatic() && playStory,
};

export const DisableOption: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disableOption: true },
  play: isChromatic() && playStory,
};

export const DisableOptionGroup: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withOptionGroup: true, disableGroup: true },
  play: isChromatic() && playStory,
};

export const DisableMultipleOption: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    multiple: true,
    withOptionGroup: true,
    disableOption: true,
  },
  play: isChromatic() && playStory,
};

export const KeyboardInteraction: StoryObj = {
  render: KeyboardInteractionTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() && playStory,
};

const meta: Meta = {
  decorators: defaultDecorator,
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [events.change, events.didClose, events.didOpen, events.willClose, events.willOpen],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-select',
};

export default meta;
