import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './toggle-check';

describe('sbb-toggle-check', () => {
  it('renders sbb-toggle-check', async () => {
    const root = await fixture(html`<sbb-toggle-check></sbb-toggle-check>`);
    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
        <sbb-toggle-check size="s" aria-checked="false" aria-disabled="false" aria-required="false" label-position="after" role="checkbox" tabindex="0">
        </sbb-toggle-check>
    `);

    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  describe('label position', () => {
    it('renders label before toggle', async () => {
      const root = await fixture(html`
        <sbb-toggle-check label-position="before">Check it</sbb-toggle-check>
      `);

      await waitForLitRender(root);

      expect(root).dom.to.be.equal(`
        <sbb-toggle-check size="s" aria-checked="false" aria-disabled="false" aria-required="false" label-position="before" role="checkbox" tabindex="0">
          Check it
        </sbb-toggle-check>
      `);
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('states', () => {
    describe('checked state', () => {
      it('renders toggle in checked state', async () => {
        const root = await fixture(html`<sbb-toggle-check checked></sbb-toggle-check>`);

        await waitForLitRender(root);

        expect(root).dom.to.be.equal(
          `
          <sbb-toggle-check size="s" aria-checked="true" aria-disabled="false" aria-required="false" checked label-position="after" role="checkbox" tabindex="0">
          </sbb-toggle-check>
        `,
        );
        await expect(root).shadowDom.to.be.equalSnapshot();
      });
    });

    describe('disabled state', () => {
      it('renders toggle in disabled state', async () => {
        const root = await fixture(html`<sbb-toggle-check disabled></sbb-toggle-check>`);

        await waitForLitRender(root);

        expect(root).dom.to.be.equal(`
          <sbb-toggle-check size="s" aria-checked="false" aria-disabled="true" aria-required="false" disabled label-position="after" role="checkbox">
          </sbb-toggle-check>
        `);
        await expect(root).shadowDom.to.be.equalSnapshot();
      });
    });

    describe('disabled and checked state', () => {
      it('renders toggle in disabled and checked state', async () => {
        const root = await fixture(html`<sbb-toggle-check checked disabled></sbb-toggle-check>`);

        await waitForLitRender(root);

        expect(root).dom.to.be.equal(`
          <sbb-toggle-check checked disabled size="s" label-position="after" aria-checked="true" aria-disabled="true" aria-required="false" role="checkbox">
          </sbb-toggle-check>
        `);
        await expect(root).shadowDom.to.be.equalSnapshot();
      });
    });
  });

  testA11yTreeSnapshot(html`<sbb-toggle-check></sbb-toggle-check>`);
});
