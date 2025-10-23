import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';

import '../alert.js';
import '../breadcrumb.js';
import '../chip-label.js';
import '../container.js';
import '../image.js';
import '../link/block-link.js';
import '../link/link.js';
import '../notification.js';
import '../title.js';
import './lead-container.component.js';

import images from '../core/images.js';

import readme from './readme.md?raw';

const content = (): TemplateResult => html`
  <style>
    p.other-content {
      margin-block: 0;
    }
  </style>
  <sbb-alert-group class="sbb-lead-container-spacing">
    <sbb-alert size="m">
      <sbb-title level="3">Interruption between Genève and Lausanne</sbb-title>
      The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
      <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
    </sbb-alert>
  </sbb-alert-group>
  <sbb-breadcrumb-group class="sbb-lead-container-spacing">
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
    class="sbb-lead-container-spacing"
  >
    Link
  </sbb-block-link>
  <sbb-title class="sbb-lead-container-spacing">Title</sbb-title>
  <p class="sbb-text-xl sbb-lead-container-lead-text">
    Lead text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies
    in tincidunt quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit
    risus.
  </p>
  <sbb-notification type="info" class="sbb-lead-container-spacing">
    Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at
    augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac, mollis efficitur
    lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat metus.
  </sbb-notification>
  <p class="sbb-text-m other-content">
    Other content. Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula.
    Suspendisse at augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac, mollis
    efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat metus.
  </p>
`;

const DefaultTemplate = (): TemplateResult => html`
  <sbb-lead-container>
    ${content()}
    <sbb-image
      slot="image"
      image-src=${images[6]}
      alt="Station of Lucerne from outside"
    ></sbb-image>
  </sbb-lead-container>
`;

const WithChipTemplate = (): TemplateResult => html`
  <sbb-lead-container>
    ${content()}

    <figure class="sbb-figure" slot="image">
      <sbb-image image-src=${images[6]} alt="Station of Lucerne from outside"></sbb-image>

      <sbb-chip-label color="charcoal" class="sbb-figure-overlap-start-end">
        AI generated
      </sbb-chip-label>
    </figure>
  </sbb-lead-container>
`;

/**
 * Hidden example to show how to achieve a sticky bar inside a lead container.
 */
const StickyBarTemplate = (): TemplateResult => html`
  <style>
    sbb-container {
      margin-block-end: calc(2 * var(--sbb-spacing-responsive-l));

      --column-shift: 0;
      --full-width: 100%;
      @media (min-width: 64rem) {
        --column-shift: 1;
      }
      @media (min-width: 90rem) {
        --column-shift: 3;
        --full-width: min(
          100%,
          var(--sbb-layout-base-page-max-width) + 2 * var(--sbb-layout-base-offset-responsive)
        );
      }
      --sbb-page-spacing-padding: calc(
        var(--sbb-layout-base-offset-responsive) + var(--column-shift) *
          (
            (
                (var(--full-width) - 2 * var(--sbb-layout-base-offset-responsive)) -
                  ((var(--sbb-grid-base-columns) - 1) * var(--sbb-grid-base-gutter-responsive))
              ) /
              var(--sbb-grid-base-columns)
          ) +
          var(--sbb-grid-base-gutter-responsive) * var(--column-shift)
      );

      p {
        margin-block-start: 0;
      }
    }

    sbb-lead-container {
      --sbb-lead-container-content-padding-block: var(--sbb-spacing-responsive-l) 0;
      --sbb-lead-container-padding-block: 0;
    }
  </style>
  <sbb-lead-container>
    <sbb-image
      slot="image"
      image-src=${images[6]}
      alt="Station of Lucerne from outside"
    ></sbb-image>
    <sbb-title class="sbb-lead-container-spacing">Title</sbb-title>
  </sbb-lead-container>
  <sbb-container>
    <p class="sbb-text-xl sbb-lead-container-lead-text">
      Lead text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit,
      ultricies in tincidunt quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut,
      hendrerit risus.
    </p>
    <sbb-sticky-bar color="milk">Sticky</sbb-sticky-bar>
  </sbb-container>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
};

export const WithChip: StoryObj = {
  render: WithChipTemplate,
};

export const StickyBar: StoryObj = {
  render: StickyBarTemplate,
};

const meta: Meta = {
  excludeStories: ['StickyBar'],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-lead-container',
};

export default meta;
