import { h } from 'jsx-dom';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import readme from './readme.md';

const TemplateErrorWithDefaultIconAndMessage = (args) => (
  <sbb-form-error {...args}>
    <span class='input-label-error'>
      This is a required field.
    </span>
  </sbb-form-error>
);

const TemplateErrorWithIconAndMessage = (args) => (
  <sbb-form-error {...args}>
    <span slot='icon' class='input-label-error__icon'>{getMarkupForSvg('pie-small')}</span>
    <span class='input-label-error'>      
      This is a required field.
    </span>
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
