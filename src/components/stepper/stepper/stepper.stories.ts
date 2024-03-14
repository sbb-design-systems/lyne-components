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

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const defaultArgTypes: ArgTypes = {
  linear,
  orientation,
  'horizontal-from': horizontalFrom,
};

const defaultArgs: Args = {
  linear: false,
  orientation: 'horizontal',
  'horizontal-from': 'unset',
};

const Template = (args: Args): TemplateResult => html`
  <sbb-stepper ${sbbSpread(args)} aria-label="Purpose of this flow" selected-index="0">
    <sbb-step-label>Step 1</sbb-step-label>
    <sbb-step>
      First step content. &nbsp;
      <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
    </sbb-step>

    <sbb-step-label>Step 2</sbb-step-label>
    <sbb-step>
      Second step content. &nbsp;
      <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
      <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
    </sbb-step>

    <sbb-step-label icon-name="tick-small">Step 3</sbb-step-label>
    <sbb-step>
      Third step content. &nbsp;
      <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
      <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
    </sbb-step>

    <sbb-step-label>Step 4</sbb-step-label>
    <sbb-step>
      Forth step content. &nbsp;
      <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
      <sbb-button size="m" sbb-stepper-next>Submit</sbb-button>
    </sbb-step>
  </sbb-stepper>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Linear: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, linear: true },
};

export const Vertical: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, orientation: orientation.options[1] },
};

export const HorizontalFromSmall: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    orientation: orientation.options[1],
    'horizontal-from': horizontalFrom.options[3],
  },
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
