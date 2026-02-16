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
  linkDefaultArgs,
  linkDefaultArgTypes,
} from '../common/link-common-stories.private.ts';

import readme from './readme.md?raw';
import './link.component.ts';

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
  title: 'elements/sbb-link/sbb-link',
};

export default meta;
