import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import * as ButtonCommon from '../common/button-common-stories';

import readme from './readme.md?raw';
import '../../loading-indicator';
import './button-link';

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/lyne-design-system/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
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

const defaultArgTypes: ArgTypes = {
  ...ButtonCommon.defaultArgTypes,
  tag,
  href,
  target,
  rel,
  download,
  disabled,
};

const defaultArgs: Args = {
  ...ButtonCommon.defaultArgs,
  tag: 'sbb-button-link',
  href: href.options[0],
  target: '_blank',
  rel: 'noopener',
  download: false,
  disabled: false,
};

export const Primary: StoryObj = ButtonCommon.primary;
export const Secondary: StoryObj = ButtonCommon.secondary;
export const Tertiary: StoryObj = ButtonCommon.tertiary;
export const Transparent: StoryObj = ButtonCommon.transparent;
export const PrimaryNegative: StoryObj = ButtonCommon.primaryNegative;
export const SecondaryNegative: StoryObj = ButtonCommon.secondaryNegative;
export const TertiaryNegative: StoryObj = ButtonCommon.tertiaryNegative;
export const TransparentNegative: StoryObj = ButtonCommon.transparentNegative;
export const IconOnly: StoryObj = ButtonCommon.iconOnly;
export const PrimaryDisabled: StoryObj = ButtonCommon.primaryDisabled;
export const SecondaryDisabled: StoryObj = ButtonCommon.secondaryDisabled;
export const TertiaryDisabled: StoryObj = ButtonCommon.tertiaryDisabled;
export const TransparentDisabled: StoryObj = ButtonCommon.transparentDisabled;
export const PrimaryNegativeDisabled: StoryObj = ButtonCommon.primaryNegativeDisabled;
export const SecondaryNegativeDisabled: StoryObj = ButtonCommon.secondaryNegativeDisabled;
export const TertiaryNegativeDisabled: StoryObj = ButtonCommon.tertiaryNegativeDisabled;
export const TransparentNegativeDisabled: StoryObj = ButtonCommon.transparentNegativeDisabled;
export const IconOnlyDisabled: StoryObj = ButtonCommon.iconOnlyDisabled;
export const NoIcon: StoryObj = ButtonCommon.noIcon;
export const SizeM: StoryObj = ButtonCommon.sizeM;
export const FixedWidth: StoryObj = ButtonCommon.fixedWidth;
export const WithSlottedIcon: StoryObj = ButtonCommon.withSlottedIcon;
export const PrimaryActive: StoryObj = ButtonCommon.primaryActive;
export const SecondaryActive: StoryObj = ButtonCommon.secondaryActive;
export const TertiaryActive: StoryObj = ButtonCommon.tertiaryActive;
export const TransparentActive: StoryObj = ButtonCommon.transparentActive;
export const PrimaryNegativeActive: StoryObj = ButtonCommon.primaryNegativeActive;
export const SecondaryNegativeActive: StoryObj = ButtonCommon.secondaryNegativeActive;
export const TertiaryNegativeActive: StoryObj = ButtonCommon.tertiaryNegativeActive;
export const TransparentNegativeActive: StoryObj = ButtonCommon.transparentNegativeActive;
export const PrimaryFocusVisible: StoryObj = ButtonCommon.primaryFocusVisible;
export const LoadingIndicator: StoryObj = ButtonCommon.loadingIndicator;

const meta: Meta = {
  ...ButtonCommon.meta,
  args: defaultArgs,
  argTypes: defaultArgTypes,
  parameters: {
    ...ButtonCommon.meta.parameters,
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-button-link',
};

export default meta;
