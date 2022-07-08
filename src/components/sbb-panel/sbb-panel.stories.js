import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-panel {...args} />;

export const sbbPanel = Template.bind({});

sbbPanel.args = {
  'button-text': 'Sample button text',
  text: 'Sample panel text',
};

sbbPanel.documentation = {
  title: 'Default',
};

export default {
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-panel (Unfinished)',
};
