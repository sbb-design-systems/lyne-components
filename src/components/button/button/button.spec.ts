import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbButtonElement } from './button';
import './button';

describe('sbb-button', () => {
  describe('renders a button without icon', async () => {
    const root = await fixture(
      html` <sbb-button
        negative
        size="m"
        type="button"
        disabled
        name="name"
        value="value"
        form="formid"
      >
        Label Text
      </sbb-button>`,
    );

    it('Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a button with slotted icon', async () => {
    let root: SbbButtonElement;

    beforeEach(async () => {
      root = await fixture(
        html`<sbb-button>
          <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
          Label Text
        </sbb-button> `,
      );
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
      html`<sbb-button><sbb-icon slot="icon" name="app-icon-medium"></sbb-icon></sbb-button>`,
    );

    await waitForLitRender(root);

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  it('should detect icon button when there is space around icon', async () => {
    const root = await fixture(
      html`<sbb-button> <sbb-icon slot="icon" name="app-icon-medium"></sbb-icon> </sbb-button>`,
    );

    const dataSlots = root.getAttribute('data-slot-names');
    expect(dataSlots).to.contain('icon');
    expect(dataSlots).not.to.contain('unnamed');
  });

  testA11yTreeSnapshot();
});
