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
            type="start"
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

const FlexTemplate = (): TemplateResult => html`
  <sbb-pearl-chain>
    <div style="display: flex; align-items: center; width: 400px;">
      <sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>
      <span style="flex: 1;"></span>
      <sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>
      <span style="flex: 2;"></span>
      <sbb-pearl-chain-node type="end"></sbb-pearl-chain-node>
    </div>
  </sbb-pearl-chain>
`;

export const Table: StoryObj = {
  render: TableTemplate,
};

export const Flex: StoryObj = {
  render: FlexTemplate,
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
