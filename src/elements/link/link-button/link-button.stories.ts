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
  inline,
  inlineNegative,
  linkButtonDefaultArgs,
  linkButtonDefaultArgTypes,
} from '../common/link-common-stories.private.js';

import readme from './readme.md?raw';
import './link-button.component.js';

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
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-link/sbb-link-button',
};

export default meta;
