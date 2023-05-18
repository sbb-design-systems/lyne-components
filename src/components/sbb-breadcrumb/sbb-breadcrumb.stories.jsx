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

const iconName = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  text,
  href,
  target,
  rel,
  download,
  'icon-name': iconName,
};

const defaultArgs = {
  text: 'Breadcrumb',
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: '_blank',
  rel: undefined,
  download: false,
  'icon-name': undefined,
};

const Template = ({ text, ...args }) => <sbb-breadcrumb {...args}>{text}</sbb-breadcrumb>;

export const Default = Template.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };

export const Icon = Template.bind({});
Icon.argTypes = defaultArgTypes;
Icon.args = {
  ...defaultArgs,
  text: undefined,
  'icon-name': 'house-small',
};

export const IconAndText = Template.bind({});
IconAndText.argTypes = defaultArgTypes;
IconAndText.args = {
  ...defaultArgs,
  'icon-name': 'house-small',
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
  title: 'components/sbb-breadcrumb',
};
