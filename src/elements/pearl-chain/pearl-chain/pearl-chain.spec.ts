import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import type { SbbPearlChainNodeElement } from '../pearl-chain-node/pearl-chain-node.component.ts';

import { SbbPearlChainElement } from './pearl-chain.component.ts';

import '../../pearl-chain.ts';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;
  let nodes: SbbPearlChainNodeElement[];

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
    nodes = Array.from(element.querySelectorAll('sbb-pearl-chain-node'));
  });

  it('renders', () => {
    assert.instanceOf(element, SbbPearlChainElement);
  });

  it('renders one line per node pair', () => {
    expect(element.shadowRoot!.querySelectorAll('line[data-segment]')).to.have.length(
      nodes.length - 1,
    );
  });

  it('removes a line when a node is removed', async () => {
    nodes[1].remove();
    await waitForLitRender(element);

    expect(element.shadowRoot!.querySelectorAll('line[data-segment]')).to.have.length(
      nodes.length - 2,
    );
  });

  it('sets :state(horizontal) when nodes are spread more horizontally than vertically', async () => {
    element = await fixture(html`
      <sbb-pearl-chain>
        <div style="display: flex; width: 200px;">
          <sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>
          <span style="flex: 1;"></span>
          <sbb-pearl-chain-node type="end"></sbb-pearl-chain-node>
        </div>
      </sbb-pearl-chain>
    `);
    expect(element.matches(':state(horizontal)')).to.be.true;
  });

  it('does not set :state(horizontal) when nodes are stacked vertically', async () => {
    element = await fixture(html`
      <sbb-pearl-chain>
        <div style="display: flex; flex-direction: column; height: 200px;">
          <sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>
          <span style="flex: 1;"></span>
          <sbb-pearl-chain-node type="end"></sbb-pearl-chain-node>
        </div>
      </sbb-pearl-chain>
    `);
    expect(element.matches(':state(horizontal)')).to.be.false;
  });

  describe('disrupted / irrelevant / walk / unsure lines', () => {
    it('mark both lines on "true" adjacent nodes', async () => {
      element = await fixture(html`
        <sbb-pearl-chain>
          <sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="stop" disrupted></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="stop" irrelevant></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="stop" walk></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="stop" unsure></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="end"></sbb-pearl-chain-node>
        </sbb-pearl-chain>
      `);
      const lines = element.shadowRoot!.querySelectorAll('line');
      expect(lines[0].classList.contains('line--disruption')).to.be.true;
      expect(lines[1].classList.contains('line--disruption')).to.be.true;
      expect(lines[1].classList.contains('line--irrelevant')).to.be.true;
      expect(lines[2].classList.contains('line--irrelevant')).to.be.true;
      expect(lines[2].classList.contains('line--walk')).to.be.true;
      expect(lines[3].classList.contains('line--walk')).to.be.true;
      expect(lines[3].classList.contains('line--unsure')).to.be.true;
      expect(lines[4].classList.contains('line--unsure')).to.be.true;
    });

    it('mark lines based adjacent nodes state', async () => {
      element = await fixture(html`
        <sbb-pearl-chain>
          <sbb-pearl-chain-node type="start" disrupted="departure"></sbb-pearl-chain-node>
          <sbb-pearl-chain-node
            type="stop"
            disrupted="arrival"
            irrelevant="departure"
          ></sbb-pearl-chain-node>
          <sbb-pearl-chain-node
            type="stop"
            irrelevant="arrival"
            walk="departure"
          ></sbb-pearl-chain-node>
          <sbb-pearl-chain-node type="end"></sbb-pearl-chain-node>
        </sbb-pearl-chain>
      `);
      const lines = element.shadowRoot!.querySelectorAll('line');
      expect(lines[0].classList.contains('line--disruption')).to.be.true;
      expect(lines[1].classList.contains('line--irrelevant')).to.be.true;
      expect(lines[1].classList.contains('line--disruption')).to.be.false;
      expect(lines[2].classList.contains('line--walk')).to.be.true;
      expect(lines[2].classList.contains('line--irrelevant')).to.be.false;
    });
  });

  it('marks a line as past once "now" is after its ending node', async () => {
    // Set 'now' between 'arrival' and 'departure' of the first stop
    element.now = '2026-09-14T11:05:00';
    await waitForLitRender(element);

    const lines = element.shadowRoot!.querySelectorAll('line');
    expect(lines[0]!.classList.contains('line--past')).to.be.true;
    expect(lines[1]!.classList.contains('line--past')).to.be.false;
  });

  it('splits the line and renders a pulsing "now" dot while between departure and arrival', async () => {
    // Set 'now' between the departure and the first stop
    element.now = '2026-09-14T10:00:00';
    await waitForLitRender(element);

    expect(element.shadowRoot!.querySelector('line[data-role="before"]')).not.to.be.null;
    expect(element.shadowRoot!.querySelector('circle.now-dot')).not.to.be.null;
    expect(element.shadowRoot!.querySelector('line[data-role="after"]')).not.to.be.null;
  });

  it('does not split a disrupted or walk line even if "now" is within its window', async () => {
    // Set 'now' between the departure and the first stop
    element.now = '2026-09-14T10:00:00';
    nodes[0].disrupted = 'departure';
    await waitForLitRender(element);

    expect(element.shadowRoot!.querySelector('line[data-role="before"]')).to.be.null;
    expect(element.shadowRoot!.querySelector('circle.now-dot')).to.be.null;
    expect(element.shadowRoot!.querySelector('line[data-role="after"]')).to.be.null;
  });
});
