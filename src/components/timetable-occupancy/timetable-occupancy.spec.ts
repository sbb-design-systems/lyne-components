import { expect, fixture } from '@open-wc/testing';
import { Args } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { sbbSpread } from '../core/dom';

import type { SbbTimetableOccupancy } from './timetable-occupancy';
import './timetable-occupancy';

describe('sbb-timetable-occupancy', () => {
  const renderComponent: (args: Args) => TemplateResult = (args: Args) => {
    return html`<sbb-timetable-occupancy ${sbbSpread(args)}></sbb-timetable-occupancy>`;
  };

  it('renders - DOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({
        'first-class-occupancy': 'high',
        'second-class-occupancy': 'high',
      }),
    );
    expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({
        'first-class-occupancy': 'high',
        'second-class-occupancy': 'high',
      }),
    );
    expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders negative - DOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({
        'first-class-occupancy': 'low',
        'second-class-occupancy': 'medium',
        negative: true,
      }),
    );
    expect(element).dom.to.be.equalSnapshot();
  });

  it('renders negative - ShadowDOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({
        'first-class-occupancy': 'low',
        'second-class-occupancy': 'medium',
        negative: true,
      }),
    );
    expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders only first class wagon - DOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({ 'first-class-occupancy': 'low' }),
    );
    expect(element).dom.to.be.equalSnapshot();
  });

  it('renders only first class wagon - ShadowDOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({ 'first-class-occupancy': 'low' }),
    );
    expect(element).shadowDom.to.be.equalSnapshot();
  });

  it('renders only second class wagon - DOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({ 'second-class-occupancy': 'none' }),
    );
    expect(element).dom.to.be.equalSnapshot();
  });

  it('renders only second class wagon - ShadowDOM', async () => {
    const element: SbbTimetableOccupancy = await fixture(
      renderComponent({ 'second-class-occupancy': 'none' }),
    );
    expect(element).shadowDom.to.be.equalSnapshot();
  });
});
