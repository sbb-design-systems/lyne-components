import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes={args}>
        <div
          slot="right"
          style="--sbb-pearl-chain-vertical-right-item-block-start:-10px; --sbb-pearl-chain-vertical-right-item-inline-start:10px"
        >
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
      </sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

export const pearlChainItem = Template.bind({});

pearlChainItem.args = {
  lineType: 'standard',
  lineColor: 'default',
  bulletType: 'default',
  minHeight: '100',
  hideLine: false,
  bulletSize: 'start-end',
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
      control: { type: 'select' },
    },
    lineColor: {
      options: ['default', 'disruption', 'past', 'sky'],
      control: { type: 'select' },
    },
    bulletType: {
      options: ['default', 'disruption', 'past', 'irrelevant', 'skipped'],
      control: { type: 'select' },
    },
    bulletSize: {
      options: ['start-end', 'stop'],
      control: { type: 'select' },
    },
  },
  title: 'components/timetable/sbb-pearl-chain-vertical-item',
};
