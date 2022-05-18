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

lynePanel.documentation = {
  title: 'Default'
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
  title: 'components/lyne-panel'
};
