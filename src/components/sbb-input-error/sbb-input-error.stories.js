import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-input-error {...args}></lyne-input-error>
);

const defaultArgs = {
  message: 'This is a required field.'
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneInputError = Template.bind({});

LyneInputError.args = {
  ...defaultArgs
};

LyneInputError.documentation = {
  title: 'Input Error'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/form elements/lyne-input-error'
};
