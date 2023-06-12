/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const numberOfBreadcrumbs: InputType = {
  control: {
    type: 'number',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const href: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Breadcrumb',
  },
};

const defaultArgTypes: ArgTypes = {
  numberOfBreadcrumbs,
  text,
  href,
  target,
  rel,
  download,
  'icon-name': iconName,
};

const defaultArgs: Args = {
  numberOfBreadcrumbs: 3,
  text: 'Breadcrumb',
  href: 'https://github.com/lyne-design-system/lyne-components',
  target: '_blank',
  rel: undefined,
  download: false,
  'icon-name': undefined,
};

const breadcrumbTemplate = (args, text: string, i: number): JSX.Element => (
  <sbb-breadcrumb {...args}>
    {text} {i}
  </sbb-breadcrumb>
);

const createBreadcrumbs = ({ numberOfBreadcrumbs, text, ...args }): JSX.Element[] => [
  <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>,
  new Array(numberOfBreadcrumbs - 1)
    .fill(undefined)
    .map((_, i) => breadcrumbTemplate(args, text, i + 1)),
];

const Template = (args): JSX.Element => (
  <sbb-breadcrumb-group>{createBreadcrumbs(args)}</sbb-breadcrumb-group>
);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const CollapsedState: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, numberOfBreadcrumbs: 25 },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
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

export default meta;
