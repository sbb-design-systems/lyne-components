import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';

import {
  blockLinkCommonDefaultArgTypes,
  blockLinkCommonDefaultArgs,
  blockFixedWidth,
  blockIconStart,
  blockM,
  blockMIcon,
  blockNegative,
  blockS,
  blockSIcon,
  blockWithSlottedIcon,
  blockXS,
  blockXSIcon,
  linkCommonDefaultArgs,
  linkCommonDefaultArgTypes,
  backgroundColor,
} from '../common/link-common-stories.js';

import readme from './readme.md?raw';
import './block-link-static.js';

const defaultArgTypes: ArgTypes = {
  ...blockLinkCommonDefaultArgTypes,
  ...linkCommonDefaultArgTypes,
};

const defaultArgs: Args = {
  ...blockLinkCommonDefaultArgs,
  ...linkCommonDefaultArgs,
  tag: 'sbb-block-link-static',
};

export const BlockXS: StoryObj = blockXS;
export const BlockS: StoryObj = blockS;
export const BlockM: StoryObj = blockM;
export const BlockXSIcon: StoryObj = blockXSIcon;
export const BlockSIcon: StoryObj = blockSIcon;
export const BlockMIcon: StoryObj = blockMIcon;
export const BlockIconStart: StoryObj = blockIconStart;
export const BlockNegative: StoryObj = blockNegative;
export const BlockWithSlottedIcon: StoryObj = blockWithSlottedIcon;
export const BlockFixedWidth: StoryObj = blockFixedWidth;

const meta: Meta = {
  argTypes: defaultArgTypes,
  args: defaultArgs,
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor,
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link/sbb-block-link-static',
};

export default meta;
