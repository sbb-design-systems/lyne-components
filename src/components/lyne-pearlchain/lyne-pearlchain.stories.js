import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-pearlchain.sample-data';

const Template = ({
  legs,
  cancelPart,
  ...args
}) => {
  const newLegsData = legs;

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

NoStops.args = {
  legs: sampleData.stop0
};

Stop1.args = {
  legs: sampleData.stop1
};

Stops2.args = {
  legs: sampleData.stop2
};

Stops3.args = {
  legs: sampleData.stop3
};

Stops4.args = {
  legs: sampleData.stop4
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
  legs: {
    table: {
      disable: true
    }
  }
};

Stops9.args = {
  legs: sampleData.stop9
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
