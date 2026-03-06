import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import sampleImages from '../core/images.ts';
import type { SbbTeaserProductElement } from '../teaser-product.ts';

import readme from './readme.md?raw';

import '../action-group.ts';
import '../button.ts';
import '../chip-label.ts';
import '../image.ts';
import '../teaser-product.ts';
import '../title.ts';

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

const slottedImg: InputType = {
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
  slottedImg,
};

const defaultArgs: Args = {
  'image-alignment': imageAlignment.options![0],
  negative: false,
  withFooter: true,
  slottedImg: false,
};

const linkDefaultArgTypes: ArgTypes = {
  ...defaultArgTypes,
  href,
  'accessibility-label': accessibilityLabel,
};

const linkDefaultArgs: Args = {
  ...defaultArgs,
  href: 'https://www.sbb.ch',
  'accessibility-label': 'Benefit from up to 70% discount, Follow the link to benefit.',
};

const content = (staticTeaser: boolean = false): TemplateResult => html`
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p class="sbb-teaser-product--spacing">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec tempor mi
    vel dapibus lobortis. Sed at ex sit amet leo suscipit fermentum. Donec consequat hendrerit
    tortor, ut laoreet velit congue in.
  </p>
  ${staticTeaser
    ? html`<sbb-action-group class="sbb-teaser-product--spacing">
        <sbb-button>Label</sbb-button>
        <sbb-secondary-button>Label</sbb-secondary-button>
      </sbb-action-group>`
    : html`<sbb-button-static class="sbb-teaser-product--spacing">Label</sbb-button-static>`}
`;

const footer = (): TemplateResult => html`
  <p slot="footnote" class="sbb-teaser-product--spacing">
    Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
    amet felis viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec
    tempor mi vel dapibus lobortis.
  </p>
`;

const innerTemplate = ({
  withFooter,
  slottedImg,
  staticTeaser = false,
}: {
  withFooter: boolean;
  slottedImg: boolean;
  staticTeaser?: boolean;
}): TemplateResult => html`
  ${slottedImg
    ? html`<img slot="image" src=${sampleImages[1]} alt="" />`
    : html`<sbb-image slot="image" image-src=${sampleImages[1]}></sbb-image>`}
  ${content(staticTeaser)} ${withFooter ? footer() : nothing}
`;

const chipInnerTemplate = ({
  withFooter,
  slottedImg,
  imageAlignment,
  staticTeaser = false,
}: {
  withFooter: boolean;
  slottedImg: boolean;
  imageAlignment: SbbTeaserProductElement['imageAlignment'];
  staticTeaser?: boolean;
}): TemplateResult => html`
  <figure slot="image" class="sbb-figure">
    ${slottedImg
      ? html`<img src=${sampleImages[1]} alt="" />`
      : html`<sbb-image image-src=${sampleImages[1]}></sbb-image>`}
    <sbb-chip-label
      class=${imageAlignment === 'after'
        ? 'sbb-figure-overlap-start-end'
        : 'sbb-figure-overlap-start-start'}
    >
      AI generated
    </sbb-chip-label>
  </figure>
  ${content(staticTeaser)} ${withFooter ? footer() : nothing}
`;

const Template = ({ withFooter, slottedImg, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product ${sbbSpread(args)}>
    ${innerTemplate({ withFooter, slottedImg })}
  </sbb-teaser-product>
`;

const WithChipTemplate = ({ withFooter, slottedImg, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product ${sbbSpread(args)}>
    ${chipInnerTemplate({ withFooter, slottedImg, imageAlignment: args.imageAlignment })}
  </sbb-teaser-product>
`;

const TemplateStatic = ({ withFooter, slottedImg, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product-static ${sbbSpread(args)}>
    ${innerTemplate({ withFooter, slottedImg, staticTeaser: true })}
  </sbb-teaser-product-static>
`;

const WithChipStaticTemplate = ({ withFooter, slottedImg, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product-static ${sbbSpread(args)}>
    ${chipInnerTemplate({
      withFooter,
      slottedImg,
      imageAlignment: args.imageAlignment,
      staticTeaser: true,
    })}
  </sbb-teaser-product-static>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: linkDefaultArgTypes,
  args: { ...linkDefaultArgs },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: linkDefaultArgTypes,
  args: { ...linkDefaultArgs, negative: true },
};

export const ImageBefore: StoryObj = {
  render: Template,
  argTypes: linkDefaultArgTypes,
  args: { ...linkDefaultArgs, 'image-alignment': imageAlignment.options![1] },
};

export const NoFooter: StoryObj = {
  render: Template,
  argTypes: linkDefaultArgTypes,
  args: { ...linkDefaultArgs, withFooter: false },
};

export const SlottedImg: StoryObj = {
  render: Template,
  argTypes: linkDefaultArgTypes,
  args: { ...linkDefaultArgs, slottedImg: true },
};

export const WithChip: StoryObj = {
  render: WithChipTemplate,
  argTypes: linkDefaultArgTypes,
  args: { ...linkDefaultArgs },
};

export const Static: StoryObj = {
  render: TemplateStatic,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithChipStatic: StoryObj = {
  render: WithChipStaticTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Teaser Product',
};

export default meta;
