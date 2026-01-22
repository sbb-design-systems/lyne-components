import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { commonDecorators } from '../common/common-stories.private.ts';

import './mini-button-link.component.ts';
import '../mini-button/mini-button.component.ts';
import '../mini-button-group/mini-button-group.component.ts';
import '../../divider/divider.component.ts';

import readme from './readme.md?raw';

const Template = ({ text, ...args }: Args): TemplateResult => html`
  <sbb-mini-button-link ${sbbSpread(args)}>${text}</sbb-mini-button-link>
`;

const GroupTemplate = ({ text, ...args }: Args): TemplateResult => html`
  <sbb-mini-button-group>
    <sbb-mini-button icon-name="circle-information-small"></sbb-mini-button>
    <sbb-divider orientation="vertical"></sbb-divider>
    <sbb-mini-button-link ${sbbSpread(args)}>${text}</sbb-mini-button-link>
  </sbb-mini-button-group>
`;

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
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

const disabledInteractive: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  text,
  'icon-name': iconName,
  negative,
  href,
  target,
  rel,
  download,
  disabled,
  'disabled-interactive': disabledInteractive,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  href: href.options![0],
  'icon-name': 'link-external-small',
  text: null,
  negative: false,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const DefaultLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, text: 'Label' },
};

export const InGroup: StoryObj = {
  render: GroupTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: commonDecorators,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-button/sbb-mini-button-link',
};

export default meta;
