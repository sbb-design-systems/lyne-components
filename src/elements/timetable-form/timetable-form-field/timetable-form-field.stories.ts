import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './timetable-form-field.component.ts';
import '../timetable-form.ts';
import '../timetable-form-swap-button.ts';
import '../../signet.ts';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const defaultArgTypes: ArgTypes = {
  disabled,
  readonly,
};

const defaultArgs: Args = {
  disabled: false,
  readonly: false,
};

const Template = (args: Args): TemplateResult => html`
  <form class="sbb-timetable-form">
    <sbb-signet></sbb-signet>
    <sbb-timetable-form>
      <sbb-timetable-form-field>
        <label>From</label>
        <input type="text" name="from" ${sbbSpread(args)} />
      </sbb-timetable-form-field>
      <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
      <sbb-timetable-form-field>
        <label>To</label>
        <input type="text" name="to" />
      </sbb-timetable-form-field>
    </sbb-timetable-form>
  </form>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-timetable-form/sbb-timetable-form-field',
};

export default meta;
