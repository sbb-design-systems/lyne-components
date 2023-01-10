import { h } from 'jsx-dom';
import readme from './readme.md';
import './layout.scss';

const PageSpacingTemplate = () => (
  <section class="sbb-page-spacing visualized-page-spacing">
    <div>Content</div>
  </section>
);

const PageSpacingWideTemplate = () => (
  <section class="sbb-page-spacing-wide visualized-page-spacing">
    <div>Content</div>
  </section>
);

const GridContent = () => {
  return [...Array(16)].map(() => <div></div>);
};

const Warning = () => (
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

const GridTemplate = () => [
  <div class="sbb-grid visualized-grid">
    <GridContent />
  </div>,
  <p class="sbb-page-spacing">
    <Warning />
  </p>,
];

const GridWideTemplate = () => [
  <div class="sbb-grid-wide visualized-grid">
    <GridContent />
  </div>,
  <p class="sbb-page-spacing-wide">
    <Warning />
  </p>,
];

export const PageSpacing = PageSpacingTemplate.bind({});
export const PageSpacingWide = PageSpacingWideTemplate.bind({});
export const Grid = GridTemplate.bind({});
export const GridWide = GridWideTemplate.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'padding-block: 2rem'}>
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
