import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import * as LinkCommon from '../common/link-common-stories';

import readme from './readme.md?raw';
import './link-button';

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
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

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const defaultArgTypes: ArgTypes = {
  ...LinkCommon.defaultArgTypes,
  tag,
  type,
  disabled,
  name,
  value,
  form,
};

const defaultArgs: Args = {
  ...LinkCommon.defaultArgs,
  tag: 'sbb-link-button',
  type: type.options[0],
  disabled: false,
  name: 'Button name',
  value: undefined,
  form: undefined,
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
  title: 'components/sbb-link-button',
};

export default meta;
