import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';

import readme from './readme.md?raw';

import '../pearl-chain.ts';

const today = new Date();
// today.setHours(0, 0, 0);

const startTime = new Date(today);
startTime.setHours(10, 0);

const stopTime = new Date(today);
stopTime.setHours(12, 0);

const endTime = new Date(today);
endTime.setHours(15, 0);

const type: InputType = {
  control: { type: 'select' },
  options: [
    'stop',
    'boarding',
    'alighting',
    'skip',
    'stop-duty',
    'stop-on-demand',
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

const now: InputType = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes: ArgTypes = {
  type,
  disrupted,
  irrelevant,
  walk,
  now,
};

const defaultArgs: Args = {
  type: type.options![0],
  disrupted: null,
  irrelevant: null,
  walk: null,
  now: new Date(today),
};

const HorizontalTemplate = ({ now, ...args }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <div style="display: flex; align-items: center; width: 400px;">
      <div>
        <sbb-pearl-chain-node type="start" .departure=${startTime}></sbb-pearl-chain-node>
        <div>10:00</div>
      </div>
      <span style="flex: 1;"></span>
      <div>
        <sbb-pearl-chain-node
          ${sbbSpread(args)}
          .arrival=${stopTime}
          .departure=${stopTime}
        ></sbb-pearl-chain-node>
        <div>12:00</div>
      </div>
      <span style="flex: 1;"></span>
      <div>
        <sbb-pearl-chain-node type="end" .arrival=${endTime}></sbb-pearl-chain-node>
        <div>15:00</div>
      </div>
    </div>
  </sbb-pearl-chain>
`;

const TableTemplate = ({ now, ...args }: Args): TemplateResult => html`
  <sbb-pearl-chain .now=${new Date(now)}>
    <table>
      <tr style="height: 5rem;">
        <td>10:00</td>
        <td>
          <sbb-pearl-chain-node type="start" .departure=${startTime}></sbb-pearl-chain-node>
        </td>
        <td>Bern</td>
      </tr>
      <tr style="height: 5rem;">
        <td>12:00</td>
        <td>
          <sbb-pearl-chain-node
            ${sbbSpread(args)}
            .arrival=${stopTime}
            .departure=${stopTime}
          ></sbb-pearl-chain-node>
        </td>
        <td>Olten</td>
      </tr>
      <tr style="height: 5rem;">
        <td>15:00</td>
        <td>
          <sbb-pearl-chain-node type="end" .arrival=${endTime}></sbb-pearl-chain-node>
        </td>
        <td>Zürich HB</td>
      </tr>
    </table>
  </sbb-pearl-chain>
`;

export const Horizontal: StoryObj = {
  render: HorizontalTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Table: StoryObj = {
  render: TableTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Progress: StoryObj = {
  render: HorizontalTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, now: new Date(today).setHours(11, 0, 0) },
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
