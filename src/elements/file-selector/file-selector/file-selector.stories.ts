import { withActions } from '@storybook/addon-actions/decorator';
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

import { SbbFileSelectorElement } from './file-selector.js';
import readme from './readme.md?raw';

const defaultArgTypes: ArgTypes = { ...fileSelectorDefaultArgTypes };
const defaultArgs: Args = { ...fileSelectorDefaultArgs, tag: 'sbb-file-selector' };

export const DefaultFileSelector: StoryObj = defaultFileSelector;
export const DefaultDisabled: StoryObj = defaultDisabled;
export const DefaultMulti: StoryObj = defaultMulti;
export const DefaultMultiPersistent: StoryObj = defaultMultiPersistent;
export const DefaultWithError: StoryObj = defaultWithError;
export const DefaultOnlyPDF: StoryObj = defaultOnlyPDF;
export const DefaultMultiSizeS: StoryObj = defaultMultiSizeS;

const meta: Meta = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
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
