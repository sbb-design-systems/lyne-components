import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import readme from './readme.md?raw';
import './table-wrapper.component.js';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
};

const defaultArgs: Args = {
  negative: false,
};

const header: () => TemplateResult = () => html`
  <thead>
    <tr>
      <th scope="col">Line</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Provider</th>
      <th scope="col">Year</th>
      <th scope="col">Trains count</th>
      <th scope="col">Tons</th>
      <th scope="col">Timestamp</th>
      <th scope="col">Record ID</th>
    </tr>
  </thead>
`;

const body: () => TemplateResult = () => html`
  <tbody>
    <tr>
      <td>Lausanne - Fribourg - Bern Steigerhubel</td>
      <td>Schmitten</td>
      <td>Wünnewil</td>
      <td>SBB</td>
      <td>2024</td>
      <td>1756</td>
      <td>1052197</td>
      <td>2024-03-08T14:23:54.78Z</td>
      <td>c4dd</td>
    </tr>
    <tr>
      <td>Lausanne - Fribourg - Bern Steigerhubel</td>
      <td>Thörishaus Station</td>
      <td>Oberwangen</td>
      <td>SBB</td>
      <td>2024</td>
      <td>2007</td>
      <td>1131857</td>
      <td>2024-03-08T14:23:54.78Z</td>
      <td>de82</td>
    </tr>
    <tr>
      <td>Lausanne - Fribourg - Bern Steigerhubel</td>
      <td>Villars-sur-Glâne</td>
      <td>Fribourg/Freiburg</td>
      <td>SBB</td>
      <td>2024</td>
      <td>36110</td>
      <td>10803746</td>
      <td>2024-03-08T14:23:54.78Z</td>
      <td>740a</td>
    </tr>
    <tr>
      <td>Löchligut/Solothurn - NBS/ABS - Olten</td>
      <td>Derendingen</td>
      <td>Subingen</td>
      <td>SBB</td>
      <td>2024</td>
      <td>10</td>
      <td>10147</td>
      <td>2024-03-08T14:23:54.78Z</td>
      <td>0396</td>
    </tr>
  </tbody>
`;

const Template = (args: Args): TemplateResult => html`
  <sbb-table-wrapper ?negative=${args.negative}>
    <table
      aria-label="Train lines 2024"
      class=${classMap({
        'sbb-table': true,
        'sbb-table--negative': args.negative,
      })}
    >
      ${header()} ${body()}
    </table>
  </sbb-table-wrapper>
  <p class="sbb-table-caption">Train lines 2024</p>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-table/sbb-table-wrapper',
};

export default meta;
