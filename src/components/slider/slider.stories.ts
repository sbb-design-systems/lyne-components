import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import './slider';
import '../form-field';
import '../icon';

const changeEventHandler = (event): void => {
  const div = document.createElement('div');
  div.innerText = `current value is: ${event.target.value}. Min is: ${event.target.min}. Max is ${event.target.max}.`;
  document.getElementById('container-value').prepend(div);
};

const TemplateSbbSlider = (args: Args): TemplateResult =>
  html`<sbb-slider ${sbbSpread(args)}></sbb-slider>`;

const TemplateSbbSliderChangeEvent = (args: Args): TemplateResult => html`
  <sbb-slider ${sbbSpread(args)} @change=${(event) => changeEventHandler(event)}></sbb-slider>
  <div style="margin-block-start: 2rem;">Change slider position:</div>
  <div id="container-value"></div>
`;

const TemplateSlottedIcons = (args: Args): TemplateResult => html`
  <sbb-slider ${sbbSpread(args)}>
    <sbb-icon slot="prefix" name="battery-level-empty-small"></sbb-icon>
    <sbb-icon slot="suffix" name="battery-level-high-small"></sbb-icon>
  </sbb-slider>
`;

const TemplateSbbSliderInFormField = ({ label, optional, ...args }: Args): TemplateResult => html`
  <sbb-form-field label=${label} ?optional=${optional}> ${TemplateSbbSlider(args)} </sbb-form-field>
`;

const valueArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const valueAsNumberArg: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Slider attribute',
  },
};

const minArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const maxArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const disabledArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Slider attribute',
  },
};

const readonlyArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Slider attribute',
  },
};

const startIconArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const endIconArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const labelArgArg: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optionalArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes: ArgTypes = {
  max: maxArg,
  min: minArg,
  disabled: disabledArg,
  readonly: readonlyArg,
  value: valueArg,
  'value-as-number': valueAsNumberArg,
  'start-icon': startIconArg,
  'end-icon': endIconArg,
  'aria-label': ariaLabel,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label: labelArgArg,
  optional: optionalArg,
};

const basicArgs: Args = {
  max: '100',
  min: '0',
  disabled: false,
  readonly: false,
  value: '40',
  'value-as-number': 40,
  'start-icon': 'walk-slow-small',
  'end-icon': 'walk-fast-small',
  'aria-label': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  optional: undefined,
};

export const sbbSlider: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs },
};

export const sbbSliderChangeEvent: StoryObj = {
  render: TemplateSbbSliderChangeEvent,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs },
};

export const sbbSliderWithoutIcons: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined },
};

export const sbbSliderSlottedIcons: StoryObj = {
  render: TemplateSlottedIcons,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined },
};

export const sbbSliderDisabled: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, disabled: true },
};

export const sbbSliderReadonly: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, readonly: true },
};

export const sbbSliderInFormField: StoryObj = {
  render: TemplateSbbSliderInFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: formFieldBasicArgs,
};

export const sbbSliderInFormFieldNoIcon: StoryObj = {
  render: TemplateSbbSliderInFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgs,
    'start-icon': undefined,
    'end-icon': undefined,
  },
};

export const sbbSliderInFormFieldDisabled: StoryObj = {
  render: TemplateSbbSliderInFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, disabled: true },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-slider',
};

export default meta;
