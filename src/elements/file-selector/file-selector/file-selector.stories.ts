import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components';

import {
  fileSelectorDefaultArgs,
  fileSelectorDefaultArgTypes,
  fileSelectorMultipleDefaultArgs,
  FileSelectorTemplate,
  FileSelectorTemplateWithError,
} from '../common/file-selector-common-stories.js';

import { SbbFileSelectorElement } from './file-selector.js';
import readme from './readme.md?raw';

const applyComponentTag = (args: Args): Args => ({ ...args, tag: 'sbb-file-selector' });

export const Default: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDefaultArgTypes,
  args: applyComponentTag(fileSelectorDefaultArgs),
};

export const DefaultDisabled: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDefaultArgTypes,
  args: applyComponentTag({ ...fileSelectorDefaultArgs, disabled: true }),
};

export const DefaultMulti: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDefaultArgTypes,
  args: applyComponentTag(fileSelectorMultipleDefaultArgs),
};

export const DefaultMultiPersistent: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDefaultArgTypes,
  args: applyComponentTag({ ...fileSelectorMultipleDefaultArgs, 'multiple-mode': 'persistent' }),
};

export const DefaultWithError: StoryObj = {
  render: FileSelectorTemplateWithError,
  argTypes: fileSelectorDefaultArgTypes,
  args: applyComponentTag(fileSelectorDefaultArgs),
};

export const DefaultOnlyPDF: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDefaultArgTypes,
  args: applyComponentTag({ ...fileSelectorDefaultArgs, accept: '.pdf' }),
};

export const DefaultMultiSizeS: StoryObj = {
  render: FileSelectorTemplate,
  argTypes: fileSelectorDefaultArgTypes,
  args: applyComponentTag({ ...fileSelectorMultipleDefaultArgs, size: 's' }),
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbFileSelectorElement.events.fileChangedEvent],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-file-selector/sbb-file-selector',
};

export default meta;
