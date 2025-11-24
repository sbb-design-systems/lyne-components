import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import {
  buttonIconTestTemplate,
  buttonLoading,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.private.ts';

import { SbbButtonElement } from './button.component.ts';

describe(`sbb-button`, () => {
  const elementInternals = elementInternalsSpy();

  let element: SbbButtonElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-button id="focus-id">I am a button</sbb-button>`);

    assert.instanceOf(element, SbbButtonElement);
  });

  describe('events', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-button id="focus-id">I am a button</sbb-button>`);
    });

    it('dispatches event on click', async () => {
      const clickSpy = new EventSpy('click');

      element.click();
      await clickSpy.calledOnce();
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', 'true');

      await waitForLitRender(element);

      const clickSpy = new EventSpy('click');

      element.click();
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const clickSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const clickSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should stop propagating host click if disabled', async () => {
      element.disabled = true;

      const clickSpy = new EventSpy('click');

      element.dispatchEvent(new PointerEvent('click'));
      await waitForLitRender(element);

      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      element.focus();
      await waitForLitRender(element);

      expect(document.activeElement!.id).to.be.equal('focus-id');
    });
  });

  it('should detect icon in sbb-button', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-button'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });

  it('should detect icon in sbb-button when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-button'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });

  it('should set loading state correctly', async () => {
    const root: SbbButtonElement = await fixture(buttonLoading('sbb-button'));
    expect(root).to.have.attribute('loading');
    expect(elementInternals.get(root)?.ariaBusy).to.be.equal('true');
    expect(elementInternals.get(root)?.ariaDisabled).to.be.equal('true');
  });

  it('should reset loading state correctly', async () => {
    const root: SbbButtonElement = await fixture(buttonLoading('sbb-button'));

    root.loading = false;
    await waitForLitRender(root);

    expect(root).not.to.have.attribute('loading');
    expect(elementInternals.get(root)?.ariaBusy).to.be.null;
    expect(elementInternals.get(root)?.ariaDisabled).to.be.null;
  });

  it('should reset loading state correctly if it was in disabledInteractive state', async () => {
    const root: SbbButtonElement = await fixture(buttonLoading('sbb-button'));

    root.disabledInteractive = true;
    await waitForLitRender(root);

    root.loading = false;
    await waitForLitRender(root);

    expect(root).not.to.have.attribute('loading');
    expect(elementInternals.get(root)!.ariaBusy).to.be.null;
    expect(elementInternals.get(root)!.ariaDisabled).to.be.equal('true');

    root.disabledInteractive = false;
    await waitForLitRender(root);

    expect(elementInternals.get(root)!.ariaDisabled).to.be.null;
  });
});
