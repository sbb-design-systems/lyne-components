/** @jsx h */
import type { Meta, StoryObj } from '@storybook/web-components';
import { h, type JSX } from 'jsx-dom';

import readme from './readme.md?raw';
import '../../card';

const Template = (): JSX.Element => (
  <sbb-card color="milk">
    `sbb-expansion-panel-header` is an element to be only used together with `sbb-expansion-panel`.
    See `sbb-expansion-panel` examples to see it in action.
  </sbb-card>
);
export const ExpansionPanelHeader: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion/sbb-expansion-panel-header',
};

export default meta;
