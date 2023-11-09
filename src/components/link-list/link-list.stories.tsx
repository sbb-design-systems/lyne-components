/** @jsx h */
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import { h, type JSX } from 'jsx-dom';

import readme from './readme.md?raw';
import '../link';
import './link-list';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-charcoal-default)'
    : 'var(--sbb-color-white-default)',
});

const LinkTemplate = (args): JSX.Element => (
  <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html">
    {args.linkTitle}
  </sbb-link>
);

const links = ['Refunds', 'Lost property office', 'Complaints', 'Praise', 'Report property damage'];

// SlottedTitle
const TemplateSlottedTitle = ({ 'title-content': titleContent, ...args }): JSX.Element => (
  <sbb-link-list {...args}>
    <span slot="title">{titleContent}</span>
    {links.map((linkTitle) => (
      <LinkTemplate {...{ linkTitle }}></LinkTemplate>
    ))}
  </sbb-link-list>
);

// TitleAsProperty
const Template = ({ ...args }): JSX.Element => (
  <sbb-link-list {...args}>
    {links.map((linkTitle) => (
      <LinkTemplate {...{ linkTitle }}></LinkTemplate>
    ))}
  </sbb-link-list>
);

const orientation: InputType = {
  control: {
    type: 'select',
  },
  options: ['vertical', 'horizontal'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  options: [true, false],
};

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const titleContent: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'List Title',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
  table: {
    category: 'List Title',
  },
};

const defaultArgTypes: ArgTypes = {
  orientation,
  'horizontal-from': horizontalFrom,
  size,
  negative,
  'title-level': titleLevel,
  'title-content': titleContent,
};

const defaultArgs: Args = {
  orientation: orientation.options[0],
  'horizontal-from': undefined,
  size: size.options[1],
  negative: false,
  'title-level': titleLevel.options[0],
  'title-content': 'Help & Contact',
};

export const LinkListDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const LinkListXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[0],
  },
};

export const LinkListNoTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'title-content': undefined,
  },
};

export const LinkListNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
  },
};

export const LinkListHorizontalFrom: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'horizontal-from': 'medium',
  },
};

export const LinkListWithSlottedTitle: StoryObj = {
  render: TemplateSlottedTitle,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), padding: '2rem' }}>
        <Story></Story>
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link-list',
};

export default meta;
