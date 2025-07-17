import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import images from '../../core/images.js';

import readme from './readme.md?raw';

import './carousel.component.js';
import '../carousel-list/carousel-list.component.js';
import '../carousel-item/carousel-item.component.js';
import '../../paginator.js';

const Template = (): TemplateResult => html`
  <sbb-carousel>
    <sbb-carousel-list>
      <sbb-carousel-item>
        <img src=${images[0]} alt="SBB image" height="300" width="400" />
      </sbb-carousel-item>
      <sbb-carousel-item>
        <img src=${images[1]} alt="SBB image" height="300" width="400" />
      </sbb-carousel-item>
      <sbb-carousel-item>
        <img src=${images[2]} alt="SBB image" height="300" width="400" />
      </sbb-carousel-item>
    </sbb-carousel-list>
    <sbb-compact-paginator></sbb-compact-paginator>
  </sbb-carousel>
`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-carousel/sbb-carousel',
};

export default meta;
