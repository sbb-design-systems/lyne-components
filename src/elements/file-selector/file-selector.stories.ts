import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { unsafeStatic } from 'lit/static-html.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbFileSelectorDropzoneElement} from '../file-selector.ts';
import { SbbFileSelectorElement } from '../file-selector.ts';
import type { SbbErrorElement } from '../form-field.ts';

import readme from './readme.md?raw';

import '../form-field.ts';

/* eslint-disable lit/binding-positions */
const FileSelectorTemplate = ({ tag, ...args }: Args): TemplateResult =>
  html`<${unsafeStatic(tag)} ${sbbSpread(args)}></${unsafeStatic(tag)}>`;

const FileSelectorTemplateWithError = ({ tag, ...args }: Args): TemplateResult => {
  const error: SbbErrorElement = document.createElement('sbb-error');
  error.setAttribute('slot', 'error');
  error.textContent = 'There has been an error.';

  return html`
    <${unsafeStatic(tag)}
      ${sbbSpread(args)}
      id="sbb-file-selector"
      @filechanged=${(event: CustomEvent<File[]>) => {
        if (event.detail && event.detail.length > 0) {
          (event.target as SbbFileSelectorElement | SbbFileSelectorDropzoneElement)!.append(error);
        } else {
          error.remove();
        }
      }}
    ></${unsafeStatic(tag)}>
  `;
};
/* eslint-enable lit/binding-positions */

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
};

const multipleMode: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'persistent'],
};

const accept: InputType = {
  control: {
    type: 'text',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const fileSelectorDefaultArgTypes: ArgTypes = {
  tag,
  size,
  disabled,
  multiple,
  'multiple-mode': multipleMode,
  accept,
  'accessibility-label': accessibilityLabel,
};

/**
 * NOTE
 * The tag is the tagName of the component to display in stories,
 * so it must be overridden before use.
 */
const fileSelectorDefaultArgs: Args = {
  size: size.options![0],
  disabled: false,
  multiple: false,
  'multiple-mode': multipleMode.options![0],
  accept: undefined,
  'accessibility-label': 'Select from hard disk',
};

const fileSelectorMultipleDefaultArgs: Args = {
  ...fileSelectorDefaultArgs,
  multiple: true,
  'accessibility-label': 'Select from hard disk - multiple files allowed',
};

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = { ...fileSelectorDefaultArgTypes };
const defaultArgs: Args = { ...fileSelectorDefaultArgs, tag: 'sbb-file-selector' };

export const FileSelector: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};
export const Disabled: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};
export const Multi: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, ...fileSelectorMultipleDefaultArgs },
};
export const MultiPersistent: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, ...fileSelectorMultipleDefaultArgs, 'multiple-mode': 'persistent' },
};
export const WithError: StoryObj = {
  render: FileSelectorTemplateWithError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};
export const OnlyPDF: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, accept: '.pdf' },
};
export const MultiSizeS: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, ...fileSelectorMultipleDefaultArgs, size: 's' },
};

const fileSelectorDropzoneArgTypes: ArgTypes = {
  ...fileSelectorDefaultArgTypes,
  'title-content': titleContent,
};

const fileSelectorDropzoneArgs: Args = {
  ...fileSelectorDefaultArgs,
  'title-content': 'Title',
  tag: 'sbb-file-selector-dropzone',
};

export const FileSelectorDropzone: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: { ...fileSelectorDropzoneArgs },
};
export const DisabledDropzone: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: { ...fileSelectorDropzoneArgs, disabled: true },
};
export const MultiDropzone: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: { ...fileSelectorDropzoneArgs, ...fileSelectorMultipleDefaultArgs },
};
export const MultiPersistentDropzone: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: {
    ...fileSelectorDropzoneArgs,
    ...fileSelectorMultipleDefaultArgs,
    'multiple-mode': 'persistent',
  },
};
export const WithErrorDropzone: StoryObj = {
  render: FileSelectorTemplateWithError,
  argTypes: fileSelectorDropzoneArgTypes,
  args: { ...fileSelectorDropzoneArgs },
};
export const OnlyPDFDropzone: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: { ...fileSelectorDropzoneArgs, accept: '.pdf' },
};
export const MultiSizeSDropzone: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: { ...fileSelectorDropzoneArgs, ...fileSelectorMultipleDefaultArgs, size: 's' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbFileSelectorElement.events.filechanged],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-file-selector/sbb-file-selector',
};

export default meta;
