import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateCheckboxGroup = (args) => (
  <sbb-checkbox-group>
    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>Panel badge</span>
        </div>
      </sbb-card-badge>
      <sbb-checkbox>Value</sbb-checkbox>
      <div slot="content">Inner Content</div>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>Panel badge</span>
        </div>
      </sbb-card-badge>
      <sbb-checkbox>Value</sbb-checkbox>
      <div slot="content">Inner Content</div>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>Panel badge</span>
        </div>
      </sbb-card-badge>
      <sbb-checkbox>Value</sbb-checkbox>
      <div slot="content">Inner Content</div>
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

const TemplateRadioButtonGroup = (args) => (
  <sbb-radio-button-group>
    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>Panel badge</span>
        </div>
      </sbb-card-badge>
      <sbb-radio-button value="Value one">Value one</sbb-radio-button>
      <div slot="content">Inner Content</div>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>Panel badge</span>
        </div>
      </sbb-card-badge>
      <sbb-radio-button value="Value two">Value two</sbb-radio-button>
      <div slot="content">Inner Content</div>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>Panel badge</span>
        </div>
      </sbb-card-badge>
      <sbb-radio-button value="Value three">Value three</sbb-radio-button>
      <div slot="content">Inner Content</div>
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

export const withCheckboxGroup = TemplateCheckboxGroup.bind({});
export const withRadioButonGroup = TemplateRadioButtonGroup.bind({});

withCheckboxGroup.args = {
  'some-prop': 'opt1',
};

withRadioButonGroup.args = {
  'some-prop': 'opt1',
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
      // handles: [events.click],
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
