import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../../core/testing/private.ts';

import { SbbPearlChainElement } from './pearl-chain.component.ts';

import '../../pearl-chain.ts';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-pearl-chain></sbb-pearl-chain>`);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbPearlChainElement);
  });

  // ponytail: registration/ordering/render behaviour will be covered once the
  // SVG rendering (step 4) lands; for now this just guards the scaffold.
  it('registers and unregisters nodes without throwing', async () => {
    element = await fixture(
      html`<sbb-pearl-chain><sbb-pearl-chain-node></sbb-pearl-chain-node></sbb-pearl-chain>`,
    );
    const node = element.querySelector('sbb-pearl-chain-node')!;
    element.removeChild(node);
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
});
