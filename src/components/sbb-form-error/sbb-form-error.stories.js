import { h } from 'jsx-dom';
import readme from './readme.md';

const TemplateErrorWithDefaultIconAndMessage = (args) => (
  <sbb-form-error {...args}>This is a required field.</sbb-form-error>
);

const TemplateErrorWithIconAndMessage = (args) => (
  <sbb-form-error {...args}>
    <span slot="icon"><sbb-icon name='pie-small' /></span>
    This is a required field.
  </sbb-form-error>
);

export const errorWithDefaultIconAndMessage = TemplateErrorWithDefaultIconAndMessage.bind({});

errorWithDefaultIconAndMessage.documentation = {
  title: 'sbb-form-error component with message and icon',
};

export const errorWithIconAndMessage = TemplateErrorWithIconAndMessage.bind({});

errorWithIconAndMessage.documentation = {
  title: 'sbb-form-error component with message and icon',
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
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-form-error',
};
