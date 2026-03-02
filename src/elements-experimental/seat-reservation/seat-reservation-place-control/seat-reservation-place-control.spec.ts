import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForLitRender } from '../../../elements/core/testing.ts';
import type { PlaceSelection } from '../common/types.ts';

import { SbbSeatReservationPlaceControlElement } from './seat-reservation-place-control.component.ts';

describe('sbb-seat-reservation-place-control', () => {
  let element: SbbSeatReservationPlaceControlElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation-place-control></sbb-seat-reservation-place-control>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationPlaceControlElement);
  });

  it('should be accessible', async () => {
    await expect(element).to.be.accessible();
  });

  it('should have correct default settings', async () => {
    await waitForLitRender(element);
    await expect(element.state).to.be.equal('FREE');
    await expect(element.placeType).to.be.equal('SEAT');
    expect(element.preventClick).to.be.false;

    const root = element.shadowRoot!;
    expect(root.querySelector('.sbb-sr-place-ctrl')).to.exist;
    expect(root.querySelector('.sbb-sr-place-ctrl__text')).to.exist;
    expect(root.querySelector('sbb-seat-reservation-graphic')).to.exist;
  });

  it('should map properties to element', async () => {
    element.setAttribute('text', 'A1');
    element.setAttribute('deck-index', '1');
    element.setAttribute('coach-index', '2');
    element.setAttribute('type', 'BICYCLE');
    element.setAttribute('state', 'SELECTED');

    await waitForLitRender(element);
    await expect(element.text).to.be.equal('A1');
    await expect(element.deckIndex).to.be.equal(1);
    await expect(element.coachIndex).to.be.equal(2);
    await expect(element.placeType).to.be.equal('BICYCLE');
    await expect(element.state).to.be.equal('SELECTED');
  });

  it('should emit full placeSelection detail on click', async () => {
    element.setAttribute('id', 'place-1');
    element.setAttribute('deck-index', '1');
    element.setAttribute('coach-index', '2');
    element.setAttribute('text', 'A1');
    element.setAttribute('type', 'BICYCLE');
    element.setAttribute('state', 'FREE');

    await waitForLitRender(element);

    const selectPlaceSpy = new EventSpy<CustomEvent<PlaceSelection>>('selectplace', element);

    element.click();
    await element.updateComplete;

    await selectPlaceSpy.calledOnce();

    const evt = selectPlaceSpy.events[0];

    await expect(evt.detail.id).to.equal('place-1');
    await expect(evt.detail.deckIndex).to.equal(1);
    await expect(evt.detail.coachIndex).to.equal(2);
    await expect(evt.detail.number).to.equal('A1');
    await expect(evt.detail.placeType).to.equal('BICYCLE');
    await expect(evt.detail.state).to.equal('SELECTED');
  });

  it('should toggle free seat to selected, when clicking', async () => {
    const clickSpy = new EventSpy('click');
    element.setAttribute('state', 'FREE');
    await waitForLitRender(element);
    element.click();
    await expect(clickSpy.count).to.be.equal(1);
    await expect(element.state).to.be.equal('SELECTED');
  });

  it('should toggle selected seat to free, when clicking', async () => {
    const clickSpy = new EventSpy('click');
    element.setAttribute('state', 'SELECTED');
    await waitForLitRender(element);
    element.click();
    await expect(clickSpy.count).to.be.equal(1);
    await expect(element.state).to.be.equal('FREE');
  });

  it('should toggle free seat to selected on enter-button press', async () => {
    const clickSpy = new EventSpy('click');
    element.setAttribute('state', 'FREE');
    element.focus();
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    await expect(clickSpy.count).to.be.equal(1);
    await expect(element.state).to.be.equal('SELECTED');
  });

  it('should toggle selected seat to free on enter-button press', async () => {
    const clickSpy = new EventSpy('click');
    element.setAttribute('state', 'SELECTED');
    element.focus();
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    await expect(clickSpy.count).to.be.equal(1);
    await expect(element.state).to.be.equal('FREE');
  });

  it('should not toggle to selected when blocked on enter-button press', async () => {
    const clickSpy = new EventSpy('click');
    element.setAttribute('state', 'BLOCKED');
    element.focus();
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);
    await expect(clickSpy.count).to.be.equal(1);
    await expect(element.state).to.be.equal('BLOCKED');
  });

  it('should toggle free seat to selected on space-button press', async () => {
    const clickSpy = new EventSpy('click');
    element.setAttribute('state', 'FREE');
    element.focus();
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    await expect(clickSpy.count).to.be.equal(1);
    await expect(element.state).to.be.equal('SELECTED');
  });

  it('should toggle selected seat to free on space-button press', async () => {
    element.setAttribute('state', 'SELECTED');
    element.focus();
    const selectPlaceSpy = new EventSpy('selectplace', element);
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    await expect(selectPlaceSpy.count).to.be.equal(1);
    await expect(element.state).to.be.equal('FREE');
  });

  it('should not toggle to selected when blocked on space-button press', async () => {
    element.setAttribute('state', 'BLOCKED');
    element.focus();
    const selectPlaceSpy = new EventSpy('selectplace', element);
    await sendKeys({ press: 'Space' });
    await waitForLitRender(element);
    await expect(selectPlaceSpy.count).to.equal(0);
    await expect(element.state).to.be.equal('BLOCKED');
  });

  it('should not toggle or emit, when preventClick is true', async () => {
    element.setAttribute('state', 'FREE');
    element.setAttribute('prevent-click', '');
    await waitForLitRender(element);

    const selectPlaceSpy = new EventSpy('selectplace', element);

    element.click();
    await element.updateComplete;

    await expect(element.state).to.equal('FREE');
    await expect(selectPlaceSpy.count).to.equal(0);
  });

  it('should not toggle or emit, when seat is blocked ', async () => {
    element.setAttribute('state', 'BLOCKED');
    await waitForLitRender(element);

    const selectPLaceSpy = new EventSpy('selectplace', element);

    element.click();
    await element.updateComplete;

    await expect(element.state).to.equal('BLOCKED');
    await expect(selectPLaceSpy.count).to.equal(0);
  });

  it('should call focus-function, if keyfocus is set to focus', async () => {
    let focused = false;

    element.focus = () => {
      focused = true;
    };

    element.keyfocus = 'focus';
    await element.updateComplete;

    expect(focused).to.be.true;
  });

  it('should apply disabled class when preventClick is true', async () => {
    element.setAttribute('prevent-click', '');

    await waitForLitRender(element);
    const wrapper = element.shadowRoot!.querySelector('.sbb-sr-place-ctrl')!;
    expect(wrapper.className).to.include('sbb-reservation-place-control--disabled');
  });

  it('should render correct state- and type-classes', async () => {
    element.setAttribute('type', 'BICYCLE');
    element.setAttribute('state', 'SELECTED');

    await waitForLitRender(element);
    const wrapper = element.shadowRoot!.querySelector('.sbb-sr-place-ctrl')!;
    expect(wrapper.className).to.include('sbb-sr-place-ctrl--type-bicycle');
    expect(wrapper.className).to.include('sbb-sr-place-ctrl--state-selected');
  });

  it('should update title when propertyIds are set and showTitleInfo is set to true', async () => {
    element.showTitleInfo = true;
    const initialTitle = element.title;

    element.propertyIds = ['QUIET', 'TABLE'];
    await waitForLitRender(element);

    await expect(element.title).to.not.be.equal(initialTitle);
  });
});
