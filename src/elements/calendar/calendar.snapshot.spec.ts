import { expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import './calendar.component.js';
import type { SbbCalendarElement } from './calendar.component.js';

describe(`sbb-calendar`, () => {
  describe('renders', () => {
    let element: SbbCalendarElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-calendar selected="2023-01-20T00:00:00" now="2023-01-04T00:00:00"></sbb-calendar>
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

  describe('renders vertical', () => {
    let element: SbbCalendarElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-calendar
          selected="2023-01-20T00:00:00"
          now="2023-01-04T00:00:00"
          orientation="vertical"
        ></sbb-calendar>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders multiple', () => {
    let element: SbbCalendarElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-calendar
          selected="2023-01-20T00:00:00"
          now="2023-01-04T00:00:00"
          multiple
        ></sbb-calendar>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders horizontal wide with week numbers', () => {
    let element: SbbCalendarElement;

    beforeEach(async () => {
      await setViewport({ width: 1280, height: 640 });
      element = await fixture(html`
        <sbb-calendar
          selected="2023-01-20T00:00:00"
          now="2023-01-04T00:00:00"
          orientation="horizontal"
          wide
          week-numbers
        ></sbb-calendar>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders vertical wide with week numbers', () => {
    let element: SbbCalendarElement;

    beforeEach(async () => {
      await setViewport({ width: 1280, height: 640 });
      element = await fixture(html`
        <sbb-calendar
          selected="2023-01-20T00:00:00"
          now="2023-01-04T00:00:00"
          orientation="vertical"
          wide
          week-numbers
        ></sbb-calendar>
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
