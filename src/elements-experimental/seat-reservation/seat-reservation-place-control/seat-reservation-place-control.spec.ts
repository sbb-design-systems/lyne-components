import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationPlaceControlElement } from './seat-reservation-place-control.component.js';

describe('seat-reservation-place-control', () => {
  let element: SbbSeatReservationPlaceControlElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation-place-control
        text="1A"
        deck-index="0"
        coach-index="0"
      ></sbb-seat-reservation-place-control>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationPlaceControlElement);
  });

  it('should have correct default settings', async () => {
    assert.equal(element.state, 'FREE');
    assert.equal(element.placeType, 'SEAT');
    assert.isFalse(element.preventClick);

    const root = element.shadowRoot!;
    assert.exists(root.querySelector('.sbb-sr-place-ctrl'));
    assert.exists(root.querySelector('.sbb-sr-place-ctrl__text'));
    assert.exists(root.querySelector('sbb-seat-reservation-graphic'));
  });

  it('should map properties to element', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control
        text="A1"
        deck-index="1"
        coach-index="2"
        type="BYCICLE"
        state="SELECTED"
      ></sbb-seat-reservation-place-control>`,
    );

    assert.equal(el.text, 'A1');
    assert.equal(el.deckIndex, 1);
    assert.equal(el.coachIndex, 2);
    assert.equal(el.placeType, 'BYCICLE');
    assert.equal(el.state, 'SELECTED');
  });

  it('should toggle free seat to selected, when clicking', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control state="FREE"></sbb-seat-reservation-place-control>`,
    );

    const eventPromise = new Promise<CustomEvent>((resolve) =>
      el.addEventListener('selectplace', (e) => resolve(e as CustomEvent)),
    );

    el.click();
    const evt = await eventPromise;

    assert.equal(el.state, 'SELECTED');
    assert.deepInclude(evt.detail, {
      state: 'SELECTED',
    });
  });
});
