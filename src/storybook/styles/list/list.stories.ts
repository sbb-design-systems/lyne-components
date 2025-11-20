import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../../elements/title.ts';

const ListContent = (): TemplateResult => html`
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
  <li>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
    <p>Other paragraph.</p>
  </li>
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>
`;

const UnorderedListTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ul class=${`sbb-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ul>
            ${ListContent()}
          </ul>
        </li>
      </ul>
    `,
  )}
`;

const OrderedListTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ol>
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
  )}
`;

const StepListTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-step-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
  )}
`;

const IconListTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-icon-list sbb-text-${textSize}`}>
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
  )}
`;

const IconListCustomIconTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol
        class=${`sbb-icon-list sbb-text-${textSize}`}
        style="--sbb-icon-list-marker-icon-color: var(--sbb-color-primary); --sbb-icon-list-marker-icon: url('https://icons.app.sbb.ch/icons/circle-cross-small.svg')"
      >
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
  )}
`;

const IconListCustomColorTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-icon-list sbb-text-${textSize}`} style="color: var(--sbb-color-green);">
        ${ListContent()}
        <li>
          Nested list
          <ol class="sbb-list">
            ${ListContent()}
          </ol>
        </li>
      </ol>
    `,
  )}
`;

const DescriptionListTemplate = (): TemplateResult => html`
  <dl class="sbb-list">
    <dt>Label:</dt>
    <dd>Description of the label.</dd>

    <dt>Longer Label:</dt>
    <dd>Description of the label which is longer than the other one.</dd>

    <dt>A very very very long label:</dt>
    <dd>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
      ipsum dolor sit amet.
    </dd>
  </dl>
`;

export const UnorderedList: StoryObj = {
  render: UnorderedListTemplate,
};

export const OrderedList: StoryObj = {
  render: OrderedListTemplate,
};

export const StepList: StoryObj = {
  render: StepListTemplate,
};

export const IconList: StoryObj = {
  render: IconListTemplate,
};

export const IconListCustomIcon: StoryObj = {
  render: IconListCustomIconTemplate,
};

export const IconListCustomColor: StoryObj = {
  render: IconListCustomColorTemplate,
};

export const DescriptionList: StoryObj = {
  render: DescriptionListTemplate,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'styles/list',
};

export default meta;
