import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/title.ts';

import readme from './readme.md?raw';
import './typo-internal.scss';

const text: string = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
  Lorem ipsum dolor sit amet.`;

const TextTemplate = (): TemplateResult => html`
  ${['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
    html`
      <sbb-title level=${sizes.length - index}>
        Title Level ${sizes.length - index} / Text size ${textSize}
      </sbb-title>
      <p class=${`sbb-text-${textSize}`}>${text}</p>
    `,
  ])}
`;

const TextBoldTemplate = (): TemplateResult => html`
  ${['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
    html`
      <sbb-title level=${sizes.length - index}>
        Title Level ${sizes.length - index} / Text size ${textSize}
      </sbb-title>
      <p class=${`sbb-text-${textSize} sbb-text--bold`}>${text}</p>
    `,
  ])}
`;

const LegendSubSupTemplate = (): TemplateResult => html`
  <p class="sbb-text-m">A sentence with a<sub>subscript</sub> character.</p>
  <span class="sbb-legend">
    <sup>1</sup>&nbsp;Legend text which is small and should be placed at the end.
  </span>
`;

export const Text: StoryObj = {
  render: TextTemplate,
};
export const TextBold: StoryObj = {
  render: TextBoldTemplate,
};
export const LegendSubSup: StoryObj = {
  render: LegendSubSupTemplate,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'styles/typography',
};

export default meta;
