import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbNavigationAction } from './sbb-navigation-action';
import '../sbb-navigation-action';

describe('sbb-navigation-action', () => {
  let element: SbbNavigationAction;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-navigation-action id="focus-id">Navigation Action</sbb-navigation-action>`,
    );
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await element.updateComplete;
      const navigationAction = document.querySelector('sbb-navigation-action');
      const changeSpy = new EventSpy('click', document);
      navigationAction.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const changeSpy = new EventSpy('click', document);
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const changeSpy = new EventSpy('click', document);
      element.focus();
      await sendKeys({ press: ' ' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', '#');
      await element.updateComplete;
      const changeSpy = new EventSpy('click', document);
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', '#');
      await element.updateComplete;

      const changeSpy = new EventSpy('click', document);
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
    element = await fixture(html`<sbb-navigation-action>Label</sbb-navigation-action>`);
    assert.instanceOf(element, SbbNavigationAction);

    const clickedSpy = new EventSpy('click', document);
    element.click();
    await waitForCondition(() => clickedSpy.events.length === 1);
    expect(clickedSpy.count).to.be.equal(1);
  });
});
