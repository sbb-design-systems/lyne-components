import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import images from '../../core/images.js';

import { SbbCarouselItemElement } from './carousel-item.component.js';
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

const Template = ({ imageSrc }: Args): TemplateResult => html`
  <sbb-carousel-item>
    <img src=${imageSrc} alt="SBB image" height="300" width="400" />
  </sbb-carousel-item>
`;

export const Default: StoryObj = {
  render: Template,
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
