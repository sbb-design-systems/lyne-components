import { assert, expect, fixture } from '@open-wc/testing';
import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach.component.js';

describe('sbb-seat-reservation-navigation-coach', () => {
  let element: SbbSeatReservationNavigationCoachElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-seat-reservation-navigation-coach
        coach-id="coach-id"
      ></sbb-seat-reservation-navigation-coach>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationNavigationCoachElement);
  });

  it('should have a button', () => {
    const el = element.shadowRoot?.querySelector(
      '.sbb-seat-reservation-navigation__control-button',
    );

    assert.instanceOf(el, HTMLButtonElement);
  });

  it('should click the coach button once', async () => {
    const clickSpy = new EventSpy('click');

    const btn = element.shadowRoot?.querySelector(
      '.sbb-seat-reservation-navigation__control-button',
    ) as HTMLButtonElement;
    btn.click();
    await clickSpy.calledOnce();
    expect(clickSpy.count).to.be.equal(1);
  });

  it('should have element coach-id', async () => {
    await expect(element.coachId).to.be.equal('coach-id');
  });

  it('check host attributes and content', () => {
    expect(
      element.shadowRoot!.firstElementChild!.classList.contains(
        'sbb-seat-reservation-navigation__item-coach',
      ),
    ).to.be.true;
  });

  it('should not have a clickable button', async () => {
    element.disable = true;
    await waitForLitRender(element);

    const btn = element.shadowRoot?.querySelector(
      '.sbb-seat-reservation-navigation__control-button',
    ) as HTMLButtonElement;

    expect(btn.hasAttribute('disabled')).to.be.true;
  });

  it('should have a driver area', async () => {
    element.driverArea = true;
    await waitForLitRender(element);

    const el = element.shadowRoot?.querySelector('.sbb-seat-reservation-navigation-driver-area');

    assert.instanceOf(el, HTMLDivElement);
  });
});
