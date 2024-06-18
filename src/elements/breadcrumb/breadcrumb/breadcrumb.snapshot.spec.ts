import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbBreadcrumbElement } from './breadcrumb.js';
import './breadcrumb.js';

describe(`sbb-breadcrumb`, () => {
  describe('with text', () => {
    let element: SbbBreadcrumbElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-breadcrumb href="https://example.com/test" target="_blank" download rel="subsection"
          >Breadcrumb</sbb-breadcrumb
        >
      `);
    });

    it('renders - DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('renders - Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('with icon', () => {
    let element: SbbBreadcrumbElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
      `);
    });

    it('renders - DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('renders - Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('with icon and text', () => {
    let element: SbbBreadcrumbElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-breadcrumb dir="ltr" data-action data-link href="/" icon-name="house-small">
          Home
        </sbb-breadcrumb>
      `);
    });

    it('renders - DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('renders - Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot(html`
      <sbb-breadcrumb href="https://example.com/test">Breadcrumb</sbb-breadcrumb>
    `);
  });
});
