import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './seat-reservation-place-control.component.js';
import type { SbbSeatReservationPlaceControlElement } from './seat-reservation-place-control.component.js';

describe('sbb-seat-reservation-place-control', () => {
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

  it('should have correct default settings', () => {
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
        type="BICYCLE"
        state="SELECTED"
      ></sbb-seat-reservation-place-control>`,
    );

    assert.equal(el.text, 'A1');
    assert.equal(el.deckIndex, 1);
    assert.equal(el.coachIndex, 2);
    assert.equal(el.placeType, 'BICYCLE');
    assert.equal(el.state, 'SELECTED');
  });

  it('should emit full placeSelection detail on click', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control
        id="place-1"
        text="1A"
        deck-index="1"
        coach-index="2"
        type="SEAT"
        state="FREE"
      ></sbb-seat-reservation-place-control>`,
    );

    const eventPromise = new Promise<CustomEvent>((resolve) =>
      el.addEventListener('selectplace', (e) => resolve(e as CustomEvent)),
    );

    el.click();
    const evt = await eventPromise;

    assert.deepInclude(evt.detail, {
      id: 'place-1',
      deckIndex: 1,
      coachIndex: 2,
      number: '1A',
      placeType: 'SEAT',
      state: 'SELECTED',
    });
  });

  it('should toggle free seat to selected, when clicking', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control state="FREE"></sbb-seat-reservation-place-control>`,
    );

    el.click();

    assert.equal(el.state, 'SELECTED');
  });

  it('should toggle selected seat to free, when clicking', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control
        state="SELECTED"
      ></sbb-seat-reservation-place-control>`,
    );

    el.click();

    assert.equal(el.state, 'FREE');
  });

  it('should not toggle or emit, when preventClick is true', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control prevent-click></sbb-seat-reservation-place-control>`,
    );

    let toggled = false;
    el.addEventListener('selectplace', () => {
      toggled = true;
    });

    el.click();

    assert.equal(el.state, 'FREE');
    assert.isFalse(toggled);
  });

  it('should not toggle or emit, when seat is blocked ', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control
        state="BLOCKED"
      ></sbb-seat-reservation-place-control>`,
    );

    let toggled = false;
    el.addEventListener('selectplace', () => {
      toggled = true;
    });

    el.click();

    assert.equal(el.state, 'BLOCKED');
    assert.isFalse(toggled);
  });

  it('should call focus-function, if keyfocus is set to focus', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control></sbb-seat-reservation-place-control>`,
    );

    let focused = false;

    el.focus = () => {
      focused = true;
    };

    el.keyfocus = 'focus';
    await el.updateComplete;

    assert.isTrue(focused);
  });

  it('should update title when propertyIds are set', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control></sbb-seat-reservation-place-control>`,
    );

    const initialTitle = el.title;

    el.propertyIds = ['QUIET', 'TABLE'];
    await el.updateComplete;

    assert.notEqual(el.title, initialTitle);
  });

  it('should apply disabled class when preventClick is true', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control prevent-click></sbb-seat-reservation-place-control>`,
    );

    const wrapper = el.shadowRoot!.querySelector('.sbb-sr-place-ctrl')!;
    assert.include(wrapper.className, 'sbb-reservation-place-control--disabled');
  });

  it('should render correct state- and type-classes', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control
        type="BICYCLE"
        state="SELECTED"
      ></sbb-seat-reservation-place-control>`,
    );

    const wrapper = el.shadowRoot!.querySelector('.sbb-sr-place-ctrl')!;
    assert.include(wrapper.className, 'sbb-sr-place-ctrl--type-bicycle');
    assert.include(wrapper.className, 'sbb-sr-place-ctrl--state-selected');
  });
});
