import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbPearlChainElement } from './pearl-chain.component.ts';
import '../../pearl-chain.ts';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;

  describe('default', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain now="2026-09-14T00:00:00">
          <sbb-pearl-chain-node type="start" departure="2026-09-14T09:00:00"></sbb-pearl-chain-node>
          <sbb-pearl-chain-node
            type="stop"
            arrival="2026-09-14T11:00:00"
            departure="2026-09-14T11:10:00"
          ></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="end" arrival="2026-09-14T14:00:00"></sbb-pearl-chain-node>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('trip in progress', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain now="2026-09-14T12:00:00">
          <sbb-pearl-chain-node type="start" departure="2026-09-14T09:00:00"></sbb-pearl-chain-node>
          <sbb-pearl-chain-node
            type="stop"
            arrival="2026-09-14T11:00:00"
            departure="2026-09-14T11:10:00"
          ></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="end" arrival="2026-09-14T14:00:00"></sbb-pearl-chain-node>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
