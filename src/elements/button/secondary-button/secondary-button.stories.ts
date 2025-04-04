import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components';

import {
  buttonDefaultArgs,
  buttonDefaultArgTypes,
  requestSubmit,
} from '../common/button-common-stories.private.js';
import {
  commonDecorators,
  fixedWidth,
  iconOnly,
  iconOnlyDisabled,
  iconOnlyNegative,
  loadingIndicator,
  noIcon,
  primary,
  primaryDisabled,
  primaryNegative,
  primaryNegativeDisabled,
  sizeM,
  sizeS,
  withHiddenSlottedIcon,
  withSlottedIcon,
} from '../common/common-stories.private.js';

import readme from './readme.md?raw';
import './secondary-button.js';

const defaultArgTypes: ArgTypes = { ...buttonDefaultArgTypes };

const defaultArgs: Args = {
  ...buttonDefaultArgs,
  tag: 'sbb-secondary-button',
};

export const Default: StoryObj = primary;
export const Negative: StoryObj = primaryNegative;
export const Disabled: StoryObj = primaryDisabled;
export const NegativeDisabled: StoryObj = primaryNegativeDisabled;
export const IconOnly: StoryObj = iconOnly;
export const IconOnlyNegative: StoryObj = iconOnlyNegative;
export const IconOnlyDisabled: StoryObj = iconOnlyDisabled;
export const NoIcon: StoryObj = noIcon;
export const SizeM: StoryObj = sizeM;
export const SizeS: StoryObj = sizeS;
export const FixedWidth: StoryObj = fixedWidth;
export const WithSlottedIcon: StoryObj = withSlottedIcon;
export const LoadingIndicator: StoryObj = loadingIndicator;
export const RequestSubmit: StoryObj = requestSubmit;

export const WithHiddenSlottedIcon: StoryObj = withHiddenSlottedIcon;

const meta: Meta = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  decorators: commonDecorators,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-anthracite)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-button/sbb-secondary-button',
};

export default meta;
