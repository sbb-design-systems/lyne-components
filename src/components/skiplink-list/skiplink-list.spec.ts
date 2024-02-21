import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbSkiplinkListElement } from './skiplink-list';
import './skiplink-list';
import '../link/block-link';

describe('sbb-skiplink-list', () => {
  describe('renders', () => {
    let element: SbbSkiplinkListElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-skiplink-list>
          <sbb-block-link href="#">Link 1</sbb-block-link>
          <sbb-block-link href="#">Link 2</sbb-block-link>
          <sbb-block-link href="#">Link 3</sbb-block-link>
        </sbb-skiplink-list>
      `);
      await waitForLitRender(element);
    });

    it('Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with title', () => {
    let element: SbbSkiplinkListElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-skiplink-list title-content="Skip to" title-level="3">
          <sbb-block-link href="https://www.sbb.ch">Link 1</sbb-block-link>
          <sbb-block-link href="https://www.sbb.ch">Link 2</sbb-block-link>
          <sbb-block-link href="https://www.sbb.ch">Link 3</sbb-block-link>
        </sbb-skiplink-list>
      `);
      await waitForLitRender(element);
    });

    it('Dom', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  it('should render named slots if data-ssr-child-count attribute is set', async () => {
    const root = await fixture(
      html`<sbb-skiplink-list data-ssr-child-count="3"></sbb-skiplink-list>`,
    );
    await expect(root).shadowDom.to.equalSnapshot();
  });
});
