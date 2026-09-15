import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';

import { SbbEasterEggElement } from './easter-egg.component.ts';
import readme from './readme.md?raw';

import '@sbb-esta/lyne-elements/button.js';
import '../easter-egg.ts';

const negative: InputType = {
  control: { type: 'boolean' },
};

const accessibilityLabel: InputType = {
  control: { type: 'text' },
  table: { category: 'Accessibility' },
};

const backdrop: InputType = {
  control: { type: 'inline-radio' },
  options: ['opaque', 'translucent'],
};

const backdropAction: InputType = {
  control: { type: 'select' },
  options: ['close', 'none'],
};

const defaultArgTypes: ArgTypes = {
  negative,
  'accessibility-label': accessibilityLabel,
  backdrop,
  'backdrop-action': backdropAction,
};

const defaultArgs: Args = {
  negative: false,
  'accessibility-label': undefined,
  backdrop: 'opaque',
  'backdrop-action': 'none',
};

const Template = (args: Args): TemplateResult => html`
  <sbb-button id="easter-egg-trigger">Play Snake</sbb-button>
  <sbb-easter-egg trigger="easter-egg-trigger" ${sbbSpread(args)}></sbb-easter-egg>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbEasterEggElement.events.beforeopen,
        SbbEasterEggElement.events.open,
        SbbEasterEggElement.events.beforeclose,
        SbbEasterEggElement.events.close,
      ],
    },
    docs: {
      story: { inline: false, iframeHeight: '650px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/Easter Egg',
};

export default meta;
