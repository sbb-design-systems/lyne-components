import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import '../../form-field';
import './mini-button-link';
import {
  buttonLinkDefaultArgs,
  buttonLinkDefaultArgTypes,
} from '../common/button-link-common-stories';
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

const miniButtonLinkDefaultArgTypes: ArgTypes = {
  ...buttonLinkDefaultArgTypes,
  slot,
  tag,
};

const miniButtonLinkDefaultArgs: Args = {
  ...buttonLinkDefaultArgs,
  'icon-name': 'pen-small',
  tag: 'sbb-mini-button-link',
};

delete miniButtonLinkDefaultArgTypes.text;
delete miniButtonLinkDefaultArgs.text;

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
  argTypes: miniButtonLinkDefaultArgTypes,
  args: miniButtonLinkDefaultArgs,
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
  title: 'components/sbb-button/sbb-mini-button-link',
};

export default meta;
