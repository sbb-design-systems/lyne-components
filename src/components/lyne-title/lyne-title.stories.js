import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-title {...args} />
);

const levels = {
  control: {
    type: 'inline-radio'
  },
  options: [
    1,
    2,
    3,
    4,
    5,
    6
  ]
};

export const title = Template.bind({});

title.argTypes = {
  'level': levels,
  'visual-level': levels
};

title.args = {
  'level': 1,
  'text': 'Data without insights are trivial, and insights without action are pointless',
  'title-id': '',
  'visual-level': 1,
  'visually-hidden': false
};

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'typo/Title'
};
