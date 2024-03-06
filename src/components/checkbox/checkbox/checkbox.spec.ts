import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';

import type { SbbCheckboxElement } from './checkbox';

import './checkbox';

describe('sbb-checkbox', () => {
  let element: SbbCheckboxElement;

  describe('should render unchecked', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-checkbox>Label</sbb-checkbox>`);
      await waitForLitRender(element);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render checked', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-checkbox checked>Label</sbb-checkbox>`);
      await waitForLitRender(element);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render indeterminate', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-checkbox indeterminate>Label</sbb-checkbox>`);
      await waitForLitRender(element);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render unchecked disabled', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-checkbox disabled>Label</sbb-checkbox>`);
      await waitForLitRender(element);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`<sbb-checkbox>Label</sbb-checkbox>`, 'Unchecked - A11y tree');

  testA11yTreeSnapshot(html`<sbb-checkbox checked>Label</sbb-checkbox>`, 'Checked - A11y tree');
});
