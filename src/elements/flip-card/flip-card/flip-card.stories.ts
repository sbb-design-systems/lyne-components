import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';

import sampleImages from '../../core/images.js';

import readme from './readme.md?raw';

import './flip-card.js';
import '../flip-card-summary.js';
import '../flip-card-details.js';
import '../../image/image.js';
import '../../title/title.js';
import '../../link/link/link.js';

const imageAlignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after', 'below'],
  table: {
    category: 'Summary',
  },
};

const defaultArgTypes: ArgTypes = {
  imageAlignment,
};

const defaultArgs: Args = {
  imageAlignment: imageAlignment.options![0],
};

const cardSummary = (imageAlignment: any, showImage: boolean): TemplateResult => html`
  <sbb-flip-card-summary slot="summary" image-alignment=${imageAlignment}>
    <sbb-title level="4">Summary</sbb-title>
    ${showImage
      ? html`<sbb-image
          slot="image"
          image-src=${sampleImages[0]}
          border-radius="none"
          aspect-ratio="free"
        ></sbb-image>`
      : nothing}
  </sbb-flip-card-summary>
`;

const cardDetails = (): TemplateResult => html`
  <sbb-flip-card-details slot="details"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus
    turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor
    ullamcorper maximus. In convallis consectetur felis.
    <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link></sbb-flip-card-details
  >
`;

const DefaultTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card> ${cardSummary(args.imageAlignment, true)} ${cardDetails()} </sbb-flip-card>`;

const NoImageTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card>
    ${cardSummary(args.imageAlignment, false)} ${cardDetails()}
  </sbb-flip-card>`;

const LongContentTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card>
    ${cardSummary(args.imageAlignment, true)}
    <sbb-flip-card-details slot="details"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae
      tortor ullamcorper maximus. In convallis consectetur felis. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus turpis elit, dapibus eget
      fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor ullamcorper maximus. In
      convallis consectetur felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
      luctus ornare condimentum. Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis
      in nibh. Duis dapibus vitae tortor ullamcorper maximus. In convallis consectetur felis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus
      turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor
      ullamcorper maximus. In convallis consectetur felis.
      <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link></sbb-flip-card-details
    >
  </sbb-flip-card>`;

const LongTitleTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card>
    <sbb-flip-card-summary slot="summary" image-alignment=${args.imageAlignment}>
      <sbb-title level="4"
        >This is a very long title that should break into multiple lines</sbb-title
      >
      <sbb-image
        slot="image"
        image-src=${sampleImages[0]}
        border-radius="none"
        aspect-ratio="free"
      ></sbb-image>
    </sbb-flip-card-summary>
    ${cardDetails()}
  </sbb-flip-card>`;

export const ImageAfter: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const ImageBelow: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, imageAlignment: imageAlignment.options![1] },
};

export const NoImage: StoryObj = {
  render: NoImageTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const LongTitle: StoryObj = {
  render: LongTitleTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-flip-card/sbb-flip-card',
};

export default meta;
