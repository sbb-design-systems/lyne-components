import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';

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
  linkButtonDefaultArgs,
  linkButtonDefaultArgTypes,
} from '../common/link-common-stories.private.ts';

import readme from './readme.md?raw';
import './block-link-button.component.ts';

const defaultArgTypes: ArgTypes = {
  ...blockLinkCommonDefaultArgTypes,
  ...linkButtonDefaultArgTypes,
};

const defaultArgs: Args = {
  ...blockLinkCommonDefaultArgs,
  ...linkButtonDefaultArgs,
  tag: 'sbb-block-link-button',
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
      context.args.negative
        ? 'var(--sbb-background-color-2-negative)'
        : 'var(--sbb-background-color-2)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-link/sbb-block-link-button',
};

export default meta;
