import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-navigation-action {...args}>Some text</sbb-navigation-action>;

export const Default = Template.bind({});

Default.args = {
  size: 's',
};

Default.documentation = {
  title: 'Title which will be rendered on documentation platform',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform'],
  },
  parameters: {
    actions: {
      handles: [],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/navigation/sbb-navigation-action',
};
