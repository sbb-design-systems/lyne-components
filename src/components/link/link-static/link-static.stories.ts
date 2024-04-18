import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';

import {
  backgroundColor,
  inline,
  inlineNegative,
  linkCommonDefaultArgs,
  linkCommonDefaultArgTypes,
} from '../common/link-common-stories.js';

import readme from './readme.md?raw';
import './link-static.js';

const defaultArgTypes: ArgTypes = {
  ...linkCommonDefaultArgTypes,
};

const defaultArgs: Args = {
  ...linkCommonDefaultArgs,
  tag: 'sbb-link-static',
};

export const Inline: StoryObj = inline;
export const InlineNegative: StoryObj = inlineNegative;

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
  title: 'components/sbb-link/sbb-link-static',
};

export default meta;
