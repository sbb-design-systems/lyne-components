import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import '../../form-field';
import './mini-button';
import { buttonDefaultArgs, buttonDefaultArgTypes } from '../common/button-common-stories';
import {
  MiniButtonCommonTemplate,
  miniButtonDecorators,
  MiniButtonSlottedIconCommonTemplate,
} from '../common/mini-button-common-stories';

import readme from './readme.md?raw';

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const slot: InputType = {
  control: {
    type: 'select',
  },
  options: ['prefix', 'suffix'],
};

const miniButtonDefaultArgTypes: ArgTypes = {
  ...buttonDefaultArgTypes,
  slot,
  tag,
};

const miniButtonDefaultArgs: Args = {
  ...buttonDefaultArgs,
  'icon-name': 'pen-small',
  tag: 'sbb-mini-button',
};

delete miniButtonDefaultArgTypes.text;
delete miniButtonDefaultArgs.text;

export const Prefix: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[0] },
};

export const PrefixNegative: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[0], negative: true },
};

export const PrefixDisabled: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[0], disabled: true },
};

export const PrefixSlottedIcon: StoryObj = {
  render: MiniButtonSlottedIconCommonTemplate,
  args: { slot: slot.options[0] },
};

export const Suffix: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[1] },
};

export const SuffixNegative: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[1], negative: true },
};

export const SuffixDisabled: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[1], disabled: true },
};

export const SuffixSlottedIcon: StoryObj = {
  render: MiniButtonSlottedIconCommonTemplate,
  args: { slot: slot.options[1] },
};

const meta: Meta = {
  argTypes: miniButtonDefaultArgTypes,
  args: miniButtonDefaultArgs,
  decorators: miniButtonDecorators,
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-button/sbb-mini-button',
};

export default meta;
