/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import './typo-internal.scss';
import type { Meta, StoryObj } from '@storybook/html';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const TextTemplate = (): JSX.Element => (
  <Fragment>
    {['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
      <sbb-title level={(sizes.length - index) as any}>
        Titel Level {sizes.length - index} / Text size {textSize}
      </sbb-title>,
      <p class={`sbb-text-${textSize}`}>{text}</p>,
    ])}
  </Fragment>
);
const TextBoldTemplate = (): JSX.Element => (
  <Fragment>
    {['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
      <sbb-title level={(sizes.length - index) as any}>
        Titel Level {sizes.length - index} / Text size {textSize}
      </sbb-title>,
      <p class={`sbb-text-${textSize} sbb-text--bold`}>{text}</p>,
    ])}
  </Fragment>
);
const LegendSubSupTemplate = (): JSX.Element => (
  <Fragment>
    <p class="sbb-text-m">
      A sentence with a<sub>subscript</sub> character.
    </p>
    <span class="sbb-legend">
      <sup>1</sup>&nbsp;Legend text which is small and should be placed at the end.
    </span>
  </Fragment>
);
const LinkInlineTemplate = (): JSX.Element => (
  <p class="sbb-text-m">
    A text with a link inside{' '}
    <a href="" class="sbb-link-inline">
      the text
    </a>
    . It should adapt to the text but have an underline and hover colors.
  </p>
);

const LinkInlineNegativeTemplate = (): JSX.Element => (
  <p
    class="sbb-text-m"
    style={{
      'background-color': 'var(--sbb-color-charcoal-default)',
      color: 'var(--sbb-color-white-default)',
      padding: '1rem',
    }}
  >
    A text with a negative link inside{' '}
    <a href="" class="sbb-link-inline-negative">
      the text
    </a>
    . It should adapt to the text but have an underline and hover colors.
  </p>
);

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
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'styles/typography',
};

export default meta;
