import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import {
  defaultDisabled,
  defaultFileSelector,
  defaultMulti,
  defaultMultiPersistent,
  defaultMultiSizeS,
  defaultOnlyPDF,
  defaultWithError,
  fileSelectorDefaultArgs,
  fileSelectorDefaultArgTypes,
} from '../common/file-selector-common-stories.private.ts';

import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.component.ts';
import readme from './readme.md?raw';

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
  ...fileSelectorDefaultArgs,
  'title-content': 'Title',
  tag: 'sbb-file-selector-dropzone',
};

export const FileSelectorDropzone: StoryObj = defaultFileSelector;
export const Disabled: StoryObj = defaultDisabled;
export const Multi: StoryObj = defaultMulti;
export const MultiPersistent: StoryObj = defaultMultiPersistent;
export const WithError: StoryObj = defaultWithError;
export const OnlyPDF: StoryObj = defaultOnlyPDF;
export const MultiSizeS: StoryObj = defaultMultiSizeS;

const meta: Meta = {
  args: fileSelectorDropzoneArgs,
  argTypes: fileSelectorDropzoneArgTypes,
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbFileSelectorDropzoneElement.events.filechanged],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-file-selector/sbb-file-selector-dropzone',
};

export default meta;


import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';

import {
  defaultDisabled,
  defaultFileSelector,
  defaultMulti,
  defaultMultiPersistent,
  defaultMultiSizeS,
  defaultOnlyPDF,
  defaultWithError,
  fileSelectorDefaultArgs,
  fileSelectorDefaultArgTypes,
} from '../common/file-selector-common-stories.private.ts';

import { SbbFileSelectorElement } from './file-selector.component.ts';
import readme from './readme.md?raw';

const defaultArgTypes: ArgTypes = { ...fileSelectorDefaultArgTypes };
const defaultArgs: Args = { ...fileSelectorDefaultArgs, tag: 'sbb-file-selector' };

export const FileSelector: StoryObj = defaultFileSelector;
export const Disabled: StoryObj = defaultDisabled;
export const Multi: StoryObj = defaultMulti;
export const MultiPersistent: StoryObj = defaultMultiPersistent;
export const WithError: StoryObj = defaultWithError;
export const OnlyPDF: StoryObj = defaultOnlyPDF;
export const MultiSizeS: StoryObj = defaultMultiSizeS;

const meta: Meta = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
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
