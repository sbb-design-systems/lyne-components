import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-form-error {...args}></sbb-form-error>
);

export const sbbFormError = Template.bind({});

sbbFormError.documentation = {
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
  title: 'components/form elements/sbb-form-error'
};
