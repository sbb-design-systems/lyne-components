import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import {
  buttonIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.private.ts';

import { SbbButtonStaticElement } from './button-static.component.ts';

describe(`sbb-button-static`, () => {
  let element: SbbButtonStaticElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-button-static>I am a static button</sbb-button-static>`);
    assert.instanceOf(element, SbbButtonStaticElement);
  });

  describe('events', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-button-static id="focus-id">I am a static button</sbb-button-static>`,
      );
    });

    it('dispatches event on click', async () => {
      const clickSpy = new EventSpy('click');

      element.click();
      await clickSpy.calledOnce();
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', 'true');

      await waitForLitRender(element);

      const clickSpy = new EventSpy('click');

      element.click();
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should stop propagating host click if disabled', async () => {
      element.disabled = true;

      const clickSpy = new EventSpy('click');

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);

      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should not dispatch click event on pressing Enter', async () => {
      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(changeSpy.count).not.to.be.greaterThan(0);
    });

    it('should not dispatch click event on pressing Space', async () => {
      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(changeSpy.count).not.to.be.greaterThan(0);
    });
  });

  it('should detect icon in sbb-button-static', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-button-static'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });

  it('should detect icon in sbb-button-static when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-button-static'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });
});
