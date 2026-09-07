import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';

import type { SbbLogoElement } from './logo/logo.component.ts';
import readme from './readme.md?raw';

import '../logo.ts';

const Template = ({ tag, ...args }: Args): TemplateResult =>
  // eslint-disable-next-line lit/binding-positions
  html`<${unsafeStatic(tag)} ${sbbSpread(args)}></>`;

const tag: InputType = {
  control: {
    type: 'select',
  },
  options: ['sbb-logo', 'sbb-cargo'],
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

const defaultArgTypes: ArgTypes = {
  tag,
  negative,
  'protective-room': protectiveRoom,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  tag: tag.options![0],
  negative: false,
  'protective-room': protectiveRoom.options![0],
  'accessibility-label': undefined,
};

export const NoProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const MinimalProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'protective-room': protectiveRoom.options![1] },
};

export const IdealProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'protective-room': protectiveRoom.options![2] },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
    'protective-room': protectiveRoom.options![2],
  },
};

export const Cargo: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, tag: tag.options![1] },
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
