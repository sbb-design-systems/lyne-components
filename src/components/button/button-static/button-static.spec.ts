import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbButtonStaticElement } from './button-static';
import './button-static';

describe('sbb-button-static', () => {
  describe('renders a button-static without icon', async () => {
    const root = await fixture(
      html` <sbb-button-static negative size="m" disabled> Label Text </sbb-button-static>`,
    );

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a primary button-static with slotted icon', async () => {
    let root: SbbButtonStaticElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-button-static>
          <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
          Label Text
        </sbb-button-static>
      `);
      await waitForLitRender(root);
    });

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  it('should detect icon button', async () => {
    const root = await fixture(
      html`<sbb-button-static
        ><sbb-icon slot="icon" name="app-icon-medium"></sbb-icon
      ></sbb-button-static>`,
    );

    await waitForLitRender(root);

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon button when there is space around icon', async () => {
    const root = await fixture(
      html`<sbb-button-static>
        <sbb-icon slot="icon" name="app-icon-medium"></sbb-icon>
      </sbb-button-static>`,
    );

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  testA11yTreeSnapshot();
});
