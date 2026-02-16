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
  linkCommonDefaultArgs,
  linkCommonDefaultArgTypes,
} from '../common/link-common-stories.private.ts';

import readme from './readme.md?raw';
import './link-static.component.ts';

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
  title: 'elements/sbb-link/sbb-link-static',
};

export default meta;
