import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SinonStub, stub } from 'sinon';

import { SbbTimetableOccupancyIcon } from './timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
  let matchMediaStub: SinonStub<[query: string], MediaQueryList>;
  const mediaQueryListArgs: MediaQueryList = {
    matches: false,
    media: null,
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
    const element: SbbTimetableOccupancyIcon = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="LOW"></sbb-timetable-occupancy-icon>`,
    );
    assert.instanceOf(element, SbbTimetableOccupancyIcon);
    expect(element.name).to.equal('utilization-low');
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
    const element: SbbTimetableOccupancyIcon = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="MEDIUM"></sbb-timetable-occupancy-icon>`,
    );
    assert.instanceOf(element, SbbTimetableOccupancyIcon);
    expect(element.name).to.equal(`utilization-medium-high-contrast`);
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
    const element: SbbTimetableOccupancyIcon = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="MEDIUM"></sbb-timetable-occupancy-icon>`,
    );
    assert.instanceOf(element, SbbTimetableOccupancyIcon);
    expect(element.name).to.equal(`utilization-medium-negative`);
  });
});
