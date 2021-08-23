import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';
import readme from './readme.md';
import sampleData from './lyne-pearlchain.sample-data';

const Template = ({
  legs,
  cancelPart,
  ...args
}) => {

  const newLegsData = JSON.parse(JSON.stringify(legs));

  newLegsData.legs.forEach((leg, index) => {
    if (cancelPart) {
      leg.cancellation = cancelPart.indexOf(index + 1) !== -1;
    } else {
      leg.cancellation = false;
    }
  });

  return (
    <lyne-pearlchain
      legs={JSON.stringify(newLegsData)}
      disableAnimation={isChromatic}
      {...args}
    />
  );
};

export const NoStops = Template.bind({});
export const Stop1 = Template.bind({});
export const Stops2 = Template.bind({});
export const Stops3 = Template.bind({});
export const Stops4 = Template.bind({});
export const Stops9 = Template.bind({});

const status = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'past',
    '0',
    '25',
    '33',
    '50',
    '66',
    '75',
    '100',
    'future'
  ]
};

const legs = {
  table: {
    disable: true
  }
};

NoStops.argTypes = {
  cancelPart: {
    control: {
      type: 'inline-check'
    },
    options: [1]
  },
  legs,
  status
};

NoStops.args = {
  legs: sampleData.stop0,
  status: 'future'
};

Stop1.argTypes = {
  cancelPart: {
    control: {
      type: 'inline-check'
    },
    options: [
      1,
      2
    ]
  },
  legs,
  status
};

Stop1.args = {
  legs: sampleData.stop1,
  status: 'past'
};

Stops2.argTypes = {
  cancelPart: {
    control: {
      type: 'inline-check'
    },
    options: [
      1,
      2,
      3
    ]
  },
  legs,
  status
};

Stops2.args = {
  legs: sampleData.stop2,
  status: '50'
};

Stops3.argTypes = {
  cancelPart: {
    control: {
      type: 'inline-check'
    },
    options: [
      1,
      2,
      3,
      4
    ]
  },
  legs,
  status
};

Stops3.args = {
  legs: sampleData.stop3,
  status: 'future'
};

Stops4.argTypes = {
  cancelPart: {
    control: {
      type: 'inline-check'
    },
    options: [
      1,
      2,
      3,
      4,
      5
    ]
  },
  legs,
  status
};

Stops4.args = {
  legs: sampleData.stop4,
  status: 'past'
};

Stops9.argTypes = {
  cancelPart: {
    control: {
      type: 'inline-check'
    },
    options: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ]
  },
  legs,
  status
};

Stops9.args = {
  legs: sampleData.stop9,
  status: '66'
};

export default {
  decorators: [
    (Story) => (
      <div style={'max-width: 20rem;'}>
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
  title: 'lyne-pearlchain'
};

