import { h } from 'jsx-dom';
import readme from './readme.md';

const text = {
  control: {
    type: 'text',
  },
};

const href = {
  control: {
    type: 'text',
  },
};

const target = {
  control: {
    type: 'text',
  },
};

const rel = {
  control: {
    type: 'text',
  },
};

const download = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  text,
  href,
  target,
  rel,
  download,
};

const defaultArgs = {
  text: 'Breadcrumb',
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: '_blank',
  rel: undefined,
  download: false,
};

const Template = ({ text, ...args }) => <sbb-breadcrumb {...args}>{text}</sbb-breadcrumb>;

export const Default = Template.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };

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
  title: 'components/sbb-breadcrumb',
};
