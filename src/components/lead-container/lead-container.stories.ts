import type { Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import '../breadcrumb.js';
import '../image.js';
import '../link/block-link/block-link.js';
import '../title.js';
import './lead-container.js';

import images from '../core/images.js';

import readme from './readme.md?raw';

const DefaultTemplate = (): TemplateResult => html`
  <sbb-lead-container>
    <style>
      .inner-container {
        display: flex;
        flex-direction: column;
        gap: var(--sbb-spacing-fixed-4x);
      }
      sbb-title {
        margin-block-start: 0;
      }
      p.lead-text {
        margin-block: 0;
      }
      p.other-content {
        margin-block-start: var(--sbb-spacing-responsive-s);
        margin-block-end: 0;
      }
    </style>
    <sbb-image slot="image" image-src=${images[6]} aspect-ratio="free"></sbb-image>
    <div class="inner-container">
      <sbb-breadcrumb-group>
        <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 1</sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 2</sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 3</sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 4</sbb-breadcrumb>
      </sbb-breadcrumb-group>
      <sbb-block-link
        icon-placement="start"
        icon-name="chevron-small-left-small"
        size="xs"
        href="https://www.sbb.ch"
      >
        Link
      </sbb-block-link>
      <sbb-title>Title</sbb-title>
    </div>
    <p class="sbb-text-xl lead-text">
      Lead text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit,
      ultricies in tincidunt quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut,
      hendrerit risus.
    </p>
    <p class="sbb-text-m other-content">
      Other content. Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula.
      Suspendisse at augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac,
      mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
      metus.
    </p>
  </sbb-lead-container>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-lead-container',
};

export default meta;
