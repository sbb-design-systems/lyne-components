import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import * as LinkCommon from '../common/link-common-stories';

import readme from './readme.md?raw';
import './link';

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/lyne-design-system/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const defaultArgTypes: ArgTypes = {
  ...LinkCommon.defaultArgTypes,
  tag,
  href,
  target,
  rel,
  download,
  disabled,
};

const defaultArgs: Args = {
  ...LinkCommon.defaultArgs,
  tag: 'sbb-link',
  href: href.options[1],
  target: '_blank',
  rel: undefined,
  download: false,
  disabled: false,
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
  title: 'components/sbb-link',
};

export default meta;
