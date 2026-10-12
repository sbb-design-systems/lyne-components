import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import type { SbbPearlChainNodeElement } from '../pearl-chain.ts';

import readme from './readme.md?raw';

import '../pearl-chain.ts';
import '../timetable-occupancy.ts';

const at = (h: number, m: number): Date => {
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date;
};

const timeTemplate = (date: Date, label?: 'Departure' | 'Arrival'): TemplateResult => {
  const timeLabel = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const a11yPrefix = label
    ? html`<span class="sbb-screen-reader-only">${label}:&nbsp;</span>`
    : nothing;
  return html`<time datetime=${date.toISOString()}>${a11yPrefix}${timeLabel}</time>`;
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
    'exceptional',
    'exceptional-skip',
    'exceptional-boarding',
    'exceptional-alighting',
    'boarding-on-demand',
    'alighting-on-demand',
    'start',
    'end',
    null,
  ],
};

const disrupted: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'] satisfies SbbPearlChainNodeElement['disrupted'][],
};

const irrelevant: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'] satisfies SbbPearlChainNodeElement['irrelevant'][],
};

const walk: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'] satisfies SbbPearlChainNodeElement['walk'][],
};

const unsure: InputType = {
  control: { type: 'inline-radio' },
  options: [null, true, 'arrival', 'departure'] satisfies SbbPearlChainNodeElement['unsure'][],
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
    <div style="display: flex; align-items: center; width: 400px; max-width: 100%;">
      <div>
        <sbb-pearl-chain-node type="start" .departure=${at(10, 0)}></sbb-pearl-chain-node>
        <div>${timeTemplate(at(10, 0), 'Departure')}</div>
      </div>
      <span style="flex: 1;"></span>
      <div>
        <sbb-pearl-chain-node
          ${sbbSpread(args)}
          .arrival=${at(12, 0)}
          .departure=${at(12, 0)}
        ></sbb-pearl-chain-node>
        <div>${timeTemplate(at(12, 0), 'Departure')}</div>
      </div>
      <span style="flex: 1;"></span>
      <div>
        <sbb-pearl-chain-node type="end" .arrival=${at(15, 0)}></sbb-pearl-chain-node>
        <div>${timeTemplate(at(15, 0), 'Arrival')}</div>
      </div>
    </div>
  </sbb-pearl-chain>
`;

const VerticalTemplate = ({ now, ...args }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <table>
      <tr style="height: 5rem;">
        <td>${timeTemplate(at(10, 0), 'Departure')}</td>
        <td>
          <sbb-pearl-chain-node type="start" .departure=${at(10, 0)}></sbb-pearl-chain-node>
        </td>
        <td>Bern</td>
      </tr>
      <tr style="height: 5rem;">
        <td>${timeTemplate(at(12, 0), 'Departure')}</td>
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
        <td>${timeTemplate(at(15, 0), 'Arrival')}</td>
        <td>
          <sbb-pearl-chain-node type="end" .arrival=${at(15, 0)}></sbb-pearl-chain-node>
        </td>
        <td>Zürich HB</td>
      </tr>
    </table>
  </sbb-pearl-chain>
`;

const VerticalFullExampleTemplate = ({ now }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <div
      style="display: grid; grid-template-columns: auto auto 1fr auto; align-items: center; gap: var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-3x); width: 450px;"
    >
      <span style="font-weight: bold;">${timeTemplate(at(8, 0), 'Departure')}</span>
      <sbb-pearl-chain-node type="start" .departure=${at(8, 0)}></sbb-pearl-chain-node>
      <span>Bern</span>
      <span>Gl. 3</span>

      <span style="grid-column: 1; color: var(--sbb-color-granite); margin-block-start: 1rem;"
        >${timeTemplate(at(8, 8))}</span
      >

      <span style="grid-column: 1; font-weight: bold;">${timeTemplate(at(8, 12), 'Arrival')}</span>
      <sbb-pearl-chain-node type="stop" .arrival=${at(8, 12)} .departure=${at(8, 13)}>
      </sbb-pearl-chain-node>
      <span>Münsingen</span>
      <span>Gl. 1</span>

      <span style="grid-column: 1; color: var(--sbb-color-granite); margin-block-start: 1rem;"
        >${timeTemplate(at(8, 18))}</span
      >

      <span style="grid-column: 1; font-weight: bold;">${timeTemplate(at(8, 22), 'Arrival')}</span>
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
        >${timeTemplate(at(8, 29))}</span
      >

      <span style="grid-column: 1; font-weight: bold;">${timeTemplate(at(8, 34), 'Arrival')}</span>
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
        >${timeTemplate(at(8, 43))}</span
      >

      <span style="grid-column: 1; font-weight: bold;">${timeTemplate(at(8, 50), 'Arrival')}</span>
      <sbb-pearl-chain-node type="end" .arrival=${at(8, 50)}></sbb-pearl-chain-node>
      <span style="font-weight: bold;">Interlaken Ost</span>
      <span style="font-weight: bold;">Gl. 1</span>
    </div>
  </sbb-pearl-chain>
`;

const HorizontalFullExampleTemplate = ({ now }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <div
      style="display: grid; grid-template-columns: auto 1fr auto 1fr auto; gap: var(--sbb-spacing-fixed-2x) var(--sbb-spacing-fixed-3x);"
    >
      <div style="display: flex; align-items: center; gap: 0.25rem;">
        <sbb-icon name="picto:train-right"></sbb-icon>
        <sbb-icon name="ic-61"></sbb-icon>
        <span>123456</span>
      </div>
      <span></span>
      <div style="display: flex; align-items: center; gap: 0.25rem;">
        <sbb-icon name="picto:train-right"></sbb-icon>
        <sbb-icon name="ic-61"></sbb-icon>
        <span>123456</span>
      </div>
      <span></span>
      <span></span>

      <span style="font-weight: bold;">Bern</span>
      <span></span>
      <span style="font-weight: bold;">Thun</span>
      <span></span>
      <span style="font-weight: bold; justify-self: end;">Interlaken Ost</span>

      <sbb-pearl-chain-node type="start" .departure=${at(8, 0)}></sbb-pearl-chain-node>
      <span></span>
      <sbb-pearl-chain-node type="stop" .arrival=${at(8, 22)} .departure=${at(8, 24)}>
      </sbb-pearl-chain-node>
      <span></span>
      <sbb-pearl-chain-node
        type="end"
        .arrival=${at(8, 50)}
        style="justify-self: end;"
      ></sbb-pearl-chain-node>

      <span style="font-weight: bold;">${timeTemplate(at(8, 0), 'Departure')}</span>
      <span style="color: var(--sbb-color-granite); justify-self: end;"
        >${timeTemplate(at(8, 22), 'Arrival')}</span
      >
      <span style="font-weight: bold;">${timeTemplate(at(8, 24), 'Departure')}</span>
      <span></span>
      <span style="font-weight: bold; justify-self: end;"
        >${timeTemplate(at(8, 50), 'Arrival')}</span
      >
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

export const Disrupted: StoryObj = {
  render: HorizontalTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disrupted: 'departure' },
};

export const Walk: StoryObj = {
  render: HorizontalTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, walk: 'departure' },
};

export const VerticalFullExample: StoryObj = {
  render: VerticalFullExampleTemplate,
  argTypes: { now: defaultArgTypes.now },
  args: { now: at(8, 15) },
};

export const HorizontalFullExample: StoryObj = {
  render: HorizontalFullExampleTemplate,
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
