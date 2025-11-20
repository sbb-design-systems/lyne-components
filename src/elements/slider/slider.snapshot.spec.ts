import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.ts';

import type { SbbSliderElement } from './slider.component.ts';

import './slider.component.ts';

describe(`sbb-slider`, () => {
  let element: SbbSliderElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = (
        await fixture(html`
          <div>
            <label for="slider-1">Label</label>
            <sbb-slider value="1" id="slider-1"></sbb-slider>
          </div>
        `)
      ).querySelector('sbb-slider')!;
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with properties', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-slider
          start-icon="walk-slow-small"
          end-icon="walk-fast-small"
          min="0"
          max="500"
          value="100"
        ></sbb-slider>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders disabled', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-slider
          start-icon="walk-slow-small"
          end-icon="walk-fast-small"
          min="0"
          max="500"
          value="100"
          disabled
        ></sbb-slider>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders readonly', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-slider
          start-icon="walk-slow-small"
          end-icon="walk-fast-small"
          min="0"
          max="500"
          value="100"
          readonly
        ></sbb-slider>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders in form', async () => {
    beforeEach(async () => {
      const form = await fixture(
        html` <form>
          <sbb-slider name="sbb-slider" min="0" max="10" value="1"></sbb-slider>
          <input type="range" name="input-range" min="0" max="10" value="1" />
        </form>`,
      );
      element = form.querySelector('sbb-slider')!;
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
