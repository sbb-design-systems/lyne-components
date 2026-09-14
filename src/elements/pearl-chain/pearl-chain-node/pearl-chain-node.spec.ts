import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { stub } from 'sinon';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import type { SbbPearlChainElement } from '../pearl-chain/pearl-chain.component.ts';

import { SbbPearlChainNodeElement } from './pearl-chain-node.component.ts';

import '../../pearl-chain.ts';

describe(`sbb-pearl-chain-node`, () => {
  let element: SbbPearlChainNodeElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-pearl-chain-node></sbb-pearl-chain-node>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPearlChainNodeElement);
  });

  it('does not render a bullet by default (empty type)', () => {
    expect(element.shadowRoot!.querySelector('circle')).to.be.null;
  });

  describe('tri-state properties (disrupted / walk / irrelevant)', () => {
    for (const prop of ['disrupted', 'walk', 'irrelevant'] as const) {
      it(`converts empty string ${prop} to true`, () => {
        element.setAttribute(prop, '');
        expect(element[prop]).to.be.true;
      });

      it(`keeps arrival/departure ${prop} values`, () => {
        element.setAttribute(prop, 'arrival');
        expect(element[prop]).to.equal('arrival');

        element.setAttribute(prop, 'departure');
        expect(element[prop]).to.equal('departure');
      });
    }
  });

  describe('arrival / departure', () => {
    it('parses ISO datetime strings', () => {
      element.arrival = '2026-07-21T11:58:00';
      element.departure = '2026-07-21T12:00:00';

      expect(element.arrival).to.deep.equal(new Date('2026-07-21T11:58:00'));
      expect(element.departure).to.deep.equal(new Date('2026-07-21T12:00:00'));
    });

    it('resets to null on invalid input', () => {
      element.arrival = 'not-a-date';
      expect(element.arrival).to.be.null;
    });

    it('accepts a Date instance directly', () => {
      const date = new Date('2026-07-21T12:00:00');
      element.departure = date;
      expect(element.departure).to.deep.equal(date);
    });
  });

  describe('bullet--past state', () => {
    it('marks the bullet as past once now is after departure', async () => {
      element.type = 'stop';
      element.departure = '2000-01-01T00:00:00';
      await waitForLitRender(element);

      expect(element.shadowRoot!.querySelector('svg')!.classList.contains('bullet--past')).to.be
        .true;
    });

    it('does not mark the bullet as past when now is before departure', async () => {
      element.type = 'stop';
      element.departure = '2999-01-01T00:00:00';
      await waitForLitRender(element);

      expect(element.shadowRoot!.querySelector('svg')!.classList.contains('bullet--past')).to.be
        .false;
    });
  });

  describe('ancestor chain integration', () => {
    let chain: SbbPearlChainElement;

    beforeEach(async () => {
      chain = await fixture(html`<sbb-pearl-chain></sbb-pearl-chain>`);
    });

    it('registers itself on connectedCallback and unregisters on disconnectedCallback', async () => {
      const addNode = stub(chain, 'addNode');
      const removeNode = stub(chain, 'removeNode');

      chain.appendChild(element);
      await waitForLitRender(chain);
      expect(addNode).to.have.been.calledOnceWith(element);

      chain.removeChild(element);
      await waitForLitRender(chain);
      expect(removeNode).to.have.been.calledOnceWith(element);
    });

    it('calls requestUpdate() on the ancestor chain when a render-relevant property changes', async () => {
      chain.appendChild(element);
      await waitForLitRender(chain);

      const requestUpdate = stub(chain, 'requestUpdate');
      element.walk = 'arrival';
      await waitForLitRender(element);

      expect(requestUpdate).to.have.been.called;
    });
  });
});
