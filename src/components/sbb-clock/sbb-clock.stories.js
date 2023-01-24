import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';

const dataNow = {
  control: {
    type: 'number',
  },
};

const Template = (args) => <sbb-clock {...args} />;

export const Default = Template.bind({});
Default.argTypes = { 'data-now': dataNow };
Default.args = { 'data-now': undefined };
Default.documentation = {
  title: 'Default',
};

export const Paused = Template.bind({});
Paused.argTypes = { 'data-now': dataNow };
Paused.args = { 'data-now': 1677273030000 };
Paused.documentation = {
  title: 'Paused',
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  Default.args = {
    'data-now': new Date('2023-01-24T10:10:30+01:00').valueOf(),
  };
}

export default {
  decorators: [
    (Story) => (
      <div style="max-width: 600px;">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'brand elements/SBB Clock',
};
