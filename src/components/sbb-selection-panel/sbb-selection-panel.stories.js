import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-selection-panel {...args}>
    <sbb-card-badge slot="badge">
      <div slot="generic">
        <span>
          <time datetime="2021-11-25">Black Friday</time> Special
        </span>
      </div>
    </sbb-card-badge>

    {/* <sbb-radio-button>
      Value
      <span slot="subtext">Subtext</span>
      <span slot="suffix">
         <sbb-icon/>
         <span class="sbb-text-xs sbb-text--bold">CHF</span>
         <span class="sbb-text-m sbb-text--bold">40.00</span>
       </span>
    </sbb-radio-button> */}

    <sbb-checkbox>Value</sbb-checkbox>
    <div slot="content">Inner Content</div>
  </sbb-selection-panel>
);

export const story1 = Template.bind({});

story1.args = {
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
