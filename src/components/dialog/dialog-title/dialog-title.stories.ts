import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread';
import { breakpoints } from '../../core/dom';

import { SbbDialogTitleElement } from './dialog-title';
import readme from './readme.md?raw';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const backButton: InputType = {
  control: {
    type: 'boolean',
  },
};

const hideOnScroll: InputType = {
  control: {
    type: 'select',
  },
  options: breakpoints,
};

const accessibilityCloseLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityBackLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const defaultArgTypes: ArgTypes = {
  level,
  'back-button': backButton,
  'hide-on-scroll': hideOnScroll,
  'accessibility-close-label': accessibilityCloseLabel,
  'accessibility-back-label': accessibilityBackLabel,
};

const defaultArgs: Args = {
  'back-button': true,
  'hide-on-scroll': hideOnScroll.options[0],
  'accessibility-close-label': 'Close dialog',
  'accessibility-back-label': 'Go back',
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-dialog-title ${sbbSpread(args)}>Dialog title</sbb-dialog-title>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const NoBackButton: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'back-button': false, 'accessibility-back-label': undefined },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [SbbDialogTitleElement.events.backClick],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-dialog/sbb-dialog-title',
};

export default meta;
