import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';

const Template = (args) => (
  <lyne-sbb-clock {...args} />
);

export const SBBClock = Template.bind({});

const state = {
  paused: false
};

const times = {
  control: {
    type: 'select'
  },
  options: [
    'now',
    '01:59:27',
    '05:39:12',
    '09:48:13',
    '11:59:13',
    '13:30:41',
    '16:50:00',
    '20:03:21',
    '23:59:39'
  ]
};

SBBClock.argTypes = {
  'initial-time': times
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  SBBClock.args = {
    'initial-time': '09:43:59',
    'paused': true
  };
} else {
  SBBClock.args = {
    'initial-time': times.options[0],
    'paused': state.paused
  };
}

export default {
  decorators: [
    (Story) => (
      <div style='max-width: 600px;'>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Brand Elements/SBB Clock'
};
