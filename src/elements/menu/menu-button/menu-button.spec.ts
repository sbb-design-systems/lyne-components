import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';

import { SbbMenuButtonElement } from './menu-button.component.ts';

describe(`sbb-menu-button`, () => {
  let element: SbbMenuButtonElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-menu-button id="focus-id">Menu Action</sbb-menu-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbMenuButtonElement);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      const changeSpy = new EventSpy('click');

      element.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', 'true');

      await waitForLitRender(element);

      const clickSpy = new EventSpy('click');

      element.dispatchEvent(
        new PointerEvent('click', { bubbles: true, cancelable: true, composed: true }),
      );
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement!.id).to.be.equal('focus-id');
    });
  });
});
