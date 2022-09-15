import { h } from 'jsx-dom';
import {
  ColorEnum,
  DotTypeEnum,
  LineTypeEnum,
} from './sbb-pearl-chain-item/sbb-pearl-chain-item.custom.d';

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
          lineType: LineTypeEnum.standard,
          lineColor: ColorEnum.red,
          dotType: DotTypeEnum.standard,
          dotColor: ColorEnum.red,
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
          lineType: LineTypeEnum.standard,
          lineColor: ColorEnum.red,
          dotType: DotTypeEnum.standard,
          dotColor: ColorEnum.red,
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
  lineType: LineTypeEnum.standard,
  lineColor: ColorEnum.black,
  dotType: DotTypeEnum.standard,
  dotColor: ColorEnum.black,
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChainLeftSecondSlot.args = {
  lineType: LineTypeEnum.standard,
  lineColor: ColorEnum.black,
  dotType: DotTypeEnum.standard,
  dotColor: ColorEnum.black,
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChain.args = {
  lineType: LineTypeEnum.standard,
  lineColor: ColorEnum.black,
  dotType: DotTypeEnum.standard,
  dotColor: ColorEnum.black,
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChainLeftSlot.args = {
  lineType: LineTypeEnum.standard,
  lineColor: ColorEnum.red,
  dotType: DotTypeEnum.standard,
  dotColor: ColorEnum.red,
  minHeight: '100px',
  hideLine: false,
};

defaultPearlChainTwoDots.args = {
  lineType: LineTypeEnum.standard,
  lineColor: ColorEnum.red,
  dotType: DotTypeEnum.standard,
  dotColor: ColorEnum.red,
  minHeight: '100px',
  hideLine: false,
};

export const blackPearlChain = Template.bind({});

blackPearlChain.args = {
  lineType: LineTypeEnum.standard,
  dotType: DotTypeEnum.thickBullet,
  dotColor: ColorEnum.black,
  lineColor: ColorEnum.black,
  minHeight: '100px',
  hideLine: false,
};

export const dottedPearlChain = Template.bind({});

dottedPearlChain.args = {
  lineType: LineTypeEnum.dotted,
  dotType: DotTypeEnum.thinBullet,
  dotColor: ColorEnum.red,
  minHeight: '100px',
  hideLine: false,
  lineColor: ColorEnum.red,
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
