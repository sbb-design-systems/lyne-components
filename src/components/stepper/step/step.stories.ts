import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import { SbbStepElement } from './step';

const myProp: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'my-prop': myProp,
};

const defaultArgs: Args = {
  'my-prop': 'Label',
};

const Template = (args: Args): TemplateResult => html`<sbb-step ${sbbSpread(args)}></sbb-step>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [SbbStepElement.events.myEventName],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-stepper/sbb-step',
};

export default meta;
