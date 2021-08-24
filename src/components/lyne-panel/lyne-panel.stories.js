import { h } from 'jsx-dom';
import readme from './readme.md';

// --- Component

const Template = (args) => (
  <lyne-panel {...args} />
);

export const lynePanel = Template.bind({});

lynePanel.args = {
  buttonText: 'Sample button text',
  text: 'Sample panel text'
};

export default {
  parameters: {
    backgrounds: {
      disable: true
    },
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-panel'
};
