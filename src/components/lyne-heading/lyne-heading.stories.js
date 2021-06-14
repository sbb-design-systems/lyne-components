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

export const level1 = (args) => <lyne-heading
  {...args}
/>;

level1.argTypes = {
  'visual-level': levels,
  'level': levels
};

level1.args = {
  level: 1,
  'visual-level': 1,
  text: 'Sample Heading'
};

export default {
  title: 'Lyne Heading',
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
