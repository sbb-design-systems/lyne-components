import { waitForCondition } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbButton } from './sbb-button';

describe('sbb-button', () => {
  let element: SbbButton;

  beforeEach(async () => {
    element = await fixture(html`<sbb-button id="focus-id">I am a button</sbb-button>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbButton);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      await element.updateComplete;
      const clickSpy = new EventSpy('click');

      await element.click();
      await waitForCondition(() => clickSpy.events.length === 1);
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', 'true');

      await element.updateComplete;

      const clickSpy = new EventSpy('click');

      element.click();
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should dispatch event on click if is-static', async () => {
      element.setAttribute('is-static', 'true');

      await element.updateComplete;

      const clickSpy = new EventSpy('click');

      await element.click();
      expect(clickSpy.count).to.be.greaterThan(0);
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

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', '#');
      await element.updateComplete;

      const clickSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', '#');
      await element.updateComplete;

      const clickSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should stop propagating host click if disabled', async () => {
      element.disabled = true;

      const clickSpy = new EventSpy('click');

      element.dispatchEvent(new CustomEvent('click'));
      await element.updateComplete;

      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      element.focus();
      await element.updateComplete;

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });
});
