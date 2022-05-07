import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-amount {...args}></lyne-tab-amount>
);

export const story1 = Template.bind({});

story1.args = {
  'some-prop': 'opt1'
};

story1.documentation = {
  title: 'Title which will be rendered on documentation platform'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform']
  },
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/lyne-tab-amount'
};
