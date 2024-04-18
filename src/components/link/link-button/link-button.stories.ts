import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';

import {
  backgroundColor,
  inline,
  inlineNegative,
  linkButtonDefaultArgs,
  linkButtonDefaultArgTypes,
} from '../common/link-common-stories.js';

import readme from './readme.md?raw';
import './link-button.js';

const defaultArgTypes: ArgTypes = {
  ...linkButtonDefaultArgTypes,
};

const defaultArgs: Args = {
  ...linkButtonDefaultArgs,
  tag: 'sbb-link-button',
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
  title: 'components/sbb-link/sbb-link-button',
};

export default meta;
