/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const Template = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes={args}>
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
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

export const pearlChainItem: StoryObj = {
  render: Template,
  args: {
  lineType: 'standard',
  lineColor: 'default',
  bulletType: 'default',
  minHeight: '100',
  hideLine: false,
  bulletSize: 'start-end',
},
};



const meta: Meta =  {
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

export default meta;
