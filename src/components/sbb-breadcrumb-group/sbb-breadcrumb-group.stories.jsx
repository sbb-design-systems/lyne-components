import { h } from 'jsx-dom';
import readme from './readme.md';

const numberOfBreadcrumbs = {
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
  numberOfBreadcrumbs,
  text,
  href,
  target,
  rel,
  download,
  'icon-name': iconName,
};

const defaultArgs = {
  numberOfBreadcrumbs: 3,
  text: 'Breadcrumb',
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: '_blank',
  rel: undefined,
  download: false,
  'icon-name': undefined,
};

const breadcrumbTemplate = ({ text, ...args }, i) => (
  <sbb-breadcrumb {...args}>
    {text} {i}
  </sbb-breadcrumb>
);

const createBreadcrumbs = ({ numberOfBreadcrumbs, ...args }) => [
  <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>,
  new Array(numberOfBreadcrumbs - 1).fill(undefined).map((_, i) => breadcrumbTemplate(args, i + 1)),
];

const Template = (args) => <sbb-breadcrumb-group>{createBreadcrumbs(args)}</sbb-breadcrumb-group>;

export const Default = Template.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };

export const CollapsedState = Template.bind({});
CollapsedState.argTypes = defaultArgTypes;
CollapsedState.args = { ...defaultArgs, numberOfBreadcrumbs: 25 };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
        Page content
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
