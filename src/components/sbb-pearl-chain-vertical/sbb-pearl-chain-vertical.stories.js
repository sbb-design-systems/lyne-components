import { h } from 'jsx-dom';
import {
  ColorEnum,
  DotTypeEnum,
  LineTypeEnum,
} from './sbb-pearl-chain-item/sbb-pearl-chain-item.custom.s';

// import isChromatic from 'chromatic/isChromatic';

const Template = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right">content slot</div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: LineTypeEnum.dotted,
          dotType: DotTypeEnum.thickBullet,
          dotColor: ColorEnum.red,
          minHeight: '100px',
          hideLine: false,
        }}
      >
        <div slot="right">content slot</div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: LineTypeEnum.dotted,
          dotType: DotTypeEnum.thickBullet,
          dotColor: ColorEnum.red,
          minHeight: '100px',
          hideLine: true,
        }}
      ></sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

export const defaultPearlChain = Template.bind({});

defaultPearlChain.args = {
  lineType: LineTypeEnum.standard,
  lineColor: ColorEnum.red,
  dotType: DotTypeEnum.standard,
  dotColor: ColorEnum.red,
  minHeight: '100px',
  hideLine: false,
};

export default {
  decorators: [(Story) => <Story />],
  parameters: {},
  title: 'components/sbb-pearl-chain-vertical (Unfinished)',
};
