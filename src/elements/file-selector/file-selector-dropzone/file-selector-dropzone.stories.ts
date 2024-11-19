import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';

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
} from '../common/file-selector-common-stories.js';

import { SbbFileSelectorDropzoneElement } from './file-selector-dropzone.js';
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

export const DefaultFileSelectorDropzone: StoryObj = defaultFileSelector;
export const DefaultDisabled: StoryObj = defaultDisabled;
export const DefaultMulti: StoryObj = defaultMulti;
export const DefaultMultiPersistent: StoryObj = defaultMultiPersistent;
export const DefaultWithError: StoryObj = defaultWithError;
export const DefaultOnlyPDF: StoryObj = defaultOnlyPDF;
export const DefaultMultiSizeS: StoryObj = defaultMultiSizeS;

const meta: Meta = {
  args: fileSelectorDropzoneArgs,
  argTypes: fileSelectorDropzoneArgTypes,
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
