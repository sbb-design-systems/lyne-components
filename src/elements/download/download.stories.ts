import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import type { SbbDownloadElement } from '../download.ts';

import readme from './readme.md?raw';
import '../download.ts';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const href: InputType = {
  control: {
    type: 'text',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'] satisfies SbbDownloadElement['color'][],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const type: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'text',
  },
};

const changed: InputType = {
  control: {
    type: 'text',
  },
};

const nonAccessible: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  label,
  href,
  color,
  'icon-name': iconName,
  type,
  size,
  changed,
  'non-accessible': nonAccessible,
};

const defaultArgs: Args = {
  label: undefined,
  href: 'https://www.sbb.ch/annual-report.pdf',
  color: 'white',
  'icon-name': undefined,
  type: undefined,
  size: '1234567',
  changed: '2026-12-24',
  'non-accessible': false,
};

const downloadWrapper = (
  { label, href, color, 'icon-name': iconName }: Args,
  content: TemplateResult,
): TemplateResult => html`
  <sbb-download
    label=${label || nothing}
    href=${href || nothing}
    color=${color}
    icon-name=${iconName || nothing}
  >
    ${content}
  </sbb-download>
`;

const customContent = (): TemplateResult =>
  html`<span>Custom description for the downloadable document.</span>`;

const infoBlock = (infoArgs: Args): TemplateResult =>
  html`<sbb-download-info ${sbbSpread(infoArgs)}></sbb-download-info>`;

// Renders only the `sbb-download-info` block.
const Template = ({
  label,
  href,
  color,
  'icon-name': iconName,
  ...infoArgs
}: Args): TemplateResult =>
  downloadWrapper(
    {
      label,
      href,
      color,
      'icon-name': iconName,
    },
    infoBlock(infoArgs),
  );

const SlottedIconTemplate = ({
  label,
  href,
  color,
  'icon-name': _iconName,
  ...infoArgs
}: Args): TemplateResult =>
  downloadWrapper(
    {
      label,
      href,
      color,
    },
    html`
      <sbb-icon slot="icon" name="circle-information-small"></sbb-icon>
      ${infoBlock(infoArgs)}
    `,
  );

// Renders only custom content in the unnamed slot, without a `sbb-download-info`.
const CustomContentTemplate = ({
  label,
  href,
  color,
  'icon-name': iconName,
}: Args): TemplateResult =>
  downloadWrapper(
    {
      label,
      href,
      color,
      'icon-name': iconName,
    },
    customContent(),
  );

// Renders both custom content and a `sbb-download-info` block.
const CustomContentAndInfoTemplate = ({
  label,
  href,
  color,
  'icon-name': iconName,
  ...infoArgs
}: Args): TemplateResult =>
  downloadWrapper(
    {
      label,
      href,
      color,
      'icon-name': iconName,
    },
    html`${customContent()} ${infoBlock(infoArgs)}`,
  );

// Renders neither custom content nor a `sbb-download-info` block.
const NoContentTemplate = ({ label, href, color, 'icon-name': iconName }: Args): TemplateResult =>
  downloadWrapper({ label, href, color, 'icon-name': iconName }, html``);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const CustomLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'Annual report',
  },
};

export const LongDocumentTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label:
      "Annual report with a pretty long title to showcase truncation of the download component's label text",
  },
};

export const CustomType: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: 'PSD',
  },
};

export const WithoutSize: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: undefined,
  },
};

export const WithoutChanged: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    changed: undefined,
  },
};

export const NonAccessible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'non-accessible': true,
    type: 'PDF',
    size: '123 KB',
  },
};

export const CustomIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'Annual report',
    'icon-name': 'circle-information-small',
  },
};

export const CustomIconSlot: StoryObj = {
  render: SlottedIconTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'Annual report',
  },
};

export const CustomContentOnly: StoryObj = {
  render: CustomContentTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'Annual report',
  },
};

export const CustomContentAndInfo: StoryObj = {
  render: CustomContentAndInfoTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'Annual report',
  },
};

export const WithoutSlottedContent: StoryObj = {
  render: NoContentTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'Annual report',
  },
};

export const Milk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: 'milk',
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.color === 'milk'
        ? 'var(--sbb-background-color-1)'
        : 'var(--sbb-background-color-3)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Download',
};

export default meta;
