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
import isChromatic from 'chromatic';
import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import '../../loading-indicator';
import './button-link';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative ? '#484040' : 'var(--sbb-color-white-default)',
});

const focusStyle = (context: StoryContext): Record<string, string> =>
  context.args.negative
    ? { '--sbb-focus-outline-color': 'var(--sbb-focus-outline-color-dark)' }
    : {};

const Template = ({ text, active, focusVisible, ...args }: Args): TemplateResult => html`
  <sbb-button-link ${sbbSpread(args)} ?data-active=${active} ?data-focus-visible=${focusVisible}>
    ${text}
  </sbb-button-link>
`;

const IconSlotTemplate = ({ text, 'icon-name': iconName, ...args }: Args): TemplateResult => html`
  <sbb-button-link ${sbbSpread(args)}>
    ${text}
    <sbb-icon slot="icon" name=${iconName}></sbb-icon>
  </sbb-button-link>
`;

const LoadingIndicatorTemplate = ({ text, ...args }: Args): TemplateResult => html`
  <sbb-button-link ${sbbSpread(args)}>
    <sbb-loading-indicator
      ?disable-animation=${isChromatic()}
      slot="icon"
      variant="circle"
    ></sbb-loading-indicator>
    ${text}
  </sbb-button-link>
`;

const FixedWidthTemplate = ({ text, ...args }: Args): TemplateResult => html`
  <div>
    <p>
      <sbb-button-link ${sbbSpread(args)} style="width: 200px;"> ${text} </sbb-button-link>
    </p>
    <p>
      <sbb-button-link ${sbbSpread(args)} style="max-width: 100%; width: 600px;">
        Wide Button
      </sbb-button-link>
    </p>
  </div>
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
  href,
  target,
  rel,
  download,
  disabled,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  text: 'Button',
  variant: variant.options[0],
  negative: false,
  size: size.options[0],
  'is-static': false,
  'icon-name': 'arrow-right-small',
  href: href.options[0],
  target: '_blank',
  rel: 'noopener',
  download: false,
  disabled: false,
  'aria-label': undefined,
};

export const Primary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
  },
};

export const Secondary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
  },
};

export const Tertiary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
  },
};

export const Transparent: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
  },
};

export const PrimaryNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    negative: true,
  },
};

export const SecondaryNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    negative: true,
  },
};

export const TertiaryNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    negative: true,
  },
};

export const TransparentNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    negative: true,
  },
};

export const IconOnly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'arrow-right-small',
    text: undefined,
  },
};

export const PrimaryDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    disabled: true,
  },
};

export const SecondaryDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    disabled: true,
  },
};

export const TertiaryDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    disabled: true,
  },
};

export const TransparentDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    disabled: true,
  },
};

export const PrimaryNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    negative: true,
    disabled: true,
  },
};

export const SecondaryNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    negative: true,
    disabled: true,
  },
};

export const TertiaryNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    negative: true,
    disabled: true,
  },
};

export const TransparentNegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    negative: true,
    disabled: true,
  },
};

export const IconOnlyDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'arrow-right-small',
    text: undefined,
    disabled: true,
  },
};

export const NoIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': undefined },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[1],
  },
};

export const FixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Button with long text',
    'icon-name': 'arrow-right-small',
  },
};

export const WithSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'chevron-small-right-small',
  },
};

export const LinkOpensInNewWindow: StoryObj = {
  render: IconSlotTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    href: href.options[0],
    'icon-name': 'chevron-small-right-small',
    target: '_blank',
    'aria-label': undefined,
  },
};

export const PrimaryActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    active: true,
  },
};

export const SecondaryActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    active: true,
  },
};

export const TertiaryActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    active: true,
  },
};

export const TransparentActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    active: true,
  },
};

export const PrimaryNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    negative: true,
    active: true,
  },
};

export const SecondaryNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[1],
    negative: true,
    active: true,
  },
};

export const TertiaryNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[2],
    negative: true,
    active: true,
  },
};

export const TransparentNegativeActive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[3],
    negative: true,
    active: true,
  },
};

export const PrimaryFocusVisible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    focusVisible: true,
  },
};

export const LoadingIndicator: StoryObj = {
  render: LoadingIndicatorTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
    variant: variant.options[1],
  },
};

const meta: Meta = {
  excludeStories: /.*(Active|FocusVisible)$/,
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), ...focusStyle(context), padding: '2rem' })}>
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
  title: 'components/sbb-button-link',
};

export default meta;
