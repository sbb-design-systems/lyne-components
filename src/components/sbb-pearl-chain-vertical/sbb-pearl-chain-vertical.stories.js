import { h } from 'jsx-dom';

const Template = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args} disable-animation={true}>
        <div slot="right" style={{ marginTop: '-10px' }}>
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateWithoutContent = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={args}
        disable-animation={false}
      ></sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};
const TemplateLeftSlot = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right">slot for content</div>
        <div slot="left">slot for content</div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateTwoDots = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right" style={{ marginTop: '-10px' }}>
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'red',
          dotType: 'standard',
          dotColor: 'red',
          minHeight: '100px',
          hideLine: true,
          dotSize: 'medium',
          position: 0,
        }}
      >
        <div slot="right" style={{ marginTop: '-10px' }}>
          Test
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateLeftSecondSlot = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right" style={{ marginTop: '-8px' }}>
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
        <div slot="left" style={{ marginTop: '-8px' }}>
          19:00
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'red',
          dotType: 'standard',
          dotColor: 'red',
          minHeight: '100px',
          hideLine: true,
          dotSize: 'medium',
          position: 0,
        }}
      >
        <div slot="left" style={{ marginTop: '-10px' }}>
          20:00
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

export const defaultPearlChainWithoutContent = TemplateWithoutContent.bind({});
export const defaultPearlChain = Template.bind({});
export const defaultPearlChainLeftSlot = TemplateLeftSlot.bind({});
export const defaultPearlChainTwoDots = TemplateTwoDots.bind({});
export const defaultPearlChainLeftSecondSlot = TemplateLeftSecondSlot.bind({});

defaultPearlChainWithoutContent.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 50,
};

defaultPearlChainLeftSecondSlot.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

defaultPearlChain.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

defaultPearlChainLeftSlot.args = {
  lineType: 'standard',
  lineColor: 'red',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

defaultPearlChainTwoDots.args = {
  lineType: 'standard',
  lineColor: 'red',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

export const blackPearlChain = Template.bind({});

blackPearlChain.args = {
  lineType: 'standard',
  dotType: 'thick-bullet',
  dotColor: 'black',
  lineColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

export const dottedPearlChain = Template.bind({});

dottedPearlChain.args = {
  lineType: 'dotted',
  dotType: 'thin-bullet',
  dotColor: 'red',
  minHeight: '100',
  hideLine: false,
  lineColor: 'red',
  dotSize: 'small',
  position: 0,
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {},
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
  title: 'components/sbb-pearl-chain-vertical (Unfinished)',
};
