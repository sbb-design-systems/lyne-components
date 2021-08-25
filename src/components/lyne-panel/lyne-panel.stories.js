import { h } from 'jsx-dom';
import readme from './readme.md';

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
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-panel'
};
