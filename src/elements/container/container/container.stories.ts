import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import sampleImages from '../../core/images.ts';

import '../../button/secondary-button.ts';
import '../../card.ts';
import '../../image.ts';
import '../../title.ts';
import './container.component.ts';

import readme from './readme.md?raw';

const containerContent = (title: string, isDark: boolean, last = false): TemplateResult => html`
  <sbb-title level="4" ?negative=${isDark}>${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    ${isDark
      ? html`
          In <code>"midnight"</code> and <code>"charcoal"</code> variants the slotted text has
          <code>"white"</code> color; however, you have to manually set the
          <code>"negative"</code> property on sbb-components when needed.
        `
      : html`
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        `}
  </p>
  <sbb-secondary-button style=${last ? 'margin-block-end: 3rem;' : nothing}>
    See more
  </sbb-secondary-button>
`;

const card = (title: string): TemplateResult => html`
  <sbb-card class="sbb-card-spacing-s">
    <sbb-title level="5">${title}</sbb-title>
    <p class="sbb-text-s" style="margin: 0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
    <sbb-secondary-button style="margin-block-start: var(--sbb-spacing-responsive-xs)">
      See more
    </sbb-secondary-button>
  </sbb-card>
`;

const color: InputType = {
  control: {
    type: 'select',
  },
  options: ['white', 'transparent', 'milk', 'midnight', 'charcoal'],
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const backgroundExpanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const imageSrc: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  color,
  expanded,
  'background-expanded': backgroundExpanded,
  'image-src': imageSrc,
};

const defaultArgs: Args = {
  color: color.options![0],
  expanded: false,
  'background-expanded': false,
  'image-src': undefined,
};

function isDark(colorArg: string): boolean {
  return colorArg === 'midnight' || colorArg === 'charcoal';
}

const DefaultTemplate = (args: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)}>
    ${containerContent('Example title', isDark(args.color))}
    ${containerContent('Another one', isDark(args.color))}
    ${containerContent('And another one', isDark(args.color), true)}
  </sbb-container>
`;

const BackgroundImageTemplate = ({ 'image-src': imageSrc, ...args }: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)}>
    <sbb-title level="2" style="margin: 0; color: var(--sbb-color-charcoal)"
      >Container with background image</sbb-title
    >
    <style>
      .content {
        display: flex;
        margin-block-start: var(--sbb-spacing-responsive-m);
        gap: var(--sbb-spacing-fixed-6x);
        justify-content: center;
        flex-direction: column;

        /* Starting from breakpoint large. Please use design token. */
        @media screen and (width >= 1024px) {
          flex-direction: row;
        }
      }
    </style>
    <div class="content">${card('Example title')} ${card('Another one')}</div>
    <sbb-image
      slot="image"
      image-src=${imageSrc}
      alt="Train"
      style="--sbb-image-object-position: bottom;"
    ></sbb-image>
  </sbb-container>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Transparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1] },
};

export const Milk: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2] },
};

export const Midnight: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![3] },
};

export const Charcoal: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![4] },
};

export const BackgroundImage: StoryObj = {
  render: BackgroundImageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'image-src': sampleImages[9],
  },
};

export const Expanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const MilkBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2], 'background-expanded': true },
};

export const MidnightBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![3], 'background-expanded': true },
};

export const CharcoalBackgroundExpanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![4], 'background-expanded': true },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-container/sbb-container',
};

export default meta;
