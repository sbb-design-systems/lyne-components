import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './timetable-form-field.component.js';
import '../timetable-form.js';
import '../timetable-form-swap-button.js';
import '../../signet.js';

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
  placeholder: undefined,
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
  },
  title: 'elements/sbb-timetable-form/sbb-timetable-form-field',
};

export default meta;
