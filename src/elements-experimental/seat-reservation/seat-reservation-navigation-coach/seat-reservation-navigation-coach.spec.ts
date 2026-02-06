import { assert, expect, fixture } from '@open-wc/testing';
import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach.component.ts';

describe('sbb-seat-reservation-navigation-coach', () => {
  let element: SbbSeatReservationNavigationCoachElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation-navigation-coach
        coach-id="coach-id"
      ></sbb-seat-reservation-navigation-coach>`,
    );

    await waitForLitRender(element);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationNavigationCoachElement);
  });

  it('should be accessible', async () => {
    await expect(element).to.be.accessible();
  });

  it('should have a button', () => {
    const el = element.shadowRoot?.querySelector('.sbb-sr-navigation__ctrl-button');
    assert.instanceOf(el, HTMLButtonElement);
  });

  it('should click the coach button once', async () => {
    const clickSpy = new EventSpy('click');

    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;
    btn.click();
    await clickSpy.calledOnce();
    await expect(clickSpy.count).to.be.equal(1);
  });

  it('should have element coach-id', async () => {
    await expect(element.coachId).to.be.equal('coach-id');
  });

  it('check child content', async () => {
    expect(
      element.shadowRoot!.firstElementChild!.classList.contains('sbb-sr-navigation__item-coach'),
    ).to.be.true;
  });

  it('should not have a clickable button', async () => {
    const clickSpy = new EventSpy('click');
    element.disable = true;

    await waitForLitRender(element);

    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    btn.click();

    expect(btn.hasAttribute('disabled')).to.be.true;
    await expect(clickSpy.count).to.be.equal(0);
  });

  it('should stop propagating click if disabled', async () => {
    element.disable = true;
    await waitForLitRender(element);

    const clickSpy = new EventSpy('click');
    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    btn.click();

    btn.dispatchEvent(new PointerEvent('click'));
    expect(clickSpy.count).not.to.be.greaterThan(0);
  });

  it('should have a driver area', async () => {
    element.driverArea = true;
    await waitForLitRender(element);

    const el = element.shadowRoot?.querySelector('.sbb-sr-navigation-driver-area');

    assert.instanceOf(el, HTMLButtonElement);
  });

  it('should have three seat-reservation-navigation-service elements when property-ids is ["BISTRO", "WIFI", "BICYCLE"]"', async () => {
    element.setAttribute('property-ids', '["BISTRO", "WIFI", "BICYCLE"]');
    await waitForLitRender(element);
    const autoWidthElements = element.shadowRoot
      ?.querySelector('sbb-seat-reservation-navigation-services')
      ?.shadowRoot?.querySelectorAll('.auto-width');
    assert.equal(autoWidthElements?.length, 3);
  });

  it('should be selected', async () => {
    element.selected = true;
    await waitForLitRender(element);
    const el = element.shadowRoot?.querySelector('.sbb-sr-navigation__item-coach--selected');
    assert.instanceOf(el, HTMLDivElement);
  });

  it('should not be selected', async () => {
    element.selected = false;
    await waitForLitRender(element);
    const el = element.shadowRoot?.querySelector('.sbb-sr-navigation__item-coach--selected');
    assert.isNull(el);
  });

  // TODO: Check logic
  it.skip('should have no outline if not focused', async () => {
    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    await expect(getComputedStyle(btn).outlineWidth).to.be.equal('0px');
  });

  it.skip('should have outline if focused', async () => {
    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    await expect(getComputedStyle(btn).outlineWidth).to.be.equal('0px');

    element.focused = true;

    await waitForLitRender(element);
    await expect(getComputedStyle(btn).outlineWidth).to.be.equal('1px');
  });

  it('should not render first-class span element for SECOND', async () => {
    element.setAttribute('travel-class', '["SECOND"]');
    await waitForLitRender(element);

    const el = element.shadowRoot?.querySelector('.sbb-sr-navigation--first-class');
    assert.isNull(el);
  });

  it('should render first-class span element for FIRST', async () => {
    element.setAttribute('travel-class', '["FIRST"]');
    await waitForLitRender(element);

    const el = element.shadowRoot?.querySelector('.sbb-sr-navigation--first-class');
    assert.instanceOf(el, HTMLSpanElement);
  });

  it('should render a coach which is the first one in the navigation', async () => {
    element.first = true;

    await waitForLitRender(element);

    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    await expect(getComputedStyle(btn).borderStartEndRadius).to.be.equal('4px');
    await expect(getComputedStyle(btn).borderEndEndRadius).to.be.equal('4px');
    await expect(getComputedStyle(btn).borderStartStartRadius).to.be.equal('16px');
    await expect(getComputedStyle(btn).borderEndStartRadius).to.be.equal('16px');
  });

  it('should render a coach which is the last one in the navigation', async () => {
    element.last = true;

    await waitForLitRender(element);

    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    await expect(getComputedStyle(btn).borderStartStartRadius).to.be.equal('4px');
    await expect(getComputedStyle(btn).borderEndStartRadius).to.be.equal('4px');
    await expect(getComputedStyle(btn).borderStartEndRadius).to.be.equal('16px');
    await expect(getComputedStyle(btn).borderEndEndRadius).to.be.equal('16px');
  });

  it('should call @selectcoach on interaction', async () => {
    const selectSpy = new EventSpy('selectcoach');
    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    btn.click();
    await selectSpy.calledOnce();
    await expect(selectSpy.count).to.be.equal(1);
  });

  it('should dispatch click event on pressing Enter', async () => {
    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    const changeSpy = new EventSpy('click');
    await waitForLitRender(element);
    btn.focus();
    await sendKeys({ press: 'Enter' });
    expect(changeSpy.count).to.be.greaterThan(0);
  });

  it('should dispatch click event on pressing Space', async () => {
    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    const changeSpy = new EventSpy('click');
    await waitForLitRender(element);
    btn.focus();
    await sendKeys({ press: ' ' });
    expect(changeSpy.count).to.be.greaterThan(0);
  });

  it('should take freePlacesByType settings into account for title-Attribute', async () => {
    element.freePlacesByType = { seats: 20, bicycles: 10 };

    await waitForLitRender(element);

    const btn = element.shadowRoot?.querySelector(
      '.sbb-sr-navigation__ctrl-button',
    ) as HTMLButtonElement;

    await expect(btn.getAttribute('title')).to.be.equal(
      'Navigate to coach coach-id. 20 seats available. 10 available bicycle spaces.',
    );
  });

  it('should render the aria label in the sbb-screen-reader-only element', async () => {
    element.setAttribute('property-ids', '["BISTRO"]');
    await waitForLitRender(element);
    const screenReaderOnlyElement = element.shadowRoot?.querySelector('sbb-screen-reader-only');
    expect(screenReaderOnlyElement?.innerHTML).to.include('Available services: Bistro');
  });
});
