import { aTimeout, assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import type { SinonStub } from 'sinon';
import { stub } from 'sinon';

import { i18nOccupancy } from '../core/i18n';
import { fixture, waitForLitRender } from '../core/testing';

import { SbbTimetableOccupancyIconElement } from './timetable-occupancy-icon';

describe(`sbb-timetable-occupancy-icon with ${fixture.name}`, () => {
  let matchMediaStub: SinonStub<[query: string], MediaQueryList>;
  const mediaQueryListArgs: MediaQueryList = {
    matches: false,
    media: '',
    onchange: stub(),
    addListener: stub(), // deprecated
    removeListener: stub(), // deprecated
    addEventListener: stub(),
    removeEventListener: stub(),
    dispatchEvent: stub(),
  };

  beforeEach(() => {
    matchMediaStub = stub(window, 'matchMedia');
  });

  afterEach(() => {
    matchMediaStub.restore();
  });

  it('renders', async () => {
    matchMediaStub.withArgs('(forced-colors: active)').returns({
      ...mediaQueryListArgs,
      matches: false,
      media: '(forced-colors: active)',
    });
    matchMediaStub.withArgs('(prefer-color-scheme: dark)').returns({
      ...mediaQueryListArgs,
      matches: false,
      media: '(prefer-color-scheme: dark)',
    });
    const element: SbbTimetableOccupancyIconElement = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="low"></sbb-timetable-occupancy-icon>`,
      { modules: ['./timetable-occupancy-icon.ts'] },
    );
    assert.instanceOf(element, SbbTimetableOccupancyIconElement);
    expect(element.getAttribute('aria-label')).to.equal(i18nOccupancy.low.en);
    await aTimeout(100);
    await waitForLitRender(element);
    expect(element.shadowRoot!.querySelector('svg-fake')).to.have.attribute(
      'data-name',
      'utilization-low',
    );
  });

  it('renders high contrast mode', async () => {
    matchMediaStub.withArgs('(forced-colors: active)').returns({
      ...mediaQueryListArgs,
      matches: true,
      media: '(forced-colors: active)',
    });
    matchMediaStub.withArgs('(prefer-color-scheme: dark)').returns({
      ...mediaQueryListArgs,
      matches: false,
      media: '(prefer-color-scheme: dark)',
    });
    const element: SbbTimetableOccupancyIconElement = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="medium"></sbb-timetable-occupancy-icon>`,
      { modules: ['./timetable-occupancy-icon.ts'] },
    );
    assert.instanceOf(element, SbbTimetableOccupancyIconElement);
    expect(element.getAttribute('aria-label')).to.equal(i18nOccupancy.medium.en);
    await aTimeout(100);
    await waitForLitRender(element);
    expect(element.shadowRoot!.querySelector('svg-fake')).to.have.attribute(
      'data-name',
      'utilization-medium-high-contrast',
    );
  });

  it('renders negative', async () => {
    matchMediaStub.withArgs('(forced-colors: active)').returns({
      ...mediaQueryListArgs,
      matches: false,
      media: '(forced-colors: active)',
    });
    matchMediaStub.withArgs('(prefer-color-scheme: dark)').returns({
      ...mediaQueryListArgs,
      matches: true,
      media: '(prefer-color-scheme: dark)',
    });
    const element: SbbTimetableOccupancyIconElement = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="medium"></sbb-timetable-occupancy-icon>`,
      { modules: ['./timetable-occupancy-icon.ts'] },
    );
    assert.instanceOf(element, SbbTimetableOccupancyIconElement);
    expect(element.getAttribute('aria-label')).to.equal(i18nOccupancy.medium.en);
    await aTimeout(100);
    await waitForLitRender(element);
    expect(element.shadowRoot!.querySelector('svg-fake')).to.have.attribute(
      'data-name',
      'utilization-medium-negative',
    );
  });
});
