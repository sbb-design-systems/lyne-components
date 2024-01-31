import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import './checkbox';

describe('sbb-checkbox', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-checkbox>Label</sbb-checkbox>`);

    expect(root).dom.to.be.equal(`
      <sbb-checkbox aria-checked="false" aria-disabled="false" aria-required="false" icon-placement="end" role="checkbox" size="m" tabindex="0" data-slot-names="unnamed">
        Label
      </sbb-checkbox>
    `);

    await waitForLitRender(root);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  describe('icon position', () => {
    it('start', async () => {
      const root = await fixture(
        html`<sbb-checkbox icon-name="tickets-class-small" icon-placement="start" size="s"
          >Label</sbb-checkbox
        >`,
      );

      await waitForLitRender(root);

      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="false" aria-disabled="false" aria-required="false" icon-name="tickets-class-small" icon-placement="start" role="checkbox" size="s" tabindex="0" data-slot-names="unnamed">
          Label
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    it('with slotted icon', async () => {
      const root = await fixture(
        html`<sbb-checkbox size="s">
          Label
          <sbb-icon slot="icon" name="tickets-class-small"></sbb-icon>
        </sbb-checkbox>`,
      );

      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="false" aria-disabled="false" aria-required="false" icon-placement="end" role="checkbox" size="s" tabindex="0" data-slot-names="icon unnamed">
          Label
          <sbb-icon slot="icon" name="tickets-class-small" aria-hidden="true" data-namespace="default" role="img"></sbb-icon>
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('state', () => {
    it('checked', async () => {
      const root = await fixture(html`<sbb-checkbox checked>Label</sbb-checkbox>`);

      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="true" aria-disabled="false" aria-required="false" checked icon-placement="end" role="checkbox" size="m" tabindex="0" data-slot-names="unnamed">
          Label
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    it('indeterminate', async () => {
      const root = await fixture(html`<sbb-checkbox indeterminate>Label</sbb-checkbox>`);

      const input = root.shadowRoot!.querySelector<HTMLInputElement>('input')!;
      expect(input.indeterminate).to.be.equal(true);

      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="mixed" aria-disabled="false" aria-required="false" icon-placement="end" indeterminate role="checkbox" size="m" tabindex="0" data-slot-names="unnamed">
          Label
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    it('unchecked disabled', async () => {
      const root = await fixture(html`<sbb-checkbox disabled>Label</sbb-checkbox>`);
      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="false" aria-disabled="true" aria-required="false" disabled icon-placement="end" size="m" role="checkbox" data-slot-names="unnamed">
          Label
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot('Unchecked - A11y tree', html`<sbb-checkbox>Label</sbb-checkbox>`);

  testA11yTreeSnapshot('Checked - A11y tree', html`<sbb-checkbox checked>Label</sbb-checkbox>`);
});
