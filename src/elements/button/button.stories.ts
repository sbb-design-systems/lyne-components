import type { Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../button.ts';

export const Overview: StoryObj = {
  render: () => html`
    <table class="sbb-table sbb-table--unstriped">
      <thead>
        <tr>
          <th>State</th>
          <th>Primary</th>
          <th>Secondary</th>
          <th>Accent</th>
          <th>Transparent</th>
        </tr>
      </thead>
    </table>
  `,
};

/*

export const commonDecorators = [
  (story: () => WebComponentsRenderer['storyResult'], context: StoryContext) =>
    context.args.negative
      ? html`
          <div style="--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark)">
            ${story()}
          </div>
        `
      : story(),
  withActions as Decorator,
];

*/

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-button/sbb-button',
};

export default meta;
