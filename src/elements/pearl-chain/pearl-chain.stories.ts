import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';

import readme from './readme.md?raw';

import '../pearl-chain.ts';
import '../timetable-occupancy.ts';

const at = (h: number, m: number): Date => {
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date;
};

const type: InputType = {
  control: { type: 'select' },
  options: [
    'stop',
    'skip',
    'commercial',
    'stop-duty',
    'stop-on-demand',
    'boarding',
    'alighting',
    'boarding-on-demand',
    'alighting-on-demand',
    'start',
    'end',
    null,
  ],
};

const disrupted: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'],
};

const irrelevant: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'],
};

const walk: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'],
};

const unsure: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'],
};

const now: InputType = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes: ArgTypes = {
  type,
  now,
  disrupted,
  irrelevant,
  walk,
  unsure,
};

const defaultArgs: Args = {
  type: type.options![0],
  now: new Date(),
  disrupted: null,
  irrelevant: null,
  walk: null,
  unsure: null,
};

const HorizontalTemplate = ({ now, ...args }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <div style="display: flex; align-items: center; width: 400px;">
      <div>
        <sbb-pearl-chain-node type="start" .departure=${at(10, 0)}></sbb-pearl-chain-node>
        <div>10:00</div>
      </div>
      <span style="flex: 1;"></span>
      <div>
        <sbb-pearl-chain-node
          ${sbbSpread(args)}
          .arrival=${at(12, 0)}
          .departure=${at(12, 0)}
        ></sbb-pearl-chain-node>
        <div>12:00</div>
      </div>
      <span style="flex: 1;"></span>
      <div>
        <sbb-pearl-chain-node type="end" .arrival=${at(15, 0)}></sbb-pearl-chain-node>
        <div>15:00</div>
      </div>
    </div>
  </sbb-pearl-chain>
`;

const VerticalTemplate = ({ now, ...args }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <table>
      <tr style="height: 5rem;">
        <td>10:00</td>
        <td>
          <sbb-pearl-chain-node type="start" .departure=${at(10, 0)}></sbb-pearl-chain-node>
        </td>
        <td>Bern</td>
      </tr>
      <tr style="height: 5rem;">
        <td>12:00</td>
        <td>
          <sbb-pearl-chain-node
            ${sbbSpread(args)}
            .arrival=${at(12, 0)}
            .departure=${at(12, 0)}
          ></sbb-pearl-chain-node>
        </td>
        <td>Olten</td>
      </tr>
      <tr style="height: 5rem;">
        <td>15:00</td>
        <td>
          <sbb-pearl-chain-node type="end" .arrival=${at(15, 0)}></sbb-pearl-chain-node>
        </td>
        <td>Zürich HB</td>
      </tr>
    </table>
  </sbb-pearl-chain>
`;

const FullExampleTemplate = ({ now }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <div
      style="display: grid; grid-template-columns: auto auto 1fr auto; align-items: center; column-gap: 1rem; row-gap: 0.25rem; width: 450px;"
    >
      <span style="font-weight: bold;">08:00</span>
      <sbb-pearl-chain-node type="start" .departure=${at(8, 0)}></sbb-pearl-chain-node>
      <span>Bern</span>
      <span>Gl. 3</span>

      <span style="grid-column: 1; color: var(--sbb-color-granite); margin-block-start: 1rem;"
        >08:08</span
      >

      <span style="grid-column: 1; font-weight: bold;">08:12</span>
      <sbb-pearl-chain-node type="stop" .arrival=${at(8, 12)} .departure=${at(8, 13)}>
      </sbb-pearl-chain-node>
      <span>Münsingen</span>
      <span>Gl. 1</span>

      <span style="grid-column: 1; color: var(--sbb-color-granite); margin-block-start: 1rem;"
        >08:18</span
      >

      <span style="grid-column: 1; font-weight: bold;">08:22</span>
      <sbb-pearl-chain-node type="stop" .arrival=${at(8, 22)} .departure=${at(8, 24)}>
      </sbb-pearl-chain-node>
      <span style="font-weight: bold;">Thun</span>
      <span style="font-weight: bold;">Gl. 2</span>
      <sbb-timetable-occupancy
        style="grid-column: 3;"
        first-class-occupancy="low"
        second-class-occupancy="high"
      ></sbb-timetable-occupancy>

      <span style="grid-column: 1; color: var(--sbb-color-granite); margin-block-start: 1rem;"
        >08:29</span
      >

      <span style="grid-column: 1; font-weight: bold;">08:34</span>
      <sbb-pearl-chain-node type="stop" .arrival=${at(8, 34)} .departure=${at(8, 35)}>
      </sbb-pearl-chain-node>
      <span>Spiez</span>
      <span>Gl. 4</span>
      <sbb-timetable-occupancy
        style="grid-column: 3;"
        first-class-occupancy="low"
        second-class-occupancy="medium"
      ></sbb-timetable-occupancy>

      <span style="grid-column: 1; color: var(--sbb-color-granite); margin-block-start: 1rem;"
        >08:43</span
      >

      <span style="grid-column: 1; font-weight: bold;">08:50</span>
      <sbb-pearl-chain-node type="end" .arrival=${at(8, 50)}></sbb-pearl-chain-node>
      <span style="font-weight: bold;">Interlaken Ost</span>
      <span style="font-weight: bold;">Gl. 1</span>
    </div>
  </sbb-pearl-chain>
`;

export const Horizontal: StoryObj = {
  render: HorizontalTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Vertical: StoryObj = {
  render: VerticalTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Progress: StoryObj = {
  render: HorizontalTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, now: at(11, 0) },
};

export const FullExample: StoryObj = {
  render: FullExampleTemplate,
  argTypes: { now: defaultArgTypes.now },
  args: { now: at(8, 15) },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Pearl Chain',
};

export default meta;
