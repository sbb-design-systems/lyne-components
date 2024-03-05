import { expect, fixture } from '@open-wc/testing';
import { a11ySnapshot } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbCheckboxElement } from './checkbox';

import './checkbox';

describe('sbb-checkbox', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-checkbox>Label</sbb-checkbox>`);

    expect(root).dom.to.be.equal(`
      <sbb-checkbox icon-placement="end" size="m" tabindex="0" data-slot-names="unnamed">
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
        <sbb-checkbox icon-name="tickets-class-small" icon-placement="start" size="s" tabindex="0" data-slot-names="unnamed">
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
        <sbb-checkbox icon-placement="end" size="s" tabindex="0" data-slot-names="icon unnamed">
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
        <sbb-checkbox checked icon-placement="end" size="m" tabindex="0" data-slot-names="unnamed">
          Label
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    it('indeterminate', async () => {
      const root: SbbCheckboxElement = await fixture(
        html`<sbb-checkbox indeterminate>Label</sbb-checkbox>`,
      );

      const snapshot = (await a11ySnapshot({ selector: 'sbb-checkbox' })) as any;
      expect(snapshot.checked).to.be.equal('mixed');
      expect(root).dom.to.be.equal(`
        <sbb-checkbox icon-placement="end" indeterminate size="m" tabindex="0" data-slot-names="unnamed">
          Label
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    it('unchecked disabled', async () => {
      const root = await fixture(html`<sbb-checkbox disabled>Label</sbb-checkbox>`);
      expect(root).dom.to.be.equal(`
        <sbb-checkbox disabled icon-placement="end" size="m" data-slot-names="unnamed" tabindex="0">
          Label
        </sbb-checkbox>
      `);

      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`<sbb-checkbox>Label</sbb-checkbox>`, 'Unchecked - A11y tree');

  testA11yTreeSnapshot(html`<sbb-checkbox checked>Label</sbb-checkbox>`, 'Checked - A11y tree');
});
