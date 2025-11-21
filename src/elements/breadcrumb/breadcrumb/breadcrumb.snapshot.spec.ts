import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbBreadcrumbElement } from './breadcrumb.component.ts';
import './breadcrumb.component.ts';

describe(`sbb-breadcrumb`, () => {
  describe('renders with text', () => {
    let element: SbbBreadcrumbElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-breadcrumb href="https://example.com/test" target="_blank" download rel="subsection"
          >Breadcrumb</sbb-breadcrumb
        >
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with icon', () => {
    let element: SbbBreadcrumbElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with icon and text', () => {
    let element: SbbBreadcrumbElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-breadcrumb href="/" icon-name="house-small"> Home </sbb-breadcrumb>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
