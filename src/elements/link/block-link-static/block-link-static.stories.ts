import { withActions } from '@storybook/addon-actions/decorator';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';

import {
  blockFixedWidth,
  blockIconStart,
  blockLinkCommonDefaultArgs,
  blockLinkCommonDefaultArgTypes,
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
} from '../common/link-common-stories.private.js';

import readme from './readme.md?raw';
import './block-link-static.component.js';

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
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-link/sbb-block-link-static',
};

export default meta;
