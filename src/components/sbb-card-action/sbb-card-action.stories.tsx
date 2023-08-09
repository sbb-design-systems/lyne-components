/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj } from '@storybook/html';

const Template = (): JSX.Element => (
  <sbb-card color="milk">
    `sbb-card-action` is an invisible action element. See `sbb-card` examples to see it in action.
  </sbb-card>
);

export const SbbCardAction: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-card/sbb-card-action',
};

export default meta;
