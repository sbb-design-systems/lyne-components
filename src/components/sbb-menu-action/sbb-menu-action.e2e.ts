import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbMenuAction } from './sbb-menu-action';

describe('sbb-menu-action', () => {
  let element: SbbMenuAction;

  beforeEach(async () => {
    element = await fixture(html`<sbb-menu-action id="focus-id">Menu Action</sbb-menu-action>`);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      const changeSpy = new EventSpy('click');

      element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', 'true');

      await element.updateComplete;

      const clickSpy = new EventSpy('click');

      element.dispatchEvent(
        new CustomEvent('click', { bubbles: true, cancelable: true, composed: true }),
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

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', '#');
      await element.updateComplete;

      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', '#');
      await element.updateComplete;

      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(changeSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      element.focus();
      await element.updateComplete;

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });

  it('renders as a button and triggers click event', async () => {
    element = await fixture(html`<sbb-menu-action></sbb-menu-action>`);

    assert.instanceOf(element, SbbMenuAction);

    const clickedSpy = new EventSpy('click');
    element.click();
    await waitForCondition(() => clickedSpy.events.length === 1);
    expect(clickedSpy.count).to.be.equal(1);
  });
});
