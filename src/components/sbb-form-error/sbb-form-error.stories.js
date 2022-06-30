import { h } from 'jsx-dom';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import readme from './readme.md';

const TemplateErrorWithIconAndMessage = (args) => (
  <sbb-form-error {...args}>
    <span slot='icon'>{getMarkupForSvg('circle-information-small')}</span>
    <p slot='message'>This is a required field.</p>
  </sbb-form-error>
);

export const errorWithOnlyIconAndMessage = TemplateErrorWithIconAndMessage.bind({});

errorWithOnlyIconAndMessage.documentation = {
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
