import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import './link';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-charcoal-default)'
    : 'var(--sbb-color-white-default)',
});

const paragraphStyle = (negative: boolean): Record<string, string> => ({
  color: negative ? 'var(--sbb-color-aluminium-default)' : 'var(--sbb-color-iron-default)',
});

const Template = ({ text, ...args }: Args): TemplateResult =>
  html`<sbb-link ${sbbSpread(args)}>${text}</sbb-link>`;

const FixedWidthTemplate = ({ text, ...args }: Args): TemplateResult => html`
  <sbb-link ${sbbSpread(args)} style=${styleMap({ width: '200px' })}> ${text} </sbb-link>
`;

const IconSlotTemplate = ({ text, 'icon-name': iconName, ...args }: Args): TemplateResult => html`
  <sbb-link ${sbbSpread(args)}>
    ${text}
    <sbb-icon slot="icon" name=${iconName}></sbb-icon>
  </sbb-link>
`;

const InlineTemplate = ({ text, ...args }: Args): TemplateResult => html`
  <p style=${styleMap(paragraphStyle(args.negative))} class="sbb-text-m">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. <sbb-link ${sbbSpread(args)}>${text}</sbb-link>
  </p>
`;

const text: InputType = {
  control: {
    type: 'text',
  },
};

const variant: InputType = {
  control: {
    type: 'select',
  },
  options: ['block', 'inline'],
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

const isStatic: InputType = {
  control: { type: 'boolean' },
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

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  text,
  variant,
  negative,
  size,
  'is-static': isStatic,
  'icon-name': iconName,
  'icon-placement': iconPlacement,
  href,
  target,
  rel,
  download,
  type,
  disabled,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  text: 'Travelcards & tickets',
  variant: variant.options[0],
  negative: false,
  size: size.options[1],
  'is-static': false,
  'icon-name': undefined,
  'icon-placement': iconPlacement.options[0],
  href: href.options[1],
  target: undefined,
  rel: undefined,
  download: false,
  type: type.options[0],
  disabled: false,
  name: 'Button name',
  value: undefined,
  form: undefined,
  'aria-label': undefined,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const BlockXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[0],
  },
};

export const BlockS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[1],
  },
};

export const BlockM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[2],
  },
};

export const BlockXSIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[0],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const BlockSIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[1],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const BlockMIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[2],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const BlockIconStart: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'chevron-small-left-small',
  },
};

export const BlockNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const BlockWithSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const BlockLinkOpensInNewWindow: StoryObj = {
  render: IconSlotTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
    target: '_blank',
    'aria-label': undefined,
  },
};

export const BlockFixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'A lot of link text to show what happens if there is not enough space.',
    'icon-name': 'chevron-small-left-small',
  },
};

export const BlockButton: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    href: undefined,
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options[1],
  },
};

export const BlockButtonNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
    href: undefined,
    'icon-name': 'chevron-small-left-small',
  },
};

export const BlockButtonFixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    href: undefined,
    text: 'A lot of link text to show what happens if there is not enough space.',
    'icon-name': 'chevron-small-left-small',
  },
};

export const Inline: StoryObj = {
  render: InlineTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Show more',
    variant: variant.options[1],
  },
};

export const InlineNegative: StoryObj = {
  render: InlineTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Show more',
    variant: variant.options[1],
    negative: true,
  },
};

export const InlineButton: StoryObj = {
  render: InlineTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Show more',
    variant: 'inline',
    href: undefined,
  },
};

export const InlineButtonNegative: StoryObj = {
  render: InlineTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Show more',
    variant: 'inline',
    href: undefined,
    negative: true,
  },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link',
};

export default meta;
