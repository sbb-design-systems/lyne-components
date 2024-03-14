import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../core/dom';
import { SbbStepElement } from '../step';

import readme from './readme.md?raw';

import './stepper';
import '../step-label';
import '../../button/button';
import '../../button/secondary-button';

const linear: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  linear,
};

const defaultArgs: Args = {
  linear: true,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-stepper ${sbbSpread(args)} aria-label="Purpose of this flow">
    <sbb-step-label>Step 1</sbb-step-label>
    <sbb-step>
      First step content.
      <sbb-button sbb-stepper-next>Go to next</sbb-button>
    </sbb-step>

    <sbb-step-label>Step 2</sbb-step-label>
    <sbb-step>
      Second step content.
      <sbb-secondary-button sbb-stepper-previous>Go back</sbb-secondary-button>
      <sbb-button sbb-stepper-next>Go to next</sbb-button>
    </sbb-step>

    <sbb-step-label icon-name="tick-small">Step 3</sbb-step-label>
    <sbb-step>
      Third step content.
      <sbb-secondary-button sbb-stepper-previous>Go back</sbb-secondary-button>
      <sbb-button sbb-stepper-next>Go to next</sbb-button>
    </sbb-step>

    <sbb-step-label>Step 4</sbb-step-label>
    <sbb-step>
      Forth step content.
      <sbb-secondary-button sbb-stepper-previous>Go back</sbb-secondary-button>
      <sbb-button sbb-stepper-next>Submit</sbb-button>
    </sbb-step>
  </sbb-stepper>
`;

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
      handles: [SbbStepElement.events.validate],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-stepper/sbb-stepper',
};

export default meta;
