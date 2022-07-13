import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-input-error {...args}></sbb-input-error>;

const defaultArgs = {
  message: 'This is a required field.',
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbInputError = Template.bind({});

SbbInputError.args = {
  ...defaultArgs,
};

SbbInputError.documentation = {
  title: 'Input Error',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-input-error (Unfinished)',
};
