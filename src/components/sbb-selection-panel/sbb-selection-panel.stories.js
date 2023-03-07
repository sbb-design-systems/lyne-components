import events from './sbb-selection-panel.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';

const color = {
  control: {
    type: 'inline-radio',
  },
  options: ['White', 'Milk'],
};

const forceOpen = {
  control: {
    type: 'boolean',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const checkedInput = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const disabledInput = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const basicArgTypes = {
  color: color,
  'force-open': forceOpen,
  'disable-animation': disableAnimation,
  checkedInput,
  disabledInput,
};

const basicArgs = {
  color: color.options[0],
  'force-open': false,
  'disable-animation': isChromatic(),
  checkedInput: false,
  disabledInput: false,
};

const cardbadge = () => (
  <sbb-card-badge slot="badge">
    <div slot="generic">
      <span>%</span>
    </div>
  </sbb-card-badge>
);

const innerContent = () => (
  <div slot="content">
    Inner Content
    <sbb-link
      text-size="s"
      variant="block"
      icon-name="chevron-small-right-small"
      icon-placement="end"
      sbb-tooltip-close
    >
      Link
    </sbb-link>
  </div>
);

const WithCheckboxTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-selection-panel {...args}>
    {cardbadge()}
    <sbb-checkbox checked={checkedInput} disabled={disabledInput}>
      Value one
    </sbb-checkbox>
    {innerContent()}
  </sbb-selection-panel>
);

const WithRadioButtonTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-selection-panel {...args}>
    {cardbadge()}
    <sbb-radio-button value="Value one" checked={checkedInput} disabled={disabledInput}>
      Value one
    </sbb-radio-button>
    {innerContent()}
  </sbb-selection-panel>
);

const WithCheckboxGroupTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-checkbox-group orientation="vertical" horizontal-from="small">
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox checked={checkedInput}>Value one</sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox disabled={disabledInput}>Value two</sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox>Value three</sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

const WithRadioButtonGroupTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-radio-button-group orientation="vertical" horizontal-from="small">
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value one" checked={checkedInput}>
        Value one
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value two" disabled={disabledInput}>
        Value two
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value three">Value three</sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>
  </sbb-radio-button-group>
);

{
  /* <sbb-radio-button>
  Value
  <span slot="subtext">Subtext</span>
  <span slot="suffix">
    <sbb-icon/>
    <span class="sbb-text-xs sbb-text--bold">CHF</span>
    <span class="sbb-text-m sbb-text--bold">40.00</span>
  </span>
</sbb-radio-button> */
}

export const WithCheckbox = WithCheckboxTemplate.bind({});
WithCheckbox.argTypes = basicArgTypes;
WithCheckbox.args = { ...basicArgs };

export const WithRadioButon = WithRadioButtonTemplate.bind({});
WithRadioButon.argTypes = basicArgTypes;
WithRadioButon.args = { ...basicArgs };

export const WithCheckboxChecked = WithCheckboxTemplate.bind({});
WithCheckboxChecked.argTypes = basicArgTypes;
WithCheckboxChecked.args = { ...basicArgs, checkedInput: true };

export const WithRadioButtonChecked = WithRadioButtonTemplate.bind({});
WithRadioButtonChecked.argTypes = basicArgTypes;
WithRadioButtonChecked.args = { ...basicArgs, checkedInput: true };

export const WithCheckboxDisabled = WithCheckboxTemplate.bind({});
WithCheckboxDisabled.argTypes = basicArgTypes;
WithCheckboxDisabled.args = { ...basicArgs, disabledInput: true };

export const WithRadioButtonDisabled = WithRadioButtonTemplate.bind({});
WithRadioButtonDisabled.argTypes = basicArgTypes;
WithRadioButtonDisabled.args = { ...basicArgs, disabledInput: true };

export const WithCheckboxCheckedDisabled = WithCheckboxTemplate.bind({});
WithCheckboxCheckedDisabled.argTypes = basicArgTypes;
WithCheckboxCheckedDisabled.args = { ...basicArgs, checkedInput: true, disabledInput: true };

export const WithRadioButtonCheckedDisabled = WithRadioButtonTemplate.bind({});
WithRadioButtonCheckedDisabled.argTypes = basicArgTypes;
WithRadioButtonCheckedDisabled.args = { ...basicArgs, checkedInput: true, disabledInput: true };

export const WithCheckboxGroup = WithCheckboxGroupTemplate.bind({});
WithCheckboxGroup.argTypes = basicArgTypes;
WithCheckboxGroup.args = { ...basicArgs, checkedInput: true, disabledInput: true };

export const WithRadioButonGroup = WithRadioButtonGroupTemplate.bind({});
WithRadioButonGroup.argTypes = basicArgTypes;
WithRadioButonGroup.args = { ...basicArgs, checkedInput: true, disabledInput: true };

export const WithCheckboxGroupMilk = WithCheckboxGroupTemplate.bind({});
WithCheckboxGroupMilk.argTypes = basicArgTypes;
WithCheckboxGroupMilk.args = {
  ...basicArgs,
  color: color.options[1],
  checkedInput: true,
  disabledInput: true,
};

export const WithRadioButonGroupMilk = WithRadioButtonGroupTemplate.bind({});
WithRadioButonGroupMilk.argTypes = basicArgTypes;
WithRadioButonGroupMilk.args = {
  ...basicArgs,
  color: color.options[1],
  checkedInput: true,
  disabledInput: true,
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
    actions: {
      handles: [events.didOpen, events.didClose, events.willOpen, events.willClose],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'sbb-selection-panel',
};
