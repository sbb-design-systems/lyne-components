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
