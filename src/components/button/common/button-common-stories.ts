import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, StoryContext, StoryObj } from '@storybook/web-components';
import isChromatic from 'chromatic';
import { type TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../core/dom';

export const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative ? '#484040' : 'var(--sbb-color-white)',
});

export const focusStyle = (context: StoryContext): Record<string, string> =>
  context.args.negative
    ? { '--sbb-focus-outline-color': 'var(--sbb-focus-outline-color-dark)' }
    : {};

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
const Template = ({ tag, text, active, focusVisible, ...args }: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)} ?data-active=${active} ?data-focus-visible=${focusVisible}>
    ${text}
  </${unsafeStatic(tag)}>
`;

const IconSlotTemplate = ({
  tag,
  text,
  'icon-name': iconName,
  ...args
}: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    ${text}
    <sbb-icon slot="icon" name=${iconName}></sbb-icon>
  </${unsafeStatic(tag)}>
`;

const LoadingIndicatorTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    <sbb-loading-indicator
      ?disable-animation=${isChromatic()}
      slot="icon"
      variant="circle"
    ></sbb-loading-indicator>
    ${text}
  </${unsafeStatic(tag)}>
`;

const FixedWidthTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <div>
    <p>
      <${unsafeStatic(tag)} ${sbbSpread(args)} style="width: 200px;">
        ${text}
      </${unsafeStatic(tag)}>
    </p>
    <p>
      <${unsafeStatic(tag)} ${sbbSpread(args)} style="max-width: 100%; width: 600px;">
        Wide Button
      </${unsafeStatic(tag)}>
    </p>
  </div>
`;
/* eslint-enable lit/binding-positions, @typescript-eslint/naming-convention */

const text: InputType = {
  control: {
    type: 'text',
  },
};

const variant: InputType = {
  control: {
    type: 'select',
  },
  options: ['primary', 'secondary', 'tertiary', 'transparent'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

export const buttonCommonDefaultArgTypes: ArgTypes = {
  text,
  variant,
  negative,
  size,
  'icon-name': iconName,
  'aria-label': ariaLabel,
};

export const buttonCommonDefaultArgs: Args = {
  text: 'Button',
  variant: variant.options[0],
  negative: false,
  size: size.options[0],
  'icon-name': 'arrow-right-small',
  'aria-label': undefined,
};

export const primary: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[0],
  },
};

export const secondary: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[1],
  },
};

export const tertiary: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[2],
  },
};

export const transparent: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[3],
  },
};

export const primaryNegative: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[0],
    negative: true,
  },
};

export const secondaryNegative: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[1],
    negative: true,
  },
};

export const tertiaryNegative: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[2],
    negative: true,
  },
};

export const transparentNegative: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[3],
    negative: true,
  },
};

export const iconOnly: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'arrow-right-small',
    text: undefined,
  },
};

export const primaryDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[0],
    disabled: true,
  },
};

export const secondaryDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[1],
    disabled: true,
  },
};

export const tertiaryDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[2],
    disabled: true,
  },
};

export const transparentDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[3],
    disabled: true,
  },
};

export const primaryNegativeDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[0],
    negative: true,
    disabled: true,
  },
};

export const secondaryNegativeDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[1],
    negative: true,
    disabled: true,
  },
};

export const tertiaryNegativeDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[2],
    negative: true,
    disabled: true,
  },
};

export const transparentNegativeDisabled: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[3],
    negative: true,
    disabled: true,
  },
};

export const iconOnlyDisabled: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'arrow-right-small',
    text: undefined,
    disabled: true,
  },
};

export const noIcon: StoryObj = {
  render: Template,
  args: { 'icon-name': undefined },
};

export const sizeM: StoryObj = {
  render: Template,
  args: {
    size: size.options[1],
  },
};

export const fixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  args: {
    text: 'Button with long text',
    'icon-name': 'arrow-right-small',
  },
};

export const withSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  args: {
    'icon-name': 'chevron-small-right-small',
  },
};

export const primaryActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[0],
    active: true,
  },
};

export const secondaryActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[1],
    active: true,
  },
};

export const tertiaryActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[2],
    active: true,
  },
};

export const transparentActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[3],
    active: true,
  },
};

export const primaryNegativeActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[0],
    negative: true,
    active: true,
  },
};

export const secondaryNegativeActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[1],
    negative: true,
    active: true,
  },
};

export const tertiaryNegativeActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[2],
    negative: true,
    active: true,
  },
};

export const transparentNegativeActive: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[3],
    negative: true,
    active: true,
  },
};

export const primaryFocusVisible: StoryObj = {
  render: Template,
  args: {
    variant: variant.options[0],
    focusVisible: true,
  },
};

export const loadingIndicator: StoryObj = {
  render: LoadingIndicatorTemplate,
  args: {
    disabled: true,
    variant: variant.options[1],
  },
};
