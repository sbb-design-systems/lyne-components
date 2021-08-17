import { h } from 'jsx-dom';
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
    '10:59:13',
    '13:24:41',
    '16:47:23',
    '20:03:21',
    '23:59:39'
  ]
};

clock.argTypes = {
  initialTime: times
};

clock.args = {
  initialTime: times.options[0],
  paused: state.paused
};

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
