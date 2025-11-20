import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components-vite';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import type { SbbSliderElement } from './slider.component.ts';
import './slider.component.ts';
import '../form-field.ts';
import '../icon.ts';

const changeEventHandler = (event: Event): void => {
  const div: HTMLDivElement = document.createElement('div');
  const target: SbbSliderElement = event.target as SbbSliderElement;
  div.innerText = `current value is: ${target.value}. Min is: ${target.min}. Max is ${target.max}.`;
  (event.currentTarget as HTMLElement)
    .parentElement!.querySelector('#container-value')!
    .prepend(div);
};

const TemplateSbbSlider = (args: Args): TemplateResult => html`
  <sbb-slider ${sbbSpread(args)} name="slider"></sbb-slider>
`;

const TemplateSbbSliderChangeEvent = (args: Args): TemplateResult => html`
  <sbb-slider
    ${sbbSpread(args)}
    @change=${(event: Event) => changeEventHandler(event)}
  ></sbb-slider>
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
  <sbb-form-field ?optional=${optional}>
    ${label ? html`<label>${label}</label>` : nothing} ${TemplateSbbSlider(args)}
  </sbb-form-field>
`;

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const min: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const max: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Slider attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Slider attribute',
  },
};

const startIcon: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Slider attribute',
  },
};

const endIcon: InputType = {
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

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const basicArgTypes: ArgTypes = {
  value,
  min,
  max,
  disabled,
  readonly,
  'start-icon': startIcon,
  'end-icon': endIcon,
  'aria-label': ariaLabel,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label,
  optional,
};

const basicArgs: Args = {
  value: '40',
  min: '0',
  max: '100',
  disabled: false,
  readonly: false,
  'start-icon': 'walk-slow-small',
  'end-icon': 'walk-fast-small',
  'aria-label': undefined,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  optional: undefined,
};

export const Default: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs },
};

export const WithChangeEvent: StoryObj = {
  render: TemplateSbbSliderChangeEvent,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs },
};

export const NoIcons: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined },
};

export const WithSlottedIcons: StoryObj = {
  render: TemplateSlottedIcons,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, 'start-icon': undefined, 'end-icon': undefined },
};

export const Disabled: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, disabled: true },
};

export const Readonly: StoryObj = {
  render: TemplateSbbSlider,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs, readonly: true },
};

export const InFormField: StoryObj = {
  render: TemplateSbbSliderInFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: formFieldBasicArgs,
};

export const InFormFieldNoIcons: StoryObj = {
  render: TemplateSbbSliderInFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgs,
    'start-icon': undefined,
    'end-icon': undefined,
  },
};

export const InFormFieldDisabled: StoryObj = {
  render: TemplateSbbSliderInFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, disabled: true },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-slider',
};

export default meta;
