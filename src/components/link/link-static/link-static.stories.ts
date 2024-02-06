import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import * as LinkCommon from '../common/link-common-stories';

import readme from './readme.md?raw';
import './link-static';

const defaultArgTypes: ArgTypes = {
  ...LinkCommon.defaultArgTypes,
};

const defaultArgs: Args = {
  ...LinkCommon.defaultArgs,
};

export const BlockXS: StoryObj = LinkCommon.blockXS;
export const BlockS: StoryObj = LinkCommon.blockS;
export const BlockM: StoryObj = LinkCommon.blockM;
export const BlockXSIcon: StoryObj = LinkCommon.blockXSIcon;
export const BlockSIcon: StoryObj = LinkCommon.blockSIcon;
export const BlockMIcon: StoryObj = LinkCommon.blockMIcon;
export const BlockIconStart: StoryObj = LinkCommon.blockIconStart;
export const BlockNegative: StoryObj = LinkCommon.blockNegative;
export const BlockWithSlottedIcon: StoryObj = LinkCommon.blockWithSlottedIcon;
export const BlockFixedWidth: StoryObj = LinkCommon.blockFixedWidth;
export const Inline: StoryObj = LinkCommon.inline;
export const InlineNegative: StoryObj = LinkCommon.inlineNegative;

const meta: Meta = {
  ...LinkCommon.meta,
  argTypes: defaultArgTypes,
  args: defaultArgs,
  parameters: {
    ...LinkCommon.meta.parameters,
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link-static',
};

export default meta;
