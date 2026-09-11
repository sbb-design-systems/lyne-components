import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';

import type { SbbLogoElement } from './logo/logo.component.ts';
import readme from './readme.md?raw';

import '../logo.ts';

const TemplateLogo = (args: Args): TemplateResult => html`<sbb-logo ${sbbSpread(args)}></sbb-logo>`;
const TemplateCargoLogo = (args: Args): TemplateResult =>
  html`<sbb-logo-cargo ${sbbSpread(args)}></sbb-logo-cargo>`;
const TemplateCargoInternationalLogo = (args: Args): TemplateResult =>
  html`<sbb-logo-cargo-international ${sbbSpread(args)}></sbb-logo-cargo-international>`;
const TemplateElvetinoLogo = (args: Args): TemplateResult =>
  html`<sbb-logo-elvetino ${sbbSpread(args)}></sbb-logo-elvetino>`;

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
  negative,
  'protective-room': protectiveRoom,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  negative: false,
  'protective-room': protectiveRoom.options![0],
  'accessibility-label': undefined,
};

export const NoProtectiveRoom: StoryObj = {
  render: TemplateLogo,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const MinimalProtectiveRoom: StoryObj = {
  render: TemplateLogo,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'protective-room': protectiveRoom.options![1] },
};

export const IdealProtectiveRoom: StoryObj = {
  render: TemplateLogo,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'protective-room': protectiveRoom.options![2] },
};

export const Negative: StoryObj = {
  render: TemplateLogo,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
    'protective-room': protectiveRoom.options![2],
  },
};

export const Cargo: StoryObj = {
  render: TemplateCargoLogo,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const CargoInternational: StoryObj = {
  render: TemplateCargoInternationalLogo,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Elvetino: StoryObj = {
  render: TemplateElvetinoLogo,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
