import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTabLabelElement } from './tab-label.component.ts';
import './tab-label.component.ts';

describe(`sbb-tab-label`, () => {
  describe(`renders`, () => {
    let element: SbbTabLabelElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-tab-label>Label</sbb-tab-label>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe(`renders correctly an H2 heading tag`, () => {
    let element: SbbTabLabelElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-tab-label level="2" icon-name="pie-small">Label</sbb-tab-label>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe(`renders an H1 heading tag if the provided level is greater than 6`, () => {
    let element: SbbTabLabelElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-tab-label level="7" amount="78">Label</sbb-tab-label>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`<sbb-tab-label>Tab title</sbb-tab-label>`);
});
