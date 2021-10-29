import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-link {...args}></lyne-link>
);

const linkText = {
  control: {
    type: 'text'
  }
};

const textSize = {
  control: {
    type: 'select'
  },
  options: [
    'xs',
    's',
    'm'
  ]
};

const defaultArgTypes = {
  'link-text': linkText,
  'text-size': texSize
};

const defaultArgs = {
  'link-text': 'Meine Billete & Abos',
  'text-size': texSize.options[2]
};

export const textLink = Template.bind({});
textLink.argTypes = defaultArgTypes;
textLink.args = JSON.parse(JSON.stringify(defaultArgs));

textLink.args = {
  'text-size': texSize.options[0]
};

textLink.documentation = {
  title: 'Text Link Size XS'
};

export default {
  decorators: [
    (Story) => (
      <div lang="de" style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-link'
};
