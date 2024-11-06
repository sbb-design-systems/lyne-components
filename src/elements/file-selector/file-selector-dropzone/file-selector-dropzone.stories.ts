import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';

import {
  fileSelectorDefaultArgs,
  fileSelectorDefaultArgTypes,
  FileSelectorTemplate,
  FileSelectorTemplateWithError,
} from '../common/file-selector-common-stories.js';

import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.js';
import readme from './readme.md?raw';

const applyComponentTag = (args: Args): Args => ({ ...args, tag: 'sbb-file-selector-dropzone' });

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const fileSelectorDropzoneArgTypes: ArgTypes = {
  ...fileSelectorDefaultArgTypes,
  'title-content': titleContent,
};

const fileSelectorDropzoneArgs: Args = {
  fileSelectorDefaultArgs,
  'title-content': 'Title',
};

const fileSelectorMultipleDropzoneArgs: Args = {
  ...fileSelectorDropzoneArgs,
  multiple: true,
  'accessibility-label': 'Select from hard disk - multiple files allowed',
};

const fileSelectorMultipleDropzoneArgsSizeS: Args = {
  ...fileSelectorMultipleDropzoneArgs,
  size: 's',
};

export const Default: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: applyComponentTag(fileSelectorDropzoneArgs),
};

export const DefaultDisabled: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: applyComponentTag({ ...fileSelectorDropzoneArgs, disabled: true }),
};

export const DefaultMulti: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: applyComponentTag(fileSelectorMultipleDropzoneArgs),
};

export const DefaultMultiPersistent: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: applyComponentTag({ ...fileSelectorMultipleDropzoneArgs, 'multiple-mode': 'persistent' }),
};

export const DefaultWithError: StoryObj = {
  render: FileSelectorTemplateWithError,
  argTypes: fileSelectorDropzoneArgTypes,
  args: applyComponentTag(fileSelectorDropzoneArgs),
};

export const DefaultOnlyPDF: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: applyComponentTag({ ...fileSelectorDropzoneArgs, accept: '.pdf' }),
};

export const DefaultMultiSizeS: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDropzoneArgTypes,
  args: applyComponentTag(fileSelectorMultipleDropzoneArgsSizeS),
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbFileSelectorDropzoneElement.events.fileChangedEvent],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-file-selector/sbb-file-selector-dropzone',
};

export default meta;
