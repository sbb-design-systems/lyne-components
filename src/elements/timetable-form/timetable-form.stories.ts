import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import '../../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    <b>sbb-timetable-form-swap-button</b> is an element meant to be used in combination with the
    'sbb-timetable-form'.
    <p style="margin-block-end: 0">
      See the <b>sbb-timetable-form</b> examples to see it in action.
    </p>
  </sbb-card>
`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-timetable-form/sbb-timetable-form-swap-button',
};

export default meta;


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


import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import '../../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    <b>sbb-timetable-form-details</b> is an element meant to be used in combination with the
    'sbb-timetable-form'.
    <p style="margin-block-end: 0">
      See the <b>sbb-timetable-form</b> examples to see it in action.
    </p>
  </sbb-card>
`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-timetable-form/sbb-timetable-form-details',
};

export default meta;


import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';

import readme from './readme.md?raw';
import '../../button/button.ts';
import '../../datepicker.ts';
import '../../divider.ts';
import '../../icon.ts';
import '../../signet.ts';
import '../../time-input.ts';
import '../../toggle.ts';
import '../timetable-form-field.ts';
import '../timetable-form-swap-button.ts';
import '../timetable-form-details.ts';
import './timetable-form.component.ts';

const defaultArgTypes: ArgTypes = {};

const defaultArgs: Args = {};

const fromToFields = (_args: Args, opt: { withVia?: boolean } = {}): TemplateResult => html`
  <sbb-timetable-form-field>
    <label>From</label>
    <input type="text" name="from" />
  </sbb-timetable-form-field>
  <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
  ${opt.withVia
    ? html` <sbb-timetable-form-field>
        <label>Via</label>
        <input type="text" name="via" />
      </sbb-timetable-form-field>`
    : nothing}
  <sbb-timetable-form-field>
    <label>To</label>
    <input type="text" name="to" />
  </sbb-timetable-form-field>
`;

const datepicker = (_args: Args): TemplateResult => html`
  <sbb-form-field width="collapse" size="l" borderless class="sbb-timetable-form-mobile-block">
    <sbb-date-input
      value="2023-01-01"
      min="2000-01-01"
      max="2050-12-31"
      name="date"
    ></sbb-date-input>
    <sbb-datepicker-previous-day
      class="sbb-timetable-form-mobile-hidden"
    ></sbb-datepicker-previous-day>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
    <sbb-datepicker-next-day class="sbb-timetable-form-mobile-hidden"></sbb-datepicker-next-day>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
  <sbb-divider orientation="vertical" class="sbb-timetable-form-mobile-hidden"></sbb-divider>
`;

const expandedDatepicker = (_args: Args): TemplateResult => html`
  <sbb-form-field width="collapse" size="l" borderless class="sbb-timetable-form-block">
    <sbb-date-input
      value="2023-01-01"
      min="2000-01-01"
      max="2050-12-31"
      name="date"
    ></sbb-date-input>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
`;

const timetableDetails = (
  args: Args,
  opt: { expandedDatepicker?: boolean } = {},
): TemplateResult => html`
  <sbb-timetable-form-details>
    ${opt.expandedDatepicker ? expandedDatepicker(args) : datepicker(args)}
    <sbb-form-field width="collapse" size="l" borderless>
      <sbb-time-input value="13:30"></sbb-time-input>
    </sbb-form-field>
    <sbb-toggle size="s" name="departure-arrival">
      <sbb-toggle-option value="departure">Dep</sbb-toggle-option>
      <sbb-toggle-option value="arrival">Arr</sbb-toggle-option>
    </sbb-toggle>
    <div style="flex-grow: 1;"></div>
    <sbb-button type="submit" size="m">Search</sbb-button>
  </sbb-timetable-form-details>
`;

const Template = (args: Args): TemplateResult => html`
  <form class="sbb-timetable-form">
    <sbb-signet></sbb-signet>
    <sbb-timetable-form> ${fromToFields(args)} ${timetableDetails(args)} </sbb-timetable-form>
  </form>
`;

const WithViaTemplate = (args: Args): TemplateResult => html`
  <form class="sbb-timetable-form">
    <sbb-signet></sbb-signet>
    <sbb-timetable-form>
      ${fromToFields(args, { withVia: true })} ${timetableDetails(args)}
    </sbb-timetable-form>
  </form>
`;

const ExpandedDatepickerTemplate = (args: Args): TemplateResult => html`
  <form class="sbb-timetable-form">
    <sbb-signet></sbb-signet>
    <sbb-timetable-form>
      ${fromToFields(args)} ${timetableDetails(args, { expandedDatepicker: true })}
    </sbb-timetable-form>
  </form>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const ExpandedDatepicker: StoryObj = {
  render: ExpandedDatepickerTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithVia: StoryObj = {
  render: WithViaTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [(story) => html` <div style="padding: .25rem">${story()}</div> `],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-timetable-form/sbb-timetable-form',
};

export default meta;
