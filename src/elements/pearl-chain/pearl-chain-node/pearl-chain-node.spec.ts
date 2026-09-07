import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import type { SbbPearlChainElement } from '../pearl-chain/pearl-chain.component.ts';

import { SbbPearlChainNodeElement } from './pearl-chain-node.component.ts';

import '../../pearl-chain.ts';

describe(`sbb-pearl-chain-node`, () => {
  it('renders', async () => {
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node></sbb-pearl-chain-node>`,
    );
    assert.instanceOf(element, SbbPearlChainNodeElement);
  });

  it('converts empty string disrupted/walk/irrelevant to true', async () => {
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node disrupted walk irrelevant></sbb-pearl-chain-node>`,
    );
    expect(element.disrupted).to.equal(true);
    expect(element.walk).to.equal(true);
    expect(element.irrelevant).to.equal(true);
  });

  it('keeps arrival/departure tri-state values', async () => {
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node
        disrupted="arrival"
        walk="departure"
        irrelevant="arrival"
      ></sbb-pearl-chain-node>`,
    );
    expect(element.disrupted).to.equal('arrival');
    expect(element.walk).to.equal('departure');
    expect(element.irrelevant).to.equal('arrival');
  });

  it('resets disrupted/walk/irrelevant to null when removed', async () => {
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node disrupted></sbb-pearl-chain-node>`,
    );
    expect(element.disrupted).to.equal(true);

    element.removeAttribute('disrupted');
    await waitForLitRender(element);
    expect(element.disrupted).to.equal(null);
  });

  it('parses arrival/departure ISO datetime strings', async () => {
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node
        arrival="2026-07-21T11:58:00"
        departure="2026-07-21T12:00:00"
      ></sbb-pearl-chain-node>`,
    );
    expect(element.arrival).to.be.instanceOf(Date);
    expect(element.departure).to.be.instanceOf(Date);
    expect(element.arrival!.toISOString()).to.contain('2026-07-21');
  });

  it('colors the bullet gray once now is after departure (past)', async () => {
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node
        type="start"
        departure="2020-01-01T00:00:00"
      ></sbb-pearl-chain-node>`,
    );
    await waitForLitRender(element);
    const svg = element.shadowRoot!.querySelector('svg')!;
    expect(svg.classList.contains('bullet--past')).to.be.true;
  });

  it('does not mark the bullet as past when now is before departure', async () => {
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node
        type="start"
        departure="2099-01-01T00:00:00"
      ></sbb-pearl-chain-node>`,
    );
    const svg = element.shadowRoot!.querySelector('svg')!;
    expect(svg.classList.contains('bullet--past')).to.be.false;
  });

  it('supports overriding now via the ancestor pearl-chain for testing purposes', async () => {
    const chain: SbbPearlChainElement = await fixture(html`
      <sbb-pearl-chain now="2020-01-01T00:00:00">
        <sbb-pearl-chain-node type="start" departure="2026-07-21T11:00:00"></sbb-pearl-chain-node>
      </sbb-pearl-chain>
    `);
    const element = chain.querySelector('sbb-pearl-chain-node')!;
    const svg = element.shadowRoot!.querySelector('svg')!;
    expect(svg.classList.contains('bullet--past')).to.be.false;
  });

  it('applies both irrelevant and disruption classes; CSS decides priority', async () => {
    // ponytail: priority (irrelevant supersedes disrupted) is a CSS cascade concern,
    // not yet styled (TODO in pearl-chain-node.scss) — revisit in line-state-priority step.
    const element: SbbPearlChainNodeElement = await fixture(
      html`<sbb-pearl-chain-node type="start" disrupted irrelevant></sbb-pearl-chain-node>`,
    );
    const svg = element.shadowRoot!.querySelector('svg')!;
    expect(svg.classList.contains('bullet--irrelevant')).to.be.true;
    expect(svg.classList.contains('bullet--disruption')).to.be.true;
  });
});
