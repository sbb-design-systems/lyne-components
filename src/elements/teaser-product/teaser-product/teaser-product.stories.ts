import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import sampleImages from '../../core/images.js';

import readme from './readme.md?raw';
import './teaser-product.js';
import '../../button/button-static.js';
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

const withFooter: InputType = {
  control: {
    type: 'boolean',
  },
};

const href: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const defaultArgTypes: ArgTypes = {
  'image-alignment': imageAlignment,
  negative,
  withFooter,
  href,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  'image-alignment': imageAlignment.options![0],
  negative: false,
  withFooter: true,
  href: 'https://www.sbb.ch',
  'accessibility-label': undefined,
};

const content = (): TemplateResult => html`
  <sbb-title level="3" class="sbb-teaser-product--spacing"
    >Benefit from up to 70% discount</sbb-title
  >
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec tempor mi
    vel dapibus lobortis. Sed at ex sit amet leo suscipit fermentum. Donec consequat hendrerit
    tortor, ut laoreet velit congue in.
  </p>
  <div class="sbb-teaser-product--spacing">
    <sbb-button-static>Label</sbb-button-static>
  </div>
`;

const footer = (): TemplateResult => html`
  <span slot="footnote">
    Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
    amet felis viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec
    tempor mi vel dapibus lobortis.
  </span>
`;

const Template = ({ withFooter, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product ${sbbSpread(args)} style="height: 600px">
    <sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>
    ${content()} ${withFooter ? footer() : nothing}
  </sbb-teaser-product>
`;

const TemplateSlottedImg = ({ withFooter, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product ${sbbSpread(args)} style="height: 600px">
    <img slot="image" src="${sampleImages[4]}" alt="" />
    ${content()} ${withFooter ? footer() : nothing}
  </sbb-teaser-product>
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

export const ImageBefore: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'image-alignment': imageAlignment.options![1] },
};

export const NoFooter: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withFooter: false },
};

export const SlottedImg: StoryObj = {
  render: TemplateSlottedImg,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SlottedImgNegative: StoryObj = {
  render: TemplateSlottedImg,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const SlottedImgNoFooter: StoryObj = {
  render: TemplateSlottedImg,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withFooter: false },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-teaser/sbb-teaser-product',
};

export default meta;
