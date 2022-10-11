import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => {
  return (
    <div>
      <sbb-pearl-chain-item pearlChainItemAttributes={args} disable-animation={true}>
        <div slot="right" style={{ marginTop: '-10px' }}>
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
        <div slot="left" style={{ marginTop: '-10px' }}>
          slot for content
        </div>
      </sbb-pearl-chain-item>
    </div>
  );
};

export const pearlChainItem = Template.bind({});

pearlChainItem.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 50,
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  argTypes: {
    lineType: {
      options: ['dotted', 'standard', 'thin'],
      control: { type: 'radio' },
    },
    lineColor: {
      options: ['black', 'red', 'gray', 'sky'],
      control: { type: 'radio' },
    },
    dotType: {
      options: ['standard', 'thin-bullet', 'thick-bullet', 'double-bullet'],
      control: { type: 'radio' },
    },
    dotColor: {
      options: ['black', 'red', 'gray', 'sky'],
      control: { type: 'radio' },
    },
    dotSize: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
  title: 'components/sbb-pearl-chain-item (Unfinished)',
};
