import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';

const Template = (args) => (
  <lyne-clock
    paused={args.paused}
    initial-time={args.initialTime}
  />
);

export const clock = Template.bind({});

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

clock.argTypes = {
  initialTime: times
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  clock.args = {
    initialTime: '09:43:59',
    paused: true
  };
} else {
  clock.args = {
    initialTime: times.options[0],
    paused: state.paused
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
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Brand Elements/Clock'
};
