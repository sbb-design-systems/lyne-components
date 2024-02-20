import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, StoryContext, StoryObj } from '@storybook/web-components';
import { type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../core/dom';

export const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-charcoal-default)'
    : 'var(--sbb-color-white-default)',
});

export const paragraphStyle = (negative: boolean): Record<string, string> => ({
  color: negative ? 'var(--sbb-color-aluminium-default)' : 'var(--sbb-color-iron-default)',
});

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
const Template = ({ tag, text, ...args }: Args): TemplateResult =>
  html`<${unsafeStatic(tag)} ${sbbSpread(args)}>${text}</${unsafeStatic(tag)}>`;

const FixedWidthTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)} style=${styleMap({ width: '200px' })}> ${text} </${unsafeStatic(tag)}>
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

const InlineTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <p style=${styleMap(paragraphStyle(args.negative))} class="sbb-text-m">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. <${unsafeStatic(tag)} ${sbbSpread(args)}>${text}</${unsafeStatic(tag)}>
  </p>
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
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const iconPlacement: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
  table: {
    category: 'Icon',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

export const linkCommonDefaultArgTypes: ArgTypes = {
  text,
  negative,
  size,
  'icon-name': iconName,
  'icon-placement': iconPlacement,
  'aria-label': ariaLabel,
};

export const linkCommonDefaultArgs: Args = {
  text: 'Travelcards & tickets',
  negative: false,
  size: size.options[1],
  'icon-name': undefined,
  'icon-placement': iconPlacement.options[0],
  'aria-label': undefined,
};

export const blockXS: StoryObj = {
  render: Template,
  args: {
    size: size.options[0],
  },
};

export const blockS: StoryObj = {
  render: Template,
  args: {
    size: size.options[1],
  },
};

export const blockM: StoryObj = {
  render: Template,
  args: {
    size: size.options[2],
  },
};

export const blockXSIcon: StoryObj = {
  render: Template,
  args: {
    size: size.options[0],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const blockSIcon: StoryObj = {
  render: Template,
  args: {
    size: size.options[1],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const blockMIcon: StoryObj = {
  render: Template,
  args: {
    size: size.options[2],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const blockIconStart: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'chevron-small-left-small',
  },
};

export const blockNegative: StoryObj = {
  render: Template,
  args: {
    negative: true,
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const blockWithSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  args: {
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const blockFixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  args: {
    text: 'A lot of link text to show what happens if there is not enough space.',
    'icon-name': 'chevron-small-left-small',
  },
};

export const inline: StoryObj = {
  render: InlineTemplate,
  args: {
    text: 'Show more',
  },
};

export const inlineNegative: StoryObj = {
  render: InlineTemplate,
  args: {
    text: 'Show more',
    negative: true,
  },
};
