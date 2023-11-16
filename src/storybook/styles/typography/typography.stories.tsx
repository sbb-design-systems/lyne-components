import type { Meta, StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import '../../../components/title';

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
        Titel Level ${sizes.length - index} / Text size ${textSize}
      </sbb-title>
      <p class=${`sbb-text-${textSize}`}>${text}</p>
    `,
  ])}
`;

const TextBoldTemplate = (): TemplateResult => html`
  ${['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
    html`
      <sbb-title level=${sizes.length - index}>
        Titel Level ${sizes.length - index} / Text size ${textSize}
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

const LinkInlineTemplate = (): TemplateResult => html`
  <p class="sbb-text-m">
    A text with a link inside{' '}
    <a href="" class="sbb-link-inline"> the text </a>
    . It should adapt to the text but have an underline and hover colors.
  </p>
`;

const LinkInlineNegativeTemplate = (): TemplateResult => html`
  <p
    class="sbb-text-m"
    style="background-color: var(--sbb-color-charcoal-default); color: var(--sbb-color-white-default); padding: 1rem;"
  >
    A text with a negative link inside ${' '}
    <a href="" class="sbb-link-inline-negative"> the text </a>
    . It should adapt to the text but have an underline and hover colors.
  </p>
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
export const LinkInline: StoryObj = {
  render: LinkInlineTemplate,
};
export const LinkInlineNegative: StoryObj = {
  render: LinkInlineNegativeTemplate,
};

const meta: Meta = {
  excludeStories: ['LinkInline', 'LinkInlineNegative'],
  decorators: [(story) => html` <div style="padding: 2rem;">${story()}</div> `],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'styles/typography',
};

export default meta;
