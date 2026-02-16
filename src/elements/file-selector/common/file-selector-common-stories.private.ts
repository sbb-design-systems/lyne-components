import type { Args, ArgTypes, StoryObj } from '@storybook/web-components-vite';
import { type TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import type { SbbErrorElement } from '../../form-field.ts';
import type { SbbFileSelectorDropzoneElement } from '../file-selector-dropzone.ts';
import type { SbbFileSelectorElement } from '../file-selector.ts';

import '../../form-field.ts';

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
export const FileSelectorTemplate = ({ tag, ...args }: Args): TemplateResult =>
  html`<${unsafeStatic(tag)} ${sbbSpread(args)}></${unsafeStatic(tag)}>`;

export const FileSelectorTemplateWithError = ({ tag, ...args }: Args): TemplateResult => {
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
/* eslint-enable lit/binding-positions, @typescript-eslint/naming-convention */

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

export const fileSelectorDefaultArgTypes: ArgTypes = {
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
export const fileSelectorDefaultArgs: Args = {
  size: size.options![0],
  disabled: false,
  multiple: false,
  'multiple-mode': multipleMode.options![0],
  accept: undefined,
  'accessibility-label': 'Select from hard disk',
};

export const fileSelectorMultipleDefaultArgs: Args = {
  ...fileSelectorDefaultArgs,
  multiple: true,
  'accessibility-label': 'Select from hard disk - multiple files allowed',
};

export const defaultFileSelector: StoryObj = {
  render: FileSelectorTemplate,
};

export const defaultDisabled: StoryObj = {
  render: FileSelectorTemplate,
  args: { disabled: true },
};

export const defaultMulti: StoryObj = {
  render: FileSelectorTemplate,
  args: fileSelectorMultipleDefaultArgs,
};

export const defaultMultiPersistent: StoryObj = {
  render: FileSelectorTemplate,
  args: { ...fileSelectorMultipleDefaultArgs, 'multiple-mode': 'persistent' },
};

export const defaultWithError: StoryObj = {
  render: FileSelectorTemplateWithError,
};

export const defaultOnlyPDF: StoryObj = {
  render: FileSelectorTemplate,
  args: { accept: '.pdf' },
};

export const defaultMultiSizeS: StoryObj = {
  render: FileSelectorTemplate,
  args: { ...fileSelectorMultipleDefaultArgs, size: 's' },
};
