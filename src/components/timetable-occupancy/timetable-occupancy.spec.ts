import { expect } from '@open-wc/testing';
import type { Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { sbbSpread } from '../core/dom';
import { fixture } from '../core/testing/private';

import type { SbbTimetableOccupancyElement } from './timetable-occupancy';

import './timetable-occupancy';

describe(`sbb-timetable-occupancy`, () => {
  const renderComponent: (args: Args) => TemplateResult = (args: Args) => {
    return html`<sbb-timetable-occupancy ${sbbSpread(args)}></sbb-timetable-occupancy>`;
  };

  it('renders - DOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({
        'first-class-occupancy': 'high',
        'second-class-occupancy': 'high',
      }),
    );
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({
        'first-class-occupancy': 'high',
        'second-class-occupancy': 'high',
      }),
    );
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders negative - DOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({
        'first-class-occupancy': 'low',
        'second-class-occupancy': 'medium',
        negative: true,
      }),
    );
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders negative - ShadowDOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({
        'first-class-occupancy': 'low',
        'second-class-occupancy': 'medium',
        negative: true,
      }),
    );
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders only first class wagon - DOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({ 'first-class-occupancy': 'low' }),
    );
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders only first class wagon - ShadowDOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({ 'first-class-occupancy': 'low' }),
    );
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders only second class wagon - DOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({ 'second-class-occupancy': 'none' }),
    );
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders only second class wagon - ShadowDOM', async () => {
    const element: SbbTimetableOccupancyElement = await fixture(
      renderComponent({ 'second-class-occupancy': 'none' }),
    );
    await expect(element).shadowDom.to.be.equalSnapshot();
  });
});
