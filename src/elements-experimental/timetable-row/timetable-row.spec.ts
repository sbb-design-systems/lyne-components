import { assert, expect } from '@open-wc/testing';
import type { SbbCardElement } from '@sbb-esta/lyne-elements/card.js';
import { elementInternalsSpy, fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import type { ITripItem, Notice, PtSituation } from '../core.ts';

import {
  filterNotices,
  getCus,
  getHimIcon,
  SbbTimetableRowElement,
  sortSituation,
} from './timetable-row.component.ts';
import { partiallyCancelled, walkTimeTrip } from './timetable-row.sample-data.private.ts';

import '../timetable-row.ts';

describe(`sbb-timetable-row`, () => {
  let element: SbbTimetableRowElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-row></sbb-timetable-row>`);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbTimetableRowElement);
  });

  describe('role assignment', () => {
    it('should have role="rowgroup" when not loading', async () => {
      expect(elementInternals.get(element)!.role).to.equal('rowgroup');
    });

    it('should have no role when loading', async () => {
      element = await fixture(html`<sbb-timetable-row loading-trip></sbb-timetable-row>`);
      expect(elementInternals.get(element)!.role).to.be.null;
    });

    it('should update role when loadingTrip changes', async () => {
      element.loadingTrip = true;
      await waitForLitRender(element);
      expect(elementInternals.get(element)!.role).to.be.null;

      element.loadingTrip = false;
      await waitForLitRender(element);
      expect(elementInternals.get(element)!.role).to.equal('rowgroup');
    });
  });

  describe('badge', () => {
    const badge = (): HTMLElement | null =>
      element.shadowRoot!.querySelector<HTMLElement>('sbb-card-badge');

    it('renders no badge without price and badge label', () => {
      expect(badge()).to.be.null;
    });

    it('renders no badge while the price is loading', async () => {
      element = await fixture(
        html`<sbb-timetable-row badge-label="New" loading-price></sbb-timetable-row>`,
      );
      expect(badge()).to.be.null;
    });

    it('renders the badge label', async () => {
      element = await fixture(html`<sbb-timetable-row badge-label="New"></sbb-timetable-row>`);

      expect(badge()).not.to.be.null;
      expect(badge()!.getAttribute('color')).to.be.equal('white');
      expect(badge()!.textContent!.trim()).to.be.equal('New');
    });

    it('renders the badge label in dark color', async () => {
      element = await fixture(
        html`<sbb-timetable-row badge-label="New" badge-color="dark"></sbb-timetable-row>`,
      );

      expect(badge()!.getAttribute('color')).to.be.equal('charcoal');
    });

    it('renders the badge label instead of the price', async () => {
      element = await fixture(
        html`<sbb-timetable-row
          badge-label="New"
          .price=${{ price: '39.90', text: 'ab CHF', isDiscount: true }}
        ></sbb-timetable-row>`,
      );

      expect(badge()!.textContent!.trim()).to.be.equal('New');
      expect(badge()!.textContent).not.to.contain('%');
      expect(badge()!.textContent).not.to.contain('39.90');
    });

    it('renders the discount price in dark color', async () => {
      element = await fixture(
        html`<sbb-timetable-row
          .price=${{ price: '39.90', text: 'ab CHF', isDiscount: true }}
        ></sbb-timetable-row>`,
      );

      expect(badge()!.getAttribute('color')).to.be.equal('charcoal');
      expect(badge()!.textContent).to.contain('%');
    });

    it('renders the discount price in enforced light color', async () => {
      element = await fixture(
        html`<sbb-timetable-row
          badge-color="light"
          .price=${{ price: '39.90', text: 'ab CHF', isDiscount: true }}
        ></sbb-timetable-row>`,
      );

      expect(badge()!.getAttribute('color')).to.be.equal('white');
    });

    it('updates the badge when the label changes', async () => {
      element = await fixture(html`<sbb-timetable-row badge-label="New"></sbb-timetable-row>`);

      element.badgeLabel = '';
      await waitForLitRender(element);
      expect(badge()).to.be.null;

      element.badgeLabel = 'Updated';
      await waitForLitRender(element);
      expect(badge()!.textContent!.trim()).to.be.equal('Updated');
    });

    describe('accessibility text', () => {
      const accessibilityText = (): string =>
        element.shadowRoot!.querySelector('sbb-card-button')!.textContent!.trim();

      it('contains the price', async () => {
        element = await fixture(
          html`<sbb-timetable-row
            .trip=${walkTimeTrip}
            .price=${{ price: '39.90', text: 'ab CHF', isDiscount: true }}
          ></sbb-timetable-row>`,
        );

        expect(accessibilityText()).to.contain('ab CHF 39.90');
      });

      it('contains the badge label instead of the price', async () => {
        element = await fixture(
          html`<sbb-timetable-row
            .trip=${walkTimeTrip}
            badge-label="New"
            .price=${{ price: '39.90', text: 'ab CHF', isDiscount: true }}
          ></sbb-timetable-row>`,
        );

        expect(accessibilityText()).to.contain('New,');
        expect(accessibilityText()).not.to.contain('39.90');
      });
    });
  });

  describe('events', () => {
    it('emits an event when clicked', async () => {
      const card = element.shadowRoot!.querySelector<SbbCardElement>('sbb-card')!;
      const changeSpy = new EventSpy('click');

      card.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
    });
  });

  describe('sortSituation', () => {
    it('should return sorted array', () => {
      expect(
        sortSituation([
          { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
          { cause: 'DISTURBANCE', broadcastMessages: [] },
        ]),
      ).to.be.eql([
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
      ]);
    });

    it('should return sorted array even with double causes', () => {
      expect(
        sortSituation([
          { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
          { cause: 'DISTURBANCE', broadcastMessages: [] },
          { cause: 'DISTURBANCE', broadcastMessages: [] },
        ]),
      ).to.be.eql([
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
      ]);
    });
  });

  describe(`getHimIcon`, () => {
    it('should return replacementbus', () => {
      const situation: PtSituation = {
        cause: 'TRAIN_REPLACEMENT_BY_BUS',
        broadcastMessages: [],
      };
      expect(getHimIcon(situation).name).to.be.equal('replacementbus');
      expect(getHimIcon(situation).text).to.be.equal('');
    });

    it('should return info', () => {
      const situation: PtSituation = {
        cause: null,
        broadcastMessages: [],
      };
      expect(getHimIcon(situation).name).to.be.equal('info');
    });
  });

  describe(`getCus`, () => {
    it('should return cancellation', () => {
      expect(getCus(partiallyCancelled as ITripItem, 'en')).to.be.eql({
        name: 'cancellation',
        text: undefined,
      });
    });
  });

  describe(`filterNotices`, () => {
    it('should return sa-rr', () => {
      expect(filterNotices(walkTimeTrip?.notices as Notice[])).to.be.eql([]);
    });
  });
});
