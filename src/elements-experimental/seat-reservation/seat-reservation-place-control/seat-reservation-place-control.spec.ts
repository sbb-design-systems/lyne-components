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

  it('should toggle selected seat to free, when clicking', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control
        state="SELECTED"
      ></sbb-seat-reservation-place-control>`,
    );

    const eventPromise = new Promise<CustomEvent>((resolve) =>
      el.addEventListener('selectplace', (e) => resolve(e as CustomEvent)),
    );

    el.click();
    const evt = await eventPromise;

    assert.equal(el.state, 'FREE');
    assert.deepInclude(evt.detail, {
      state: 'FREE',
    });
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

  it('sould call focus-function, if keyfocus is set to focus', async () => {
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
      html`<sbb-seat-reservation-place-control text="1A"></sbb-seat-reservation-place-control>`,
    );

    const initialTitle = el.title;

    el.propertyIds = ['QUIET', 'TABLE'];
    await el.updateComplete;

    assert.notEqual(el.title, initialTitle);
  });

  it('applies disabled class when preventClick is true', async () => {
    const el = await fixture<SbbSeatReservationPlaceControlElement>(
      html`<sbb-seat-reservation-place-control prevent-click></sbb-seat-reservation-place-control>`,
    );

    const wrapper = el.shadowRoot!.querySelector('.sbb-sr-place-ctrl')!;
    assert.include(wrapper.className, 'sbb-reservation-place-control--disabled');
  });
});
