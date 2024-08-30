import type { Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../../elements/title.js';

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

const StepsTemplate = (): TemplateResult => html`
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

const CheckupTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol class=${`sbb-checkup-list sbb-text-${textSize}`}>
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

const CheckupCustomIconTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol
        class=${`sbb-checkup-list sbb-text-${textSize}`}
        style="--sbb-checkup-list-marker-icon-color: var(--sbb-color-red); --sbb-checkup-list-marker-icon: url('https://icons.app.sbb.ch/icons/circle-cross-medium.svg')"
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

const CheckupCustomColorTemplate = (): TemplateResult => html`
  ${['xs', 's', 'm', 'l', 'xl'].map(
    (textSize) => html`
      <sbb-title level="5">Text size ${textSize}</sbb-title>
      <ol
        class=${`sbb-checkup-list sbb-text-${textSize}`}
        style="--sbb-checkup-list-color: var(--sbb-color-green);"
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
  render: StepsTemplate,
};

export const CheckupList: StoryObj = {
  render: CheckupTemplate,
};

export const CheckupListCustomIcon: StoryObj = {
  render: CheckupCustomIconTemplate,
};

export const CheckupListCustomColor: StoryObj = {
  render: CheckupCustomColorTemplate,
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
