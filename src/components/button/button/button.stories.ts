import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import * as ButtonCommon from '../common/button-common-stories';

import readme from './readme.md?raw';
import '../../loading-indicator';
import './button';

const RequestSubmitTemplate = ({ text }: Args): TemplateResult => html`
  <form id="my-fake-form" action="/submit" method="post" target="_blank">
    <label
      for="input"
      style="display: flex; flex-direction: column; align-items: flex-start; padding-block-end: 2rem;"
    >
      Input required; submit with empty value is impossible due to 'requestSubmit' API validation.
      <input required id="input" />
    </label>
    <sbb-button type="submit" form="my-fake-form" name="input" value="input"> ${text} </sbb-button>
  </form>
`;

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
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

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const defaultArgTypes: ArgTypes = {
  ...ButtonCommon.defaultArgTypes,
  tag,
  type,
  disabled,
  name,
  value,
  form,
};

const defaultArgs: Args = {
  ...ButtonCommon.defaultArgs,
  tag: 'sbb-button',
  type: type.options[0],
  disabled: false,
  name: 'Button Name',
  value: undefined,
  form: undefined,
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

export const RequestSubmit: StoryObj = {
  render: RequestSubmitTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: ButtonCommon.defaultArgTypes.variant.options[0],
    text: 'Submit form',
  },
};

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
  title: 'components/sbb-button',
};

export default meta;
