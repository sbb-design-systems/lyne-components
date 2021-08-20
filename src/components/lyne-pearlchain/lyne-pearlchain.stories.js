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

export const FutureConnection = () => (
  <lyne-pearlchain
    legs={JSON.stringify(legsData5)}
  />
);

export const PastConnection = () => (
  <lyne-pearlchain
    legs={JSON.stringify(legsData5)}
    status='past'
  />
);

export const RunningConnection = () => (
  <lyne-pearlchain
    legs={JSON.stringify(legsData5)}
    status='50'
  />
);

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
