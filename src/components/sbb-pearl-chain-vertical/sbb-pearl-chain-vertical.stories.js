import { h } from 'jsx-dom';

// import isChromatic from 'chromatic/isChromatic';

const Template = (args) => {
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
    </sbb-pearl-chain-vertical>
  );
};

const TemplateWithoutContent = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}></sbb-pearl-chain-item>
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
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChainLeftSecondSlot.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChain.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChainLeftSlot.args = {
  lineType: 'standard',
  lineColor: 'red',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChainTwoDots.args = {
  lineType: 'standard',
  lineColor: 'red',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100px',
  hideLine: false,
};

export const blackPearlChain = Template.bind({});

blackPearlChain.args = {
  lineType: 'standard',
  dotType: 'thickBullet',
  dotColor: 'black',
  lineColor: 'black',
  minHeight: '100px',
  hideLine: false,
};

export const dottedPearlChain = Template.bind({});

dottedPearlChain.args = {
  lineType: 'dotted',
  dotType: 'thinBullet',
  dotColor: 'red',
  minHeight: '100px',
  hideLine: false,
  lineColor: 'red',
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
      options: ['black', 'red', 'gray'],
      control: { type: 'radio' },
    },
    dotType: {
      options: ['standard', 'thin-bullet', 'thick-bullet'],
      control: { type: 'radio' },
    },
    dotColor: {
      options: ['black', 'red', 'gray'],
      control: { type: 'radio' },
    },
  },
  title: 'components/sbb-pearl-chain-vertical (Unfinished)',
};
