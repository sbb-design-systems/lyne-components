import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './mini-button-group.js';
import '../button/mini-button.js';
import '../divider/divider.js';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l', 'xl'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  negative,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  size: size.options![1],
  negative: false,
  'accessibility-label': '',
};

const miniButtons = (n = 1): TemplateResult[] =>
  new Array(n)
    .fill(null)
    .map(() => html`<sbb-mini-button icon-name="pen-small"></sbb-mini-button>`);

const Template = (args: Args): TemplateResult =>
  html` <sbb-mini-button-group ${sbbSpread(args)}>
    ${miniButtons(2)}
    <sbb-divider orientation="vertical"></sbb-divider>
    ${miniButtons(3)}
    <sbb-divider orientation="vertical"></sbb-divider>
    ${miniButtons(1)}
  </sbb-mini-button-group>`;

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
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-mini-button-group',
};

export default meta;
