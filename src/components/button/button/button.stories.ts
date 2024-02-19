import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import {
  buttonCommonDefaultArgs,
  buttonCommonDefaultArgTypes,
  fixedWidth,
  focusStyle,
  iconOnly,
  iconOnlyDisabled,
  loadingIndicator,
  noIcon,
  primary,
  primaryActive,
  primaryDisabled,
  primaryFocusVisible,
  primaryNegative,
  primaryNegativeActive,
  primaryNegativeDisabled,
  secondary,
  secondaryActive,
  secondaryDisabled,
  secondaryNegative,
  secondaryNegativeActive,
  secondaryNegativeDisabled,
  sizeM,
  tertiary,
  tertiaryActive,
  tertiaryDisabled,
  tertiaryNegative,
  tertiaryNegativeActive,
  tertiaryNegativeDisabled,
  transparent,
  transparentActive,
  transparentDisabled,
  transparentNegative,
  transparentNegativeActive,
  transparentNegativeDisabled,
  withSlottedIcon,
  wrapperStyle,
} from '../common/button-common-stories';

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
  ...buttonCommonDefaultArgTypes,
  tag,
  type,
  disabled,
  name,
  value,
  form,
};

const defaultArgs: Args = {
  ...buttonCommonDefaultArgs,
  tag: 'sbb-button',
  type: type.options[0],
  disabled: false,
  name: 'Button Name',
  value: undefined,
  form: undefined,
};

export const Primary: StoryObj = primary;
export const Secondary: StoryObj = secondary;
export const Tertiary: StoryObj = tertiary;
export const Transparent: StoryObj = transparent;
export const PrimaryNegative: StoryObj = primaryNegative;
export const SecondaryNegative: StoryObj = secondaryNegative;
export const TertiaryNegative: StoryObj = tertiaryNegative;
export const TransparentNegative: StoryObj = transparentNegative;
export const IconOnly: StoryObj = iconOnly;
export const PrimaryDisabled: StoryObj = primaryDisabled;
export const SecondaryDisabled: StoryObj = secondaryDisabled;
export const TertiaryDisabled: StoryObj = tertiaryDisabled;
export const TransparentDisabled: StoryObj = transparentDisabled;
export const PrimaryNegativeDisabled: StoryObj = primaryNegativeDisabled;
export const SecondaryNegativeDisabled: StoryObj = secondaryNegativeDisabled;
export const TertiaryNegativeDisabled: StoryObj = tertiaryNegativeDisabled;
export const TransparentNegativeDisabled: StoryObj = transparentNegativeDisabled;
export const IconOnlyDisabled: StoryObj = iconOnlyDisabled;
export const NoIcon: StoryObj = noIcon;
export const SizeM: StoryObj = sizeM;
export const FixedWidth: StoryObj = fixedWidth;
export const WithSlottedIcon: StoryObj = withSlottedIcon;
export const PrimaryActive: StoryObj = primaryActive;
export const SecondaryActive: StoryObj = secondaryActive;
export const TertiaryActive: StoryObj = tertiaryActive;
export const TransparentActive: StoryObj = transparentActive;
export const PrimaryNegativeActive: StoryObj = primaryNegativeActive;
export const SecondaryNegativeActive: StoryObj = secondaryNegativeActive;
export const TertiaryNegativeActive: StoryObj = tertiaryNegativeActive;
export const TransparentNegativeActive: StoryObj = transparentNegativeActive;
export const PrimaryFocusVisible: StoryObj = primaryFocusVisible;
export const LoadingIndicator: StoryObj = loadingIndicator;

export const RequestSubmit: StoryObj = {
  render: RequestSubmitTemplate,
  args: {
    variant: defaultArgTypes.variant.options[0],
    text: 'Submit form',
  },
};

const meta: Meta = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  excludeStories: /.*(Active|FocusVisible)$/,
  decorators: [
    (story, context) => html`
      <div
        style=${styleMap({
          ...wrapperStyle(context),
          ...focusStyle(context),
          padding: '2rem',
        })}
      >
        ${story()}
      </div>
    `,
    withActions as Decorator,
  ],
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
  title: 'components/sbb-button/sbb-button',
};

export default meta;
