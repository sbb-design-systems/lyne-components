import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { type TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import sampleImages from '../../core/images.js';

import readme from './readme.md?raw';
import './teaser-product-static.js';
import '../../button/button.js';
import '../../button/secondary-button.js';
import '../../image.js';
import '../../title.js';

const imageAlignment: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['after', 'before'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'image-alignment': imageAlignment,
  negative,
};

const defaultArgs: Args = {
  'image-alignment': imageAlignment.options![0],
  negative: false,
};

const content = (): TemplateResult => html`
  <div>
    <sbb-title level="3" style="margin-block-start: 0;">Benefit from up to 70% discount</sbb-title>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec tempor mi
    vel dapibus lobortis. Sed at ex sit amet leo suscipit fermentum. Donec consequat hendrerit
    tortor, ut laoreet velit congue in.
    <div style="margin-block-start: var(--sbb-spacing-responsive-xxs);">
      <sbb-button>Label</sbb-button>
      <sbb-secondary-button style="margin-inline-start: var(--sbb-spacing-fixed-4x)"
        >Label</sbb-secondary-button
      >
    </div>
  </div>
`;

const footer = (): TemplateResult => html`
  <span slot="footnote">
    Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
    amet felis viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec
    tempor mi vel dapibus lobortis.
  </span>
`;

const Template = (args: Args): TemplateResult => html`
  <sbb-teaser-product-static ${sbbSpread(args)} style="height: 600px">
    <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
    ${content()} ${footer()}
  </sbb-teaser-product-static>
`;

const NoFooterTemplate = (args: Args): TemplateResult => html`
  <sbb-teaser-product-static ${sbbSpread(args)} style="height: 600px">
    <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
    ${content()}
  </sbb-teaser-product-static>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const ImageBefore: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'image-alignment': imageAlignment.options![1] },
};

export const NoFooter: StoryObj = {
  render: NoFooterTemplate,
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
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-teaser/sbb-teaser-product-static',
};

export default meta;
