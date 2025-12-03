import type {
  Args,
  ArgTypes,
  Decorator,
  StoryContext,
  StoryObj,
  WebComponentsRenderer,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import type { SbbButtonCommonElementMixinType } from './button-common.ts';

import '../../icon.ts';
import '../../loading-indicator-circle.ts';

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
const Template = ({ tag, text, ...args }: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    ${text}
  </${unsafeStatic(tag)}>
`;

const IconSlotTemplate = ({
  tag,
  text,
  'icon-name': iconName,
  hiddenIcon,
  ...args
}: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    ${text}
    <sbb-icon slot="icon" name=${iconName} style=${hiddenIcon ? 'display: none;' : ''} ></sbb-icon>
  </${unsafeStatic(tag)}>
`;

const LoadingIndicatorTemplate = ({
  tag,
  text,
  loading: _loading, // Ignore loading as it is handled in the template
  ...args
}: Args): TemplateResult => {
  return html`
    <${unsafeStatic(tag)}
      ${sbbSpread(args)}
      @click=${(e: PointerEvent) => {
        const button = e.currentTarget as SbbButtonCommonElementMixinType;
        button.loading = true;

        setTimeout(() => (button.loading = false), 4000);
      }}
  >
      ${text}
    </${unsafeStatic(tag)}>
  `;
};

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

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const loading: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

export const commonDefaultArgTypes: ArgTypes = {
  tag,
  text,
  negative,
  size,
  'icon-name': iconName,
  loading,
};

/**
 * NOTE
 * The tag is the tagName of the component to display in stories,
 * so it must be overridden before use.
 */
export const commonDefaultArgs: Args = {
  tag: 'TBD',
  text: 'Button',
  negative: false,
  size: size.options![0],
  'icon-name': 'arrow-right-small',
  loading: false,
};

export const primary: StoryObj = {
  render: Template,
};

export const primaryNegative: StoryObj = {
  render: Template,
  args: { negative: true },
};

export const primaryDisabled: StoryObj = {
  render: Template,
  args: { disabled: true },
};

export const primaryNegativeDisabled: StoryObj = {
  render: Template,
  args: { negative: true, disabled: true },
};

export const iconOnly: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'arrow-right-small',
    text: undefined,
  },
};

export const iconOnlyNegative: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'arrow-right-small',
    text: undefined,
    negative: true,
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
    size: size.options![1],
  },
};

export const sizeS: StoryObj = {
  render: Template,
  args: {
    size: size.options![2],
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

export const loadingIndicator: StoryObj = {
  render: LoadingIndicatorTemplate,
};

export const withHiddenSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  args: {
    hiddenIcon: true,
    'icon-name': 'chevron-small-right-small',
  },
};

export const commonDecorators = [
  (story: () => WebComponentsRenderer['storyResult'], context: StoryContext) =>
    context.args.negative
      ? html`
          <div style="--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark)">
            ${story()}
          </div>
        `
      : story(),
  withActions as Decorator,
];
