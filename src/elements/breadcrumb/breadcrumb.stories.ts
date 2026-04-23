import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbBreadcrumbGroupElement } from '../breadcrumb.ts';

import readme from './readme.md?raw';

import '../button.ts';
import '../breadcrumb.ts';

const addBreadcrumb = (event: Event): void => {
  const breadcrumbGroup = (event.target as HTMLElement)
    .closest('.container')!
    .querySelector<SbbBreadcrumbGroupElement>('sbb-breadcrumb-group')!;
  const breadcrumb = document.createElement('sbb-breadcrumb');
  breadcrumb.setAttribute('href', '/');
  breadcrumb.textContent = 'Link ' + breadcrumbGroup.children.length;
  breadcrumbGroup.append(breadcrumb);
};

const removeBreadcrumb = (event: Event): void => {
  const breadcrumbGroup = (event.target as HTMLElement)
    .closest('.container')!
    .querySelector<SbbBreadcrumbGroupElement>('sbb-breadcrumb-group')!;
  if (breadcrumbGroup.children.length > 1) {
    breadcrumbGroup.removeChild(breadcrumbGroup.lastElementChild!);
  }
};

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

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
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

const groupArgTypes: ArgTypes = {
  numberOfBreadcrumbs,
  text,
  href,
  target,
  rel,
  download,
  'icon-name': iconName,
};

const groupArgs: Args = {
  numberOfBreadcrumbs: 3,
  text: 'Link',
  href: 'https://github.com/sbb-design-systems/lyne-components',
  target: '_blank',
  rel: undefined,
  download: false,
  'icon-name': undefined,
};

const breadcrumbTemplate = (args: Args, text: string, i: number): TemplateResult => html`
  <sbb-breadcrumb ${sbbSpread(args)}> ${text} ${i} </sbb-breadcrumb>
`;

const createBreadcrumbs = ({ numberOfBreadcrumbs, text, ...args }: Args): TemplateResult => html`
  <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
  ${new Array(numberOfBreadcrumbs - 1)
    .fill(undefined)
    .map((_, i) => breadcrumbTemplate(args, text, i + 1))}
`;

const GroupTemplate = (args: Args): TemplateResult => html`
  <div class="container">
    <sbb-breadcrumb-group aria-label="You are here:">
      ${createBreadcrumbs(args)}
    </sbb-breadcrumb-group>
    <sbb-mini-button-group size="s" style="margin-block-start: 2rem;">
      <sbb-mini-button icon-name="minus-small" @click=${(event: Event) => removeBreadcrumb(event)}>
        Remove
      </sbb-mini-button>
      <sbb-mini-button icon-name="plus-small" @click=${(event: Event) => addBreadcrumb(event)}>
        Add
      </sbb-mini-button>
    </sbb-mini-button-group>
  </div>
`;

export const Default: StoryObj = {
  render: GroupTemplate,
  argTypes: groupArgTypes,
  args: { ...groupArgs },
};

export const CollapsedState: StoryObj = {
  render: GroupTemplate,
  argTypes: groupArgTypes,
  args: { ...groupArgs, numberOfBreadcrumbs: 25 },
};

const defaultArgTypes: ArgTypes = {
  text,
  href,
  target,
  rel,
  download,
  'icon-name': iconName,
};

const defaultArgs: Args = {
  text: 'Breadcrumb',
  href: href.options![0],
  target: '_blank',
  rel: undefined,
  download: false,
  'icon-name': undefined,
};

const Template = ({ text, ...args }: Args): TemplateResult => html`
  <sbb-breadcrumb ${sbbSpread(args)}>${text}</sbb-breadcrumb>
`;

const SlottedIconTemplate = ({
  text,
  'icon-name': iconName,
  ...args
}: Args): TemplateResult => html`
  <sbb-breadcrumb ${sbbSpread(args)}>
    ${text}
    <sbb-icon slot="icon" name=${iconName}></sbb-icon>
  </sbb-breadcrumb>
`;

export const Breadcrumb: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Icon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: undefined,
    'icon-name': 'house-small',
  },
};

export const IconAndText: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'house-small',
  },
};

export const SlottedIconAndText: StoryObj = {
  render: SlottedIconTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'globe-small',
    text: 'Custom slotted icon',
  },
};

export const LongContent: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': 'house-small',
    text: 'This label name is so long that it needs ellipsis to fit.',
  },
  decorators: [(story) => html`<div style="max-width: 200px;">${story()}</div>`],
};

export const NoLink: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, href: undefined, target: undefined },
};

const meta: Meta = {
  decorators: [(story) => html` <div style="max-width: 1000px;">${story()}</div> `],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Breadcrumb',
};

export default meta;
