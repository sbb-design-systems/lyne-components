import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import type { SbbLogoAnniversaryElement } from '../logo.pure.ts';

import type { SbbLogoElement } from './logo.component.ts';
import readme from './readme.md?raw';

import '../logo.ts';

const Template = (args: Args): TemplateResult => html`<sbb-logo ${sbbSpread(args)}></sbb-logo>`;

const TemplateAnniversary = ({ lang, ...args }: Args): TemplateResult => {
  document.documentElement.setAttribute('lang', lang);
  return html`<sbb-logo-anniversary ${sbbSpread(args)}></sbb-logo-anniversary>`;
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal'] satisfies SbbLogoElement['protectiveRoom'][],
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const animation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['all', 'none'] satisfies SbbLogoAnniversaryElement['animation'][],
};

const lang: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['en', 'de', 'fr', 'it'],
};

const commonArgTypes = {
  negative,
  'accessibility-label': accessibilityLabel,
};

const logoArgTypes: ArgTypes = {
  ...commonArgTypes,
  'protective-room': protectiveRoom,
};

const anniversaryArgTypes = {
  ...commonArgTypes,
  animation,
  lang,
};

const commonArgs: Args = {
  negative: false,
  'accessibility-label': undefined,
};

const logoArgs: Args = {
  ...commonArgs,
  'protective-room': protectiveRoom.options![0],
};

const anniversaryArgs: Args = {
  ...commonArgs,
  animation: 'all',
  lang: 'en',
};

export const NoProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: { ...logoArgs },
};

export const MinimalProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: { ...logoArgs, 'protective-room': protectiveRoom.options![1] },
};

export const IdealProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: { ...logoArgs, 'protective-room': protectiveRoom.options![2] },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: {
    ...logoArgs,
    negative: true,
    'protective-room': protectiveRoom.options![2],
  },
};

export const Anniversary: StoryObj = {
  render: TemplateAnniversary,
  argTypes: anniversaryArgTypes,
  args: { ...anniversaryArgs },
};

export const AnniversaryNegative: StoryObj = {
  render: TemplateAnniversary,
  argTypes: anniversaryArgTypes,
  args: { ...anniversaryArgs, negative: true },
};

const meta: Meta = {
  decorators: [(story) => html`<div style="max-width: 300px;">${story()}</div>`],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Logo',
};

export default meta;
