import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-title
    level={args.level}
    text={args.text}
    visually-hidden={args.visuallyHidden}
    visual-level={args.visualLevel}
    rtl={args.rightToLeftSupport}
  />
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
  'visualLevel': levels
};

title.args = {
  'text': 'Sample Title Text',
  'level': 1,
  'visualLevel': 1,
  'visuallyHidden': false,
  'rightToLeftSupport': false
};

export default {
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
      extractComponentDescription: () => readme
    }
  },
  title: 'typo/Title'
};
