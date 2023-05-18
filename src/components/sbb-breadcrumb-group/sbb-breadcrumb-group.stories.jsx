import { h } from 'jsx-dom';
import readme from './readme.md';

const numberOfBreadcrumb = {
  control: {
    type: 'number',
  },
};

const text = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const target = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const rel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const download = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const defaultArgTypes = {
  numberOfBreadcrumb,
  text,
  href,
  target,
  rel,
  download,
  'icon-name': iconName,
};

const defaultArgs = {
  numberOfBreadcrumb: 8,
  text: 'Breadcrumb',
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: '_blank',
  rel: undefined,
  download: false,
  'icon-name': undefined,
};

const breadcrumbTemplate = ({ text, ...args }) => <sbb-breadcrumb {...args}>{text}</sbb-breadcrumb>;

const createBreadcrumbs = ({ numberOfBreadcrumb, ...args }) => [
  <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>,
  new Array(numberOfBreadcrumb - 1).fill(undefined).map(() => breadcrumbTemplate(args)),
];

const Template = (args) => <sbb-breadcrumb-group>{createBreadcrumbs(args)}</sbb-breadcrumb-group>;

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
  title: 'components/sbb-breadcrumb-group',
};
