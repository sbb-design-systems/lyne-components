import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
//import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import { SbbSeatReservationElement } from './seat-reservation.js';

describe('sbb-seat-reservation', () => {
  let element: SbbSeatReservationElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-seat-reservation></sbb-seat-reservation>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSeatReservationElement);
  });

  // it('emits on click', async () => {
  //   const myEventNameSpy = new EventSpy(SbbSeatReservationElement.events.myEventName);
  //   element.click();
  //   await waitForLitRender(element);
  //   expect(myEventNameSpy.count).to.be.equal(1);
  // });
});
