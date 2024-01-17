import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { StyleInfo } from 'lit/directives/style-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import './navigation-action';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const hrefs: string[] = [
  'https://www.sbb.ch',
  'https://github.com/lyne-design-system/lyne-components',
];
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

const defaultArgTypes: ArgTypes = {
  size,
  href,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  size: size.options[0],
  href: undefined,
  'aria-label': undefined,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-navigation-action ${sbbSpread(args)}>Label</sbb-navigation-action>
`;

const style: Readonly<StyleInfo> = {
  'background-color': 'var(--sbb-color-midnight-default)',
  width: 'max-content',
  padding: '1rem 2rem',
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[2] },
};

export const Link: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, href: href.options[1] },
};

const meta: Meta = {
  decorators: [(story) => html`<div style=${styleMap(style)}>${story()}</div>`],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-navigation/sbb-navigation-action',
};

export default meta;
