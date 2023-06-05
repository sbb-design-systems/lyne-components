/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator, StoryContext } from '@storybook/html';
import type { InputType } from '@storybook/types';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color':
    context.args.color === 'white'
      ? 'var(--sbb-color-milk-default)'
      : 'var(--sbb-color-white-default)',
});

const ContentText =
  (): string => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio,
  ut blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur malesuada, nibh ac
  blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac justo.`;

const Content = (): JSX.Element[] => [<sbb-title level="4">Example text</sbb-title>, ContentText()];

const Template = (args): JSX.Element => <sbb-card {...args}>{Content()}</sbb-card>;

const TemplateFixedHeight = (args): JSX.Element => (
  <sbb-card {...args} style={{ height: '250px' }}>
    {Content()}
  </sbb-card>
);

const TemplateWithBadge = (args): JSX.Element => (
  <sbb-card {...args}>
    <sbb-card-badge slot="badge" appearance="primary" is-discount price="19.99" text="from CHF" />
    {Content()}
  </sbb-card>
);

const TemplateMultipleCards = (args): JSX.Element => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    {TemplateWithBadge(args)}
    {TemplateWithBadge({ ...args, active: true })}
    {TemplateWithBadge(args)}
    {TemplateWithBadge(args)}
  </div>
);

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const href: InputType = {
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

const ariaLabel: InputType = {
  control: {
    type: 'text',
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

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
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

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};
const basicArgTypes: ArgTypes = {
  size,
  active,
  color,
  href,
  download,
  target,
  rel,
  'aria-label': ariaLabel,
  name,
  type,
  form,
  value,
};

const basicArgs: Args = {
  size: 'm',
  active: false,
  color: color.options[0],
  href: 'https://github.com/lyne-design-system/lyne-components',
  download: false,
  target: '_blank',
  rel: undefined,
  'aria-label': undefined,
  name: undefined,
  type: undefined,
  form: undefined,
  value: undefined,
};

const basicArgsMilk = {
  ...basicArgs,
  color: color.options[1],
};

const basicArgsButton = {
  ...basicArgs,
  href: undefined,
  download: undefined,
  target: undefined,
  name: 'Button name',
  type: type.options[0],
  form: 'form-name',
  value: 'Value',
};

const basicArgsButtonMilk = {
  ...basicArgsButton,
  color: color.options[1],
};

export const sbbCardLink: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const sbbCardLinkMilk: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgsMilk },
};

export const sbbCardButton: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgsButton },
};

export const sbbCardButtonMilk: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgsButtonMilk },
};

export const sbbCardButtonActive: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgsButton, active: true },
};

export const sbbCardButtonActiveMilk: StoryObj = {
  render: Template,
  argTypes: basicArgTypes,
  args: { ...basicArgsButtonMilk, active: true },
};

export const sbbCardWithSbbBadgeLink: StoryObj = {
  render: TemplateWithBadge,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const sbbCardWithSbbBadgeLinkMilk: StoryObj = {
  render: TemplateWithBadge,
  argTypes: basicArgTypes,
  args: { ...basicArgsMilk },
};

export const sbbCardWithSbbBadgeButton: StoryObj = {
  render: TemplateWithBadge,
  argTypes: basicArgTypes,
  args: { ...basicArgsButton },
};

export const sbbCardWithSbbBadgeButtonMilk: StoryObj = {
  render: TemplateWithBadge,
  argTypes: basicArgTypes,
  args: { ...basicArgsButtonMilk },
};

export const sbbCardWithSbbBadgeLinkActive: StoryObj = {
  render: TemplateWithBadge,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true },
};

export const sbbCardWithSbbBadgeLinkActiveMilk: StoryObj = {
  render: TemplateWithBadge,
  argTypes: basicArgTypes,
  args: { ...basicArgsMilk, active: true },
};

export const sbbCardFixedHeight: StoryObj = {
  render: TemplateFixedHeight,
  argTypes: basicArgTypes,
  args: { ...basicArgsButton },
};

export const sbbCardMultiple: StoryObj = {
  render: TemplateMultipleCards,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const sbbCardMultipleMilk: StoryObj = {
  render: TemplateMultipleCards,
  argTypes: basicArgTypes,
  args: { ...basicArgsMilk },
};

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), padding: '2rem' }}>
        <Story />
      </div>
    ),
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
  title: 'components/sbb-card',
};

export default meta;
