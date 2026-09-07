import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbPearlChainNodeElement } from './pearl-chain-node.component.ts';
import '../../pearl-chain.ts';

describe(`sbb-pearl-chain-node`, () => {
  describe('renders empty', () => {
    let element: SbbPearlChainNodeElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-pearl-chain-node></sbb-pearl-chain-node>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders start', () => {
    let element: SbbPearlChainNodeElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders end', () => {
    let element: SbbPearlChainNodeElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-pearl-chain-node type="end"></sbb-pearl-chain-node>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
