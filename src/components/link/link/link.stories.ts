import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';

import {
  backgroundColor,
  inline,
  inlineNegative,
  linkDefaultArgs,
  linkDefaultArgTypes,
} from '../common/link-common-stories.js';

import readme from './readme.md?raw';
import './link.js';

const defaultArgTypes: ArgTypes = {
  ...linkDefaultArgTypes,
};

const defaultArgs: Args = {
  ...linkDefaultArgs,
  tag: 'sbb-link',
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
  title: 'components/sbb-link/sbb-link',
};

export default meta;
