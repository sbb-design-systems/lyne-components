import { h } from 'jsx-dom';
import readme from './readme.md';
import { viewports } from '../../../.storybook/global-config';

// --- Component

const Template = (args) => (
  <lyne-panel {...args} />
);

export const lynePanel = Template.bind({});

lynePanel.args = {
  'button-text': 'Sample button text',
  'text': 'Sample panel text'
};

export default {
  parameters: {
    backgrounds: {
      disable: true
    },
    chromatic: {
      delay: 1000,
      viewports
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-panel'
};
