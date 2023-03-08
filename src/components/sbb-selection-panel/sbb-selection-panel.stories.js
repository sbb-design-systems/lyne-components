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

const suffixStyle = {
  display: 'flex',
  alignItems: 'center',
};

const cardbadge = () => (
  <sbb-card-badge slot="badge">
    <div slot="generic">
      <span>%</span>
    </div>
  </sbb-card-badge>
);

const suffixAndSubtext = () => [
  <span slot="subtext">Subtext</span>,
  <span slot="suffix" style="margin-inline-start: auto">
    <span style={suffixStyle}>
      <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-1x)" />
      <span class="sbb-text-m sbb-text--bold">
        <span class="sbb-text-xs sbb-text--bold">CHF</span> 40.00
      </span>
    </span>
  </span>,
];

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
      {suffixAndSubtext()}
    </sbb-checkbox>
    {innerContent()}
  </sbb-selection-panel>
);

const WithRadioButtonTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-selection-panel {...args}>
    {cardbadge()}
    <sbb-radio-button value="Value one" checked={checkedInput} disabled={disabledInput}>
      Value one
      {suffixAndSubtext()}
    </sbb-radio-button>
    {innerContent()}
  </sbb-selection-panel>
);

const WithCheckboxGroupTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-checkbox-group orientation="vertical" horizontal-from="large">
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox checked={checkedInput}>
        Value one
        {suffixAndSubtext()}
      </sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox disabled={disabledInput}>
        Value two
        {suffixAndSubtext()}
      </sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox>
        Value three
        {suffixAndSubtext()}
      </sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

const WithRadioButtonGroupTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-radio-button-group orientation="vertical" horizontal-from="large">
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value one" checked={checkedInput}>
        Value one
        {suffixAndSubtext()}
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value two" disabled={disabledInput}>
        Value two
        {suffixAndSubtext()}
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value three">
        Value three
        {suffixAndSubtext()}
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>
  </sbb-radio-button-group>
);

const TicketsOptionsExampleTemplate = ({ checkedInput, disabledInput, ...args }) => (
  <sbb-checkbox-group orientation="vertical" horizontal-from="large">
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox checked={checkedInput}>
        Sparen
        {suffixAndSubtext()}
      </sbb-checkbox>
      <div slot="content">
        <sbb-radio-button-group orientation="vertical">
          <sbb-radio-button value="non-flex" style="width: 100%">
            Non-Flex
            <span slot="subtext">Keine Rückerstattung möglich</span>
            <span
              slot="suffix"
              style="margin-inline-start: auto; color: var(--sbb-color-granite-default)"
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">CHF</span> 0.00
                </span>
              </span>
            </span>
          </sbb-radio-button>
          <sbb-radio-button value="semi-flex" style="width: 100%">
            Semi-Flex
            <span slot="subtext">Teil-Rückerstattung möglich</span>
            <span
              slot="suffix"
              style="margin-inline-start: auto; color: var(--sbb-color-granite-default)"
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">+ CHF</span> 5.00
                </span>
              </span>
            </span>
          </sbb-radio-button>
        </sbb-radio-button-group>
        <sbb-divider style="margin-block: var(--sbb-spacing-responsive-xxs)" />
        <span style="color: var(--sbb-color-granite-default)">
          <div style="display: flex; align-items: center; gap: var(--sbb-spacing-fixed-1x)">
            1 x 0 x Sparbillett, Halbtax{' '}
            <sbb-tooltip-trigger id="tooltip-trigger-1" icon-name="circle-information-small" />
          </div>
          <div>Gültig: Do., 03.11.2022 bis Fr., 04.11.2022 05:00</div>
        </span>
        <sbb-tooltip trigger="tooltip-trigger-1" hover-trigger>
          <span id="tooltip-content" class="sbb-text-s">
            Simple info tooltip.
          </span>
        </sbb-tooltip>
      </div>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox disabled={disabledInput}>
        City Angebot
        {suffixAndSubtext()}
      </sbb-checkbox>
      <div slot="content">
        <sbb-checkbox-group orientation="vertical">
          <sbb-checkbox value="option-1" style="width: 100%">
            Option one
            <span
              slot="suffix"
              style="margin-inline-start: auto; color: var(--sbb-color-granite-default)"
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">CHF</span> 0.00
                </span>
              </span>
            </span>
          </sbb-checkbox>
          <sbb-checkbox value="option-2" style="width: 100%">
            Option two
            <span
              slot="suffix"
              style="margin-inline-start: auto; color: var(--sbb-color-granite-default)"
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">+ CHF</span> 5.00
                </span>
              </span>
            </span>
          </sbb-checkbox>
        </sbb-checkbox-group>
        <sbb-divider style="margin-block: var(--sbb-spacing-responsive-xxs)" />
        <span style="color: var(--sbb-color-granite-default)">
          <div style="display: flex; align-items: center; gap: var(--sbb-spacing-fixed-1x)">
            1 x 0 x City-Ticket inkl. City-Zuschlag Stadt, Halbtax{' '}
            <sbb-tooltip-trigger id="tooltip-trigger-2" icon-name="circle-information-small" />
          </div>
          <div>Gültig: Do., 03.11.2022 bis Fr., 04.11.2022 05:00</div>
        </span>
        <sbb-tooltip trigger="tooltip-trigger-2" hover-trigger>
          <span id="tooltip-content" class="sbb-text-s">
            Simple info tooltip.
          </span>
        </sbb-tooltip>
      </div>
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

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

export const WithCheckboxGroupForceOpen = WithCheckboxGroupTemplate.bind({});
WithCheckboxGroupForceOpen.argTypes = basicArgTypes;
WithCheckboxGroupForceOpen.args = {
  ...basicArgs,
  'force-open': true,
  checkedInput: true,
  disabledInput: true,
};

export const WithRadioButonGroupForceOpen = WithRadioButtonGroupTemplate.bind({});
WithRadioButonGroupForceOpen.argTypes = basicArgTypes;
WithRadioButonGroupForceOpen.args = {
  ...basicArgs,
  'force-open': true,
  checkedInput: true,
  disabledInput: true,
};

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

export const TicketsOptionsExample = TicketsOptionsExampleTemplate.bind({});
TicketsOptionsExample.argTypes = basicArgTypes;
TicketsOptionsExample.args = { ...basicArgs, checkedInput: true };

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
