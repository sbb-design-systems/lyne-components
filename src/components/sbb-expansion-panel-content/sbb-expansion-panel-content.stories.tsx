/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj } from '@storybook/html';

const Template = (): JSX.Element => (
  <sbb-card color="milk">
    `sbb-expansion-panel-content` is an element to be only used together with `sbb-expansion-panel`.
    See `sbb-expansion-panel` examples to see it in action.
  </sbb-card>
);

export const ExpansionPanelContent: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion/sbb-expansion-panel-content',
};

export default meta;
