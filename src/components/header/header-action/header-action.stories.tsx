/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import './sbb-header-action';

const TemplateSingle = (args): JSX.Element => (
  <sbb-header-action {...args}>{args.text}</sbb-header-action>
);

const TemplateMultiple = (args): JSX.Element => (
  <div style={{ display: 'flex', gap: '2rem' }}>
    <sbb-header-action {...args}>{args.text} 1</sbb-header-action>
    <sbb-header-action {...args}>{args.text} 2</sbb-header-action>
    <sbb-header-action {...args}>{args.text} 3</sbb-header-action>
  </div>
);

const text: InputType = {
  control: {
    type: 'text',
  },
};

const expandFrom: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const iconName: InputType = {
  control: {
    type: 'text',
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
  control: { type: 'text' },
};

const basicArgTypes: ArgTypes = {
  text,
  'expand-from': expandFrom,
  'icon-name': iconName,
  href,
  target,
  rel,
  download,
  type,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const basicArgs: Args = {
  text: 'Menu',
  'expand-from': expandFrom.options[0],
  'icon-name': 'hamburger-menu-small',
  href: href.options[1],
  target: '_blank',
  rel: undefined,
  download: false,
  type: undefined,
  name: undefined,
  value: undefined,
  form: undefined,
  'aria-label': undefined,
};

const basicArgsButton = {
  ...basicArgs,
  href: undefined,
  target: undefined,
  download: undefined,
  type: type.options[0],
  name: 'header-button',
  value: 'value',
  form: 'form',
};

export const sbbHeaderActionLink: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const sbbHeaderActionButton: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgsButton },
};

export const sbbHeaderActionLinkMultiple: StoryObj = {
  render: TemplateMultiple,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const sbbHeaderActionButtonMultiple: StoryObj = {
  render: TemplateMultiple,
  argTypes: basicArgTypes,
  args: { ...basicArgsButton },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
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
  title: 'components/sbb-header/sbb-header-action',
};

export default meta;
