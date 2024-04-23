import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './card-badge.js';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color':
    context.args.color === 'charcoal' ? 'var(--sbb-color-white)' : 'var(--sbb-color-charcoal)',
});

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['charcoal', 'white'],
};

const defaultArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  color,
};

const defaultArgs: Args = {
  'aria-label': 'Super saver sales ticket price starts at CHF 92.50 Black Friday Special',
  color: color.options![0],
};

const Template = (args: Args): TemplateResult => html`
  <sbb-card-badge ${sbbSpread(args)}>
    <span>%</span>
    <span>from CHF</span>
    <span>92.50</span>
    <span> <time datetime="2021-11-25">Black Friday</time> Special </span>
  </sbb-card-badge>
`;

export const Charcoal: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const White: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options![1],
  },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div
        style=${styleMap({
          ...wrapperStyle(context),
          padding: '0 0 2rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        })}
      >
        ${story()}
      </div>
    `,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-card/sbb-card-badge',
};

export default meta;
