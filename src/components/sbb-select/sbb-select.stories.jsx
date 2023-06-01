import { h } from 'jsx-dom';
import events from './sbb-select.events';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import isChromatic from 'chromatic/isChromatic';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot.querySelector('div.sbb-form-field__space-wrapper')
  );

  await waitForStablePosition(() => canvas.getByTestId('select'));
  const select = await canvas.getByTestId('select');
  userEvent.click(select);
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const borderless = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const floatingLabel = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const value = {
  control: {
    type: 'inline-radio',
  },
  options: ['Option 1', 'Option 2'],
  table: {
    category: 'Select',
  },
};

const multiple = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const placeholder = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Select',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const readonly = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const numberOfOptions = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Option',
  },
};

const disableOption = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const withOptionGroup = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const disableGroup = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes = {
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

const defaultArgs = {
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

const changeEventHandler = (event) => {
  const div = document.createElement('div');
  div.innerText = `current value is: ${event.target.value}`;
  document.getElementById('container-value').append(div);
};

const textBlockStyle = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const defaultDecorator = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 2rem);'}>
      <Story />
    </div>
  ),
];

const aboveDecorator = [
  (Story) => (
    <div style={'padding: 2rem; height: calc(100vh - 2rem); display: flex; align-items: end'}>
      <Story />
    </div>
  ),
];

const scrollDecorator = [
  (Story) => (
    <div
      style={
        'padding: 2rem; height: calc(100vh * 1.5); background-color: var(--sbb-color-milk-default); display: flex; align-items: center'
      }
    >
      <Story />
    </div>
  ),
];

const valueEllipsis = 'This label name is so long that it needs ellipsis to fit.';

const textBlock = () => {
  return (
    <div style={textBlockStyle}>
      This text block has a <code style={codeStyle}>z-index</code> greater than the form field, but
      it must always be covered by the select overlay.
    </div>
  );
};

const createOptions = (numberOfOptions, disableOption, group, selectValue) => {
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

const createOptionsGroup = (numberOfOptions, disableOption, disableGroup) => {
  return [
    <sbb-optgroup label="Group 1" disabled={disableGroup}>
      {createOptions(numberOfOptions, disableOption, '1')}
    </sbb-optgroup>,
    <sbb-optgroup label="Group 2">
      {createOptions(numberOfOptions, disableOption, '2')}
    </sbb-optgroup>,
  ];
};

const SelectTemplate = ({
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}) => {
  if (args.multiple && args.value) {
    args.value = [args.value];
  }
  return (
    <sbb-select {...args} onChange={(event) => changeEventHandler(event)} data-testid="select">
      {withOptionGroup
        ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
        : createOptions(numberOfOptions, disableOption, false, args.value)}
    </sbb-select>
  );
};

const FormFieldTemplate = ({ borderless, floatingLabel, ...args }) => [
  <div>
    <sbb-form-field
      borderless={borderless}
      floating-label={floatingLabel}
      label="Select"
      data-testid="form-field"
    >
      {SelectTemplate(args)}
    </sbb-form-field>
    {textBlock()}
  </div>,
  <div id="container-value" style="margin-block-start: 2rem;"></div>,
];

const SelectEllipsisTemplate = ({
  borderless,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}) => {
  const ellipsisSelected = valueEllipsis === args.value;
  if (args.multiple && args.value) {
    args.value = [args.value];
  }

  return [
    <div>
      <sbb-form-field
        borderless={borderless}
        floating-label={floatingLabel}
        label="Select"
        data-testid="form-field"
      >
        <sbb-select {...args} onChange={(event) => changeEventHandler(event)} data-testid="select">
          <sbb-option value={valueEllipsis} selected={ellipsisSelected}>
            {valueEllipsis}
          </sbb-option>
          {withOptionGroup
            ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
            : createOptions(numberOfOptions, disableOption, false, args.value)}
        </sbb-select>
      </sbb-form-field>
      {textBlock()}
    </div>,
    <div id="container-value" style="margin-block-start: 2rem;"></div>,
  ];
};

const FormFieldTemplateWithError = ({
  borderless,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}) => {
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

const KeyboardInteractionTemplate = ({ borderless, floatingLabel, ...args }) => (
  <div style="padding: 2rem; background-color: #e6e6e6;">
    <sbb-form-field
      borderless={borderless}
      floating-label={floatingLabel}
      label="Select"
      data-testid="form-field"
    >
      <sbb-select multiple={args.multiple} placeholder={args.placeholder} data-testid="select">
        <sbb-option value="Abarth">Abarth</sbb-option>
        <sbb-option value="Alfa Romeo">Alfa Romeo</sbb-option>
        <sbb-option value="Alpine">Alpine</sbb-option>
        <sbb-option value="Aston Martin">Aston Martin</sbb-option>
        <sbb-option value="Audi">Audi</sbb-option>
        <sbb-option value="BMW">BMW</sbb-option>
        <sbb-option value="Chevrolet">Chevrolet</sbb-option>
        <sbb-option value="Daihatsu">Daihatsu</sbb-option>
        <sbb-option value="Daimler">Daimler</sbb-option>
      </sbb-select>
    </sbb-form-field>
    <div style="padding-block-start: 1rem">
      Focus the select and type letters (A to D) with closed or open panel.
    </div>
  </div>
);

export const SingleSelect = FormFieldTemplate.bind({});
SingleSelect.argTypes = defaultArgTypes;
SingleSelect.args = { ...defaultArgs };
SingleSelect.play = isChromatic() && playStory;

export const MultipleSelect = FormFieldTemplate.bind({});
MultipleSelect.argTypes = defaultArgTypes;
MultipleSelect.args = { ...defaultArgs, multiple: true };
MultipleSelect.play = isChromatic() && playStory;

export const SingleSelectWithGrouping = FormFieldTemplate.bind({});
SingleSelectWithGrouping.argTypes = defaultArgTypes;
SingleSelectWithGrouping.args = { ...defaultArgs, withOptionGroup: true };
SingleSelectWithGrouping.play = isChromatic() && playStory;

export const MultipleSelectWithGrouping = FormFieldTemplate.bind({});
MultipleSelectWithGrouping.argTypes = defaultArgTypes;
MultipleSelectWithGrouping.args = { ...defaultArgs, multiple: true, withOptionGroup: true };
MultipleSelectWithGrouping.play = isChromatic() && playStory;

export const SingleSelectEllipsis = SelectEllipsisTemplate.bind({});
SingleSelectEllipsis.argTypes = {
  ...defaultArgTypes,
  value: { ...value, options: [...value.options, valueEllipsis] },
};
SingleSelectEllipsis.args = { ...defaultArgs, value: valueEllipsis };
SingleSelectEllipsis.play = isChromatic() && playStory;

export const MultipleSelectEllipsis = SelectEllipsisTemplate.bind({});
MultipleSelectEllipsis.argTypes = {
  ...defaultArgTypes,
  value: { ...value, options: [...value.options, valueEllipsis] },
};
MultipleSelectEllipsis.args = { ...defaultArgs, multiple: true, value: valueEllipsis };
MultipleSelectEllipsis.play = isChromatic() && playStory;

export const Required = FormFieldTemplateWithError.bind({});
Required.argTypes = defaultArgTypes;
Required.args = { ...defaultArgs, required: true };
Required.play = isChromatic() && playStory;

export const Disabled = FormFieldTemplate.bind({});
Disabled.argTypes = defaultArgTypes;
Disabled.args = { ...defaultArgs, disabled: true };
Disabled.play = isChromatic() && playStory;

export const Readonly = FormFieldTemplate.bind({});
Readonly.argTypes = defaultArgTypes;
Readonly.args = { ...defaultArgs, readonly: true };
Readonly.play = isChromatic() && playStory;

export const Borderless = FormFieldTemplate.bind({});
Borderless.argTypes = defaultArgTypes;
Borderless.args = { ...defaultArgs, borderless: true };
Borderless.play = isChromatic() && playStory;

export const BorderlessOpenAbove = FormFieldTemplate.bind({});
BorderlessOpenAbove.argTypes = defaultArgTypes;
BorderlessOpenAbove.args = { ...defaultArgs, borderless: true };
BorderlessOpenAbove.decorators = aboveDecorator;
BorderlessOpenAbove.play = isChromatic() && playStory;

export const InScrollableContainer = FormFieldTemplate.bind({});
InScrollableContainer.argTypes = defaultArgTypes;
InScrollableContainer.args = { ...defaultArgs, borderless: true };
InScrollableContainer.decorators = scrollDecorator;
InScrollableContainer.play = isChromatic() && playStory;

export const DisableOption = FormFieldTemplate.bind({});
DisableOption.argTypes = defaultArgTypes;
DisableOption.args = { ...defaultArgs, disableOption: true };
DisableOption.play = isChromatic() && playStory;

export const DisableOptionGroup = FormFieldTemplate.bind({});
DisableOptionGroup.argTypes = defaultArgTypes;
DisableOptionGroup.args = { ...defaultArgs, withOptionGroup: true, disableGroup: true };
DisableOptionGroup.play = isChromatic() && playStory;

export const DisableMultipleOption = FormFieldTemplate.bind({});
DisableMultipleOption.argTypes = defaultArgTypes;
DisableMultipleOption.args = {
  ...defaultArgs,
  multiple: true,
  withOptionGroup: true,
  disableOption: true,
};
DisableMultipleOption.play = isChromatic() && playStory;

export const KeyboardInteraction = KeyboardInteractionTemplate.bind({});
KeyboardInteraction.argTypes = defaultArgTypes;
KeyboardInteraction.args = { ...defaultArgs };
KeyboardInteraction.play = isChromatic() && playStory;

export default {
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
