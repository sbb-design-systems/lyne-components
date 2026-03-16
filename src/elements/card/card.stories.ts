import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';

import '../card.ts';
import '../title.ts';

const ContentText = (): TemplateResult => html`
  <span class="sbb-text-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio, ut
    blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur
    malesuada, nibh ac blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac
    justo.
  </span>
`;

const Content = (): TemplateResult => html`
  <sbb-title level="4">Example text</sbb-title>
  ${ContentText()}
`;

const Template = ({ spacing, color }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ color })} class=${`sbb-card-spacing-${spacing}`}>${Content()}</sbb-card>
`;

const TemplateWithBadge = ({ spacing, color, badgeColor }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ color })} class=${`sbb-card-spacing-${spacing}`}>
    <sbb-card-badge
      color=${badgeColor}
      aria-label="Super saver sales ticket price starts at CHF 92.50 Black Friday Special"
    >
      <span>%</span>
      <span>from CHF</span>
      <span>92.50</span>
      <span><time datetime="2021-11-25">Black Friday</time> Special </span>
    </sbb-card-badge>
    ${Content()}
  </sbb-card>
`;

const TemplateAction = ({ label, ...args }: Args): TemplateResult => {
  if (args.href) {
    ['type', 'form', 'value', 'name'].forEach((k) => delete args[k]);
    return html`<sbb-card-link ${sbbSpread(args)}>${label}</sbb-card-link>`;
  } else {
    ['href', 'target', 'rel', 'download'].forEach((k) => delete args[k]);
    return html`<sbb-card-button ${sbbSpread(args)}>${label}</sbb-card-button>`;
  }
};

const TemplateCardAction = ({ spacing, color, label, ...args }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ color })} class=${`sbb-card-spacing-${spacing}`}>
    ${TemplateAction({ label, ...args })} ${Content()}
  </sbb-card>
`;

const TemplateCardActionWithBadge = ({
  spacing,
  color,
  label,
  badgeColor,
  ...args
}: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ color })} class=${`sbb-card-spacing-${spacing}`}>
    ${TemplateAction({ label, ...args })}
    <sbb-card-badge
      color="${badgeColor}"
      aria-label="Super saver sales ticket price starts at CHF 19.99"
    >
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    ${Content()}
  </sbb-card>
`;

const TemplateCardActionMultipleCards = (args: Args): TemplateResult => html`
  <div style="display: flex; gap: 1rem;">
    ${TemplateCardActionWithBadge(args)} ${TemplateCardActionWithBadge({ ...args, active: true })}
    ${TemplateCardActionWithBadge(args)} ${TemplateCardActionWithBadge(args)}
  </div>
`;

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Card Action',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action',
  },
};

const spacing: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['3x-xxs', 'xxxs-xxs', 'xxxs-s', '4x-xxs', 'xxs', 's', 'l'],
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
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
    category: 'Card Action Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Card Action Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Link',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Card Action Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const badgeColor: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['charcoal', 'white'],
  table: {
    category: 'Card Badge',
  },
};

const defaultArgTypes: ArgTypes = {
  spacing,
  color,
};

const defaultArgTypesButton: ArgTypes = {
  ...defaultArgTypes,
  active,
  label,
  name,
  type,
  form,
  value,
};

const defaultArgTypesLink: ArgTypes = {
  ...defaultArgTypes,
  active,
  label,
  href,
  download,
  target,
  rel,
};

const defaultArgs: Args = {
  color: color.options![0],
  spacing: 'xxxs-s',
};

const defaultArgsLink = {
  ...defaultArgs,
  active: false,
  label: 'Click this card to follow the action.',
  href: href.options![1],
  download: false,
  target: '_blank',
  rel: undefined,
};

const defaultArgsButton = {
  ...defaultArgs,
  active: false,
  label: 'Click this card to follow the action.',
  name: 'Button name',
  type: type.options![0],
  form: 'form-name',
  value: 'Value',
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const WithBadge: StoryObj = {
  render: TemplateWithBadge,
  argTypes: { ...defaultArgTypes, badgeColor },
  args: {
    ...defaultArgs,
    spacing: spacing.options![2],
    badgeColor: 'charcoal',
  },
};

export const Link: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesLink,
  args: { ...defaultArgsLink },
};

export const Button: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesButton,
  args: { ...defaultArgsButton },
};

export const Multiple: StoryObj = {
  render: TemplateCardActionMultipleCards,
  argTypes: { ...defaultArgTypesLink, badgeColor },
  args: { ...defaultArgsLink, badgeColor: 'charcoal' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.color === 'milk'
        ? 'var(--sbb-background-color-1)'
        : 'var(--sbb-background-color-3)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Card',
};

export default meta;
