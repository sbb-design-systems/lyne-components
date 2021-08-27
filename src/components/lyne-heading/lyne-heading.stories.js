import { h } from 'jsx-dom';
import readme from './readme.md';

const levels = {
  control: {
    type: 'radio'
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
  'level': levels,
  'visual-level': levels
};

heading.args = {
  'level': 1,
  'text': 'Sample Heading',
  'visual-level': 1
};

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'typo/Heading'
};
