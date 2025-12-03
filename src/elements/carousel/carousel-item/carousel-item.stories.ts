import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import images from '../../core/images.ts';
import '../../image.ts';

import { SbbCarouselItemElement } from './carousel-item.component.ts';
import readme from './readme.md?raw';

const imageSrc: InputType = {
  control: {
    type: 'select',
  },
  options: images,
};

const defaultArgTypes: ArgTypes = {
  imageSrc,
};

const defaultArgs: Args = {
  imageSrc: imageSrc.options![0],
};

const TemplateNative = ({ imageSrc }: Args): TemplateResult => html`
  <sbb-carousel-item>
    <img src=${imageSrc} alt="SBB image" height="300" width="400" />
  </sbb-carousel-item>
`;

const TemplateLyne = ({ imageSrc }: Args): TemplateResult => html`
  <sbb-carousel-item>
    <sbb-image
      image-src=${imageSrc}
      alt="SBB image"
      style="width: 800px; height: 600px;"
    ></sbb-image>
  </sbb-carousel-item>
`;

export const Native: StoryObj = {
  render: TemplateNative,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SbbImage: StoryObj = {
  render: TemplateLyne,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    actions: {
      handles: [SbbCarouselItemElement.events.beforeshow, SbbCarouselItemElement.events.show],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-carousel/sbb-carousel-item',
};

export default meta;
