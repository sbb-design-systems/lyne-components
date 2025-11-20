import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './link-list-anchor.component.ts';
import '../../link/block-link.ts';

const links = ['Refunds', 'Lost property office', 'Complaints', 'Praise', 'Report property damage'];

const LinkTemplate = (args: Args): TemplateResult => html`
  <sbb-block-link
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    target="_blank"
  >
    ${args.linkTitle}
  </sbb-block-link>
`;

const TemplateSlottedTitle = ({
  'title-content': titleContent,
  ...args
}: Args): TemplateResult => html`
  <sbb-link-list-anchor ${sbbSpread(args)}>
    <span slot="title">${titleContent}</span>
    ${links.map((linkTitle) => html` ${LinkTemplate({ linkTitle })} `)}
  </sbb-link-list-anchor>
`;

const Template = (args: Args): TemplateResult => html`
  <sbb-link-list-anchor ${sbbSpread(args)}>
    ${links.map((linkTitle) => html` ${LinkTemplate({ linkTitle })} `)}
  </sbb-link-list-anchor>
`;

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
  negative,
  size,
  'title-level': titleLevel,
  'title-content': titleContent,
};

const defaultArgs: Args = {
  negative: false,
  size: size.options![1],
  'title-level': titleLevel.options![0],
  'title-content': 'Help & Contact',
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![0],
  },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![2],
  },
};

export const SlottedTitle: StoryObj = {
  render: TemplateSlottedTitle,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-2-negative)'
        : 'var(--sbb-background-color-2)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-link-list/sbb-link-list-anchor',
};

export default meta;
