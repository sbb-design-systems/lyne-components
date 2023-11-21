import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './train-formation';

describe('sbb-train-formation', () => {
  it('should render with one train', async () => {
    const root = await fixture(
      html`<sbb-train-formation>
        <sbb-train>
          <sbb-train-wagon></sbb-train-wagon>
        </sbb-train>
      </sbb-train-formation>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `,
    );
    await expect(root).shadowDom.to.equalSnapshot();
  });

  it('should render with multiple trains', async () => {
    const root = await fixture(
      html`<sbb-train-formation>
        <sbb-train>
          <sbb-train-wagon></sbb-train-wagon>
        </sbb-train>
        <sbb-train>
          <sbb-train-wagon></sbb-train-wagon>
        </sbb-train>
      </sbb-train-formation>`,
    );

    // TODO: Figure out why this is necessary.
    await aTimeout(10);

    expect(root).dom.to.be.equal(
      `
        <sbb-train-formation>
          <sbb-train slot="train-0">
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
          <sbb-train slot="train-1">
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `,
    );
    await expect(root).shadowDom.to.equalSnapshot();
  });
});
