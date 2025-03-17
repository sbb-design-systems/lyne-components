import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html, type TemplateResult } from 'lit';

import type { ITripItem } from '../core/timetable/timetable-properties.js';

import type { Boarding, Price } from './timetable-row.component.js';
import './timetable-row.component.js';
import {
  busTrip,
  cancelledTrip,
  type DeepPartial,
  defaultTrip,
  disturbanceTrip,
  extendedEnterTimeTrip,
  noticesTrip,
  partiallyCancelled,
  pastTrip,
  progressTrip,
  quayChangeTrip,
  shipTrip,
  skippedArrivalStopTrip,
  skippedDepartureStopTrip,
  skippedLastArrivalStopTrip,
  trainTrip,
  walkTimeTrip,
  a11yFootpathTrip,
} from './timetable-row.sample-data.js';

const samplePrice: Price = { price: '39.90', text: 'ab CHF', isDiscount: false };

interface Args {
  trip?: DeepPartial<ITripItem>;
  price?: Price;
  boarding?: Boarding;
  now?: number;
  active?: boolean;
  loadingTrip?: boolean;
  a11yFootpath?: boolean;
  loadingPrice?: boolean;
}

describe(`sbb-timetable-row`, () => {
  const cases = [
    { name: 'position', trip: progressTrip },
    { name: 'cancelled', trip: cancelledTrip },
    { name: 'partially cancelled', trip: partiallyCancelled },
    { name: 'past', trip: pastTrip, now: new Date('2023-12-01T12:11:00').valueOf() },
    { name: 'disturbance', trip: disturbanceTrip, now: new Date('2022-12-05T12:11:00').valueOf() },
    {
      name: 'skipped departure stop',
      trip: skippedDepartureStopTrip,
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    {
      name: 'skipped arrival stop',
      trip: skippedArrivalStopTrip,
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    {
      name: 'skipped last arrival stop',
      trip: skippedLastArrivalStopTrip,
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    { name: 'quay changed', trip: quayChangeTrip, now: new Date('2022-12-05T12:11:00').valueOf() },
    { name: 'train', trip: trainTrip },
    { name: 'bus', trip: busTrip },
    { name: 'ship', trip: shipTrip },
    { name: 'walkTime', trip: walkTimeTrip },
    { name: 'a11yFootpath', trip: a11yFootpathTrip, a11yFootpath: true },
    { name: 'extended enter time', trip: extendedEnterTimeTrip },
    { name: 'notices', trip: noticesTrip, boarding: { name: 'sa-rs', text: 'boarding' } },
  ];

  const template = (args: Args): TemplateResult => html`
    <sbb-timetable-row
      .trip=${args.trip}
      .price=${args.price}
      .boarding=${args.boarding}
      ?active=${args.active}
      ?loading-trip=${args.loadingTrip}
      ?a11y-footpath=${args.a11yFootpath}
      ?loading-price=${args.loadingPrice}
      now=${(args.now ?? new Date('2022-12-01T12:11:00').valueOf()) / 1000}
      disable-animation
    ></sbb-timetable-row>
  `;
  const wrapperStyle = { backgroundColor: 'var(--sbb-color-milk)' };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const c of cases) {
      it(
        c.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ ...c }), wrapperStyle);
        }),
      );
    }

    for (const state of [visualDiffDefault, visualDiffFocus, visualDiffHover]) {
      it(
        `basic ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ trip: defaultTrip }), wrapperStyle);
        }),
      );

      it(
        `active ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(template({ trip: defaultTrip, active: true }), wrapperStyle);
        }),
      );
    }

    it(
      'price',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ trip: defaultTrip, price: samplePrice }), wrapperStyle);
      }),
    );

    it(
      'discount',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          template({ trip: defaultTrip, price: { ...samplePrice, isDiscount: true } }),
          wrapperStyle,
        );
      }),
    );

    it(
      'loading',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          template({ trip: defaultTrip, loadingTrip: true, loadingPrice: true }),
          wrapperStyle,
        );
      }),
    );
  });
});
