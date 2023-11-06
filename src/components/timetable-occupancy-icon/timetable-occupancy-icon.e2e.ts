import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SinonStub, stub } from 'sinon';

import { SbbTimetableOccupancyIcon } from './timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
  it('renders', async () => {
    const element: SbbTimetableOccupancyIcon = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="LOW"></sbb-timetable-occupancy-icon>`,
    );
    assert.instanceOf(element, SbbTimetableOccupancyIcon);
    expect(element.name).to.equal('utilization-low');
  });
});

describe('high contrast', () => {
  beforeEach(() => {
    const matchMediaStub: SinonStub<[query: string], MediaQueryList> = stub(window, 'matchMedia');
    matchMediaStub.withArgs('(forced-colors: active)').returns({
      onchange: stub(),
      matches: true,
      media: '(forced-colors: active)',
      addListener: stub(), // deprecated
      removeListener: stub(), // deprecated
      addEventListener: stub(),
      removeEventListener: stub(),
      dispatchEvent: stub(),
    });
    matchMediaStub.withArgs('(prefer-color-scheme: dark)').returns({
      onchange: stub(),
      matches: false,
      media: '(prefer-color-scheme: dark)',
      addListener: stub(), // deprecated
      removeListener: stub(), // deprecated
      addEventListener: stub(),
      removeEventListener: stub(),
      dispatchEvent: stub(),
    });
  });

  it('renders high contrast mode', async () => {
    const element: SbbTimetableOccupancyIcon = await fixture(
      html` <sbb-timetable-occupancy-icon occupancy="MEDIUM"></sbb-timetable-occupancy-icon>`,
    );
    assert.instanceOf(element, SbbTimetableOccupancyIcon);
    expect(element.name).to.equal(`utilization-medium-high-contrast`);
  });
});
