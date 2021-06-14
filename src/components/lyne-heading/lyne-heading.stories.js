import { h } from 'jsx-dom';
import readme from './readme.md';

const levels = {
  control: {
    type: 'radio',
  },
  options: [
    1,
    2,
    3
  ]
};

export const heading = (args) => <lyne-heading
  {...args}
/>;

heading.argTypes = {
  'visual-level': levels,
  'level': levels
};

heading.args = {
  level: 1,
  'visual-level': 1,
  text: 'Sample Heading'
};

export default {
  title: 'typo/Heading',
  parameters: {
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => {
        return readme;
      }
    }
  }
};
