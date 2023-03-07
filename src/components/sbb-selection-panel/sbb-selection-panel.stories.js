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

const disableInput = {
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
  disableInput,
};

const basicArgs = {
  color: color.options[0],
  'force-open': false,
  'disable-animation': isChromatic(),
  disableInput: false,
};

const WithCheckboxTemplate = ({ disableInput, ...args }) => (
  <sbb-selection-panel {...args}>
    <sbb-card-badge slot="badge">
      <div slot="generic">
        <span>%</span>
      </div>
    </sbb-card-badge>
    <sbb-checkbox checked disabled={disableInput}>
      Value one
    </sbb-checkbox>
    <div slot="content">
      Inner Content{' '}
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
  </sbb-selection-panel>
);

const WithRadioButtonTemplate = ({ disableInput, ...args }) => (
  <sbb-selection-panel {...args}>
    <sbb-card-badge slot="badge">
      <div slot="generic">
        <span>%</span>
      </div>
    </sbb-card-badge>
    <sbb-radio-button value="Value one" disabled={disableInput}>
      Value one
    </sbb-radio-button>
    <div slot="content">
      Inner Content{' '}
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
  </sbb-selection-panel>
);

const WithCheckboxGroupTemplate = ({ disableInput, ...args }) => (
  <sbb-checkbox-group orientation="vertical" horizontal-from="small">
    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>%</span>
        </div>
      </sbb-card-badge>
      <sbb-checkbox checked>Value one</sbb-checkbox>
      <div slot="content">
        Inner Content{' '}
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
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>%</span>
        </div>
      </sbb-card-badge>
      <sbb-checkbox disabled={disableInput}>Value two</sbb-checkbox>
      <div slot="content">
        Inner Content{' '}
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
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>%</span>
        </div>
      </sbb-card-badge>
      <sbb-checkbox>Value three</sbb-checkbox>
      <div slot="content">
        Inner Content{' '}
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
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

const WithRadioButtonGroupTemplate = ({ disableInput, ...args }) => (
  <sbb-radio-button-group orientation="vertical" horizontal-from="small">
    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>%</span>
        </div>
      </sbb-card-badge>
      <sbb-radio-button value="Value one" checked>
        Value one
      </sbb-radio-button>
      <div slot="content">
        Inner Content{' '}
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
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>%</span>
        </div>
      </sbb-card-badge>
      <sbb-radio-button value="Value two" disabled={disableInput}>
        Value two
      </sbb-radio-button>
      <div slot="content">
        Inner Content{' '}
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
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-card-badge slot="badge">
        <div slot="generic">
          <span>%</span>
        </div>
      </sbb-card-badge>
      <sbb-radio-button value="Value three">Value three</sbb-radio-button>
      <div slot="content">
        Inner Content{' '}
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

export const WithCheckboxGroup = WithCheckboxGroupTemplate.bind({});
WithCheckboxGroup.argTypes = basicArgTypes;
WithCheckboxGroup.args = { ...basicArgs };

export const WithRadioButonGroup = WithRadioButtonGroupTemplate.bind({});
WithRadioButonGroup.argTypes = basicArgTypes;
WithRadioButonGroup.args = { ...basicArgs };

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
