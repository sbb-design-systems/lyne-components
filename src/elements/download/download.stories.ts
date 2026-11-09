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

const downloadCategory = { table: { category: 'Download' } };
const downloadInfoCategory = { table: { category: 'Download Info' } };

const label: InputType = {
  control: {
    type: 'text',
  },
  ...downloadCategory,
};

const href: InputType = {
  control: {
    type: 'text',
  },
  ...downloadCategory,
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  ...downloadCategory,
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'] satisfies SbbDownloadElement['color'][],
  ...downloadCategory,
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  ...downloadCategory,
};

const type: InputType = {
  control: {
    type: 'text',
  },
  ...downloadInfoCategory,
};

const size: InputType = {
  control: {
    type: 'text',
  },
  ...downloadInfoCategory,
};

const changed: InputType = {
  control: {
    type: 'text',
  },
  ...downloadInfoCategory,
};

const nonAccessible: InputType = {
  control: {
    type: 'boolean',
  },
  ...downloadInfoCategory,
};

const defaultArgTypes: ArgTypes = {
  label,
  href,
  download,
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
  download: false,
  color: 'white',
  'icon-name': undefined,
  type: undefined,
  size: '1234567',
  changed: '2026-12-24',
  'non-accessible': false,
};

const downloadWrapper = (
  { label, href, download, color, 'icon-name': iconName }: Args,
  content: TemplateResult,
): TemplateResult => html`
  <sbb-download
    label=${label || nothing}
    href=${href || nothing}
    ?download=${download}
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

// Splits the story args into the args of the `sbb-download` and the ones of
// the `sbb-download-info`.
const splitArgs = ({
  label,
  href,
  download,
  color,
  'icon-name': iconName,
  ...infoArgs
}: Args): { downloadArgs: Args; infoArgs: Args } => ({
  downloadArgs: { label, href, download, color, 'icon-name': iconName },
  infoArgs,
});

// Renders only the `sbb-download-info` block.
const Template = (args: Args): TemplateResult => {
  const { downloadArgs, infoArgs } = splitArgs(args);
  return downloadWrapper(downloadArgs, infoBlock(infoArgs));
};

const SlottedIconTemplate = (args: Args): TemplateResult => {
  const { downloadArgs, infoArgs } = splitArgs(args);
  return downloadWrapper(
    { ...downloadArgs, 'icon-name': undefined },
    html`
      <sbb-icon slot="icon" name="circle-information-small"></sbb-icon>
      ${infoBlock(infoArgs)}
    `,
  );
};

// Renders only custom content in the unnamed slot, without a `sbb-download-info`.
const CustomContentTemplate = (args: Args): TemplateResult =>
  downloadWrapper(splitArgs(args).downloadArgs, customContent());

// Renders both custom content and a `sbb-download-info` block.
const CustomContentAndInfoTemplate = (args: Args): TemplateResult => {
  const { downloadArgs, infoArgs } = splitArgs(args);
  return downloadWrapper(downloadArgs, html`${customContent()} ${infoBlock(infoArgs)}`);
};

// Renders neither custom content nor a `sbb-download-info` block.
const NoContentTemplate = (args: Args): TemplateResult =>
  downloadWrapper(splitArgs(args).downloadArgs, html``);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Download: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    download: true,
  },
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
