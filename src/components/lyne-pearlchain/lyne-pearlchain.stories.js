import { h } from 'jsx-dom';
import readme from './readme.md';

const legsData1 = {
  legs: [
    {
      cancellation: false,
      duration: 25
    },
    {
      cancellation: false,
      duration: 75
    }
  ]
};

const legsData2 = {
  legs: [
    {
      cancellation: false,
      duration: 25
    },
    {
      cancellation: false,
      duration: 10
    },
    {
      cancellation: false,
      duration: 65
    }
  ]
};

const legsData3 = {
  legs: [
    {
      cancellation: false,
      duration: 25
    },
    {
      cancellation: false,
      duration: 10
    },
    {
      cancellation: false,
      duration: 50
    },
    {
      cancellation: false,
      duration: 15
    }
  ]
};

const legsData4 = {
  legs: [
    {
      cancellation: false,
      duration: 25
    },
    {
      cancellation: false,
      duration: 10
    },
    {
      cancellation: false,
      duration: 8
    },
    {
      cancellation: false,
      duration: 15
    },
    {
      cancellation: false,
      duration: 42
    }
  ]
};

const legsData5 = {
  legs: [
    {
      cancellation: false,
      duration: 10
    },
    {
      cancellation: false,
      duration: 5
    },
    {
      cancellation: false,
      duration: 5
    },
    {
      cancellation: false,
      duration: 10
    },
    {
      cancellation: false,
      duration: 10
    },
    {
      cancellation: false,
      duration: 5
    },
    {
      cancellation: false,
      duration: 5
    },
    {
      cancellation: false,
      duration: 10
    },
    {
      cancellation: false,
      duration: 15
    },
    {
      cancellation: false,
      duration: 25
    }
  ]
};

const legsData = {
  legsData0: '',
  legsData1: JSON.stringify(legsData1),
  legsData2: JSON.stringify(legsData2),
  legsData3: JSON.stringify(legsData3),
  legsData4: JSON.stringify(legsData4),
  legsData5: JSON.stringify(legsData5)
};

const Template = (args) => (
  <lyne-pearlchain
    {...args}
  />
);

export const FutureConnection = Template.bind({});
export const PastConnection = Template.bind({});
export const RunningConnection = Template.bind({});

const legs = {
  control: {
    labels: {
      legsData0: '0 stops',
      legsData1: '1 stop',
      legsData2: '2 stops',
      legsData3: '3 stops',
      legsData4: '4 stops',
      legsData5: '9 stops'
    },
    type: 'inline-radio'
  },
  mapping: legsData,
  options: Object.keys(legsData)
};

const status = {
  control: {
    max: 100,
    min: 0,
    step: 1,
    type: 'range'
  }
};

const globalArgTypes = {
  legs
};

const globalArgs = {
  legs: 'legsData0'
};

FutureConnection.argTypes = {
  ...globalArgTypes
};

FutureConnection.args = {
  ...globalArgs
};

PastConnection.argTypes = {
  ...globalArgTypes,
  status: {
    table: {
      disable: true
    }
  }
};

PastConnection.args = {
  ...globalArgs,
  status: 'past'
};

RunningConnection.argTypes = {
  ...globalArgTypes,
  status
};

RunningConnection.args = {
  ...globalArgs,
  status: 50
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
