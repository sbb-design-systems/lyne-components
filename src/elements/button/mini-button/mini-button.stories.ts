import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import {
  buttonDefaultArgs,
  buttonDefaultArgTypes,
} from '../common/button-common-stories.private.ts';
import { commonDecorators } from '../common/common-stories.private.ts';

import '../../form-field.ts';
import '../../icon.ts';
import './mini-button.component.ts';

import readme from './readme.md?raw';

const StandaloneTemplate = ({ _slot, text, ...args }: Args): TemplateResult => html`
  <sbb-mini-button ${sbbSpread(args)}>${text}</sbb-mini-button>
`;

const MiniButtonCommonTemplate = ({ slot, ...args }: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>Demo sbb-mini-button</label>
    <input placeholder="Placeholder" ?disabled=${args.disabled} />
    <sbb-mini-button slot=${slot} ${sbbSpread(args)}></sbb-mini-button>
  </sbb-form-field>
`;

const MiniButtonSlottedIconCommonTemplate = ({ slot, ...args }: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>Demo sbb-mini-button</label>
    <input placeholder="Placeholder" ?disabled=${args.disabled} />
    <sbb-mini-button slot=${slot} ${sbbSpread(args)}>
      <sbb-icon name="user-small" slot="icon"></sbb-icon>
    </sbb-mini-button>
  </sbb-form-field>
`;

const slot: InputType = {
  control: {
    type: 'select',
  },
  options: ['prefix', 'suffix'],
};

const miniButtonDefaultArgTypes: ArgTypes = {
  ...buttonDefaultArgTypes,
  slot,
};

const miniButtonDefaultArgs: Args = {
  ...buttonDefaultArgs,
  'icon-name': 'pen-small',
  slot: slot.options![0],
};

const standaloneArgTypes: ArgTypes = {
  ...buttonDefaultArgTypes,
};

const standaloneArgs: Args = {
  ...buttonDefaultArgs,
  'icon-name': 'pen-small',
  text: null,
};

['size', 'text', 'tag'].forEach((e: string) => {
  delete miniButtonDefaultArgTypes[e];
  delete miniButtonDefaultArgs[e];
});

['size', 'tag', 'slot'].forEach((e: string) => {
  delete standaloneArgTypes[e];
  delete standaloneArgs[e];
});

const StandaloneStory: StoryObj = {
  render: StandaloneTemplate,
  argTypes: standaloneArgTypes,
};

const FormFieldStory: StoryObj = {
  argTypes: miniButtonDefaultArgTypes,
};

export const Standalone: StoryObj = {
  ...StandaloneStory,
  args: { ...standaloneArgs },
};

export const StandaloneNegative: StoryObj = {
  ...StandaloneStory,
  args: { ...standaloneArgs, negative: true },
};

export const StandaloneDisabled: StoryObj = {
  ...StandaloneStory,
  args: { ...standaloneArgs, disabled: true },
};

export const StandaloneLabel: StoryObj = {
  ...StandaloneStory,
  args: { ...standaloneArgs, text: 'Label' },
};

export const StandaloneLabelNegative: StoryObj = {
  ...StandaloneStory,
  args: { ...standaloneArgs, text: 'Label', negative: true },
};

export const StandaloneLabelDisabled: StoryObj = {
  ...StandaloneStory,
  args: { ...standaloneArgs, text: 'Label', disabled: true },
};

export const Prefix: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonCommonTemplate,
  args: { ...miniButtonDefaultArgs },
};

export const PrefixNegative: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonCommonTemplate,
  args: { ...miniButtonDefaultArgs, negative: true },
};

export const PrefixDisabled: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonCommonTemplate,
  args: { ...miniButtonDefaultArgs, disabled: true },
};

export const PrefixSlottedIcon: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonSlottedIconCommonTemplate,
  args: { ...miniButtonDefaultArgs, 'icon-name': undefined },
};

export const Suffix: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonCommonTemplate,
  args: { ...miniButtonDefaultArgs, slot: slot.options![1] },
};

export const SuffixNegative: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonCommonTemplate,
  args: { ...miniButtonDefaultArgs, slot: slot.options![1], negative: true },
};

export const SuffixDisabled: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonCommonTemplate,
  args: { ...miniButtonDefaultArgs, slot: slot.options![1], disabled: true },
};

export const SuffixSlottedIcon: StoryObj = {
  ...FormFieldStory,
  render: MiniButtonSlottedIconCommonTemplate,
  args: { ...miniButtonDefaultArgs, slot: slot.options![1], 'icon-name': undefined },
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
  title: 'elements/sbb-button/sbb-mini-button',
};

export default meta;
