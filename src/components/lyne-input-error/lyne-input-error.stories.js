import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-input-error {...args}></lyne-input-error>
);

const message = {
  control: {
    type: 'text'
  }
};

const defaultArgTypes = {
  message
};

const defaultArgs = {
  message: 'This is a required field.'
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneInputError = Template.bind({});

LyneInputError.argTypes = defaultArgTypes;
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
  title: 'Form Elements/lyne-input-error'
};
