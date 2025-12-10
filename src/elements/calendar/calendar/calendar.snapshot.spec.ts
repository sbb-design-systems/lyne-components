import { expect } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { type SinonStub, stub } from 'sinon';

import { defaultDateAdapter } from '../../core/datetime.ts';
import {
  fixture,
  sbbBreakpointLargeMinPx,
  testA11yTreeSnapshot,
} from '../../core/testing/private.ts';

import type { SbbCalendarElement } from './calendar.component.ts';

import './calendar.component.ts';

describe(`sbb-calendar`, () => {
  let todayStub: SinonStub;

  before(() => {
    todayStub = stub(defaultDateAdapter, 'today').returns(new Date(2023, 0, 4, 0, 0, 0));
  });

  after(() => {
    todayStub.restore();
  });

  describe('renders', () => {
    let element: SbbCalendarElement;

    beforeEach(async () => {
      element = await fixture(html` <sbb-calendar selected="2023-01-20T00:00:00"></sbb-calendar> `);
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
        <sbb-calendar selected="2023-01-20T00:00:00" orientation="vertical"></sbb-calendar>
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
        <sbb-calendar selected="2023-01-20T00:00:00" multiple></sbb-calendar>
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
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 640 });
      element = await fixture(html`
        <sbb-calendar
          selected="2023-01-20T00:00:00"
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
      await setViewport({ width: sbbBreakpointLargeMinPx, height: 640 });
      element = await fixture(html`
        <sbb-calendar
          selected="2023-01-20T00:00:00"
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
