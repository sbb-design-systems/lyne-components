import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';

import readme from './readme.md?raw';

import '../pearl-chain.ts';

const TableTemplate = (): TemplateResult => html`
  <sbb-pearl-chain>
    <table>
      <tr>
        <td>11:00</td>
        <td>
          <sbb-pearl-chain-node type="start" departure="2026-07-21T11:00:00"></sbb-pearl-chain-node>
        </td>
        <td>Bern</td>
      </tr>
      <tr>
        <td>12:00</td>
        <td>
          <sbb-pearl-chain-node
            arrival="2026-07-21T11:58:00"
            departure="2026-07-21T12:00:00"
            type="stop"
          ></sbb-pearl-chain-node>
        </td>
        <td>Olten</td>
      </tr>
      <tr>
        <td>12:30</td>
        <td>
          <sbb-pearl-chain-node type="end" arrival="2026-07-21T12:30:00"></sbb-pearl-chain-node>
        </td>
        <td>Zürich HB</td>
      </tr>
    </table>
  </sbb-pearl-chain>
`;

/**
 * A single flex-laid-out chain showcasing every line state left-to-right:
 * default, disrupted, irrelevant, walk, past, and the irrelevant+disrupted combo.
 */
const FlexTemplate = (): TemplateResult => html`
  <sbb-pearl-chain now="2026-07-21T12:00:00">
    <div style="display: flex; align-items: center; width: 700px;">
      <!-- Normal -->
      <sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <!-- Disrupted -->
      <sbb-pearl-chain-node type="stop" disrupted="departure"></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <!-- Irrelevant -->
      <sbb-pearl-chain-node
        type="stop"
        disrupted="arrival"
        irrelevant="departure"
      ></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <!-- Walk -->
      <sbb-pearl-chain-node
        type="stop"
        irrelevant="arrival"
        walk="departure"
      ></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <!-- Past -->
      <sbb-pearl-chain-node
        type="stop"
        walk="arrival"
        departure="2026-07-21T11:00:00"
      ></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <!-- Disrupted + Irrelevant -->
      <sbb-pearl-chain-node
        arrival="2026-07-21T11:30:00"
        disrupted="departure"
        irrelevant="departure"
        type="stop"
      ></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <sbb-pearl-chain-node
        type="end"
        disrupted="arrival"
        irrelevant="arrival"
      ></sbb-pearl-chain-node>
    </div>
  </sbb-pearl-chain>
`;

export const Table: StoryObj = {
  render: TableTemplate,
};

export const Flex: StoryObj = {
  render: FlexTemplate,
};

/** "now" is set mid-journey: gray line before, normal after, red pulsing dot at "now". */
const ProgressTemplate = (): TemplateResult => html`
  <sbb-pearl-chain now="2026-07-21T11:30:00">
    <div style="display: flex; align-items: center; width: 400px;">
      <sbb-pearl-chain-node type="start" departure="2026-07-21T11:00:00"></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <sbb-pearl-chain-node
        arrival="2026-07-21T11:58:00"
        departure="2026-07-21T12:00:00"
        type="stop"
      ></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <sbb-pearl-chain-node type="end" arrival="2026-07-21T12:30:00"></sbb-pearl-chain-node>
    </div>
  </sbb-pearl-chain>
`;

export const Progress: StoryObj = {
  render: ProgressTemplate,
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
