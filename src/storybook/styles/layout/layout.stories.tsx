/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import './layout.scss';
import type { Meta, StoryObj } from '@storybook/html';

const PageSpacingTemplate = (): JSX.Element => (
  <section class="sbb-page-spacing visualized-page-spacing">
    <div>Content</div>
  </section>
);

const PageSpacingExpandedTemplate = (): JSX.Element => (
  <section class="sbb-page-spacing-expanded visualized-page-spacing">
    <div>Content</div>
  </section>
);

const GridContent = (): JSX.Element[] => {
  return [...Array(16)].map(() => <div></div>);
};

const Warning = (): JSX.Element => (
  <span class="sbb-text-s">
    This example only intends to visualize the grid and is not meant to be used as is.
    <br />
    <sbb-link
      variant="inline"
      href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"
    >
      See docs on css grid
    </sbb-link>
    .
  </span>
);

const GridTemplate = (): JSX.Element => (
  <Fragment>
    <div class="sbb-grid visualized-grid">
      <GridContent />
    </div>
    <p class="sbb-page-spacing">
      <Warning />
    </p>
  </Fragment>
);
const GridExpandedTemplate = (): JSX.Element => (
  <Fragment>
    <div class="sbb-grid-expanded visualized-grid">
      <GridContent />
    </div>
    <p class="sbb-page-spacing-expanded">
      <Warning />
    </p>
  </Fragment>
);
export const PageSpacing: StoryObj = {
  render: PageSpacingTemplate,
};
export const PageSpacingExpanded: StoryObj = {
  render: PageSpacingExpandedTemplate,
};
export const Grid: StoryObj = {
  render: GridTemplate,
};
export const GridExpanded: StoryObj = {
  render: GridExpandedTemplate,
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ 'padding-block': '2rem' }}>
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
  title: 'styles/layout',
};

export default meta;
