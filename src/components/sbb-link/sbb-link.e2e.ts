import { waitForCondition } from '../../global/testing';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { SbbLink } from './sbb-link';
import './sbb-link';
import { EventSpy, waitForLitRender } from '../../global/testing';

describe('sbb-link', () => {
  let element: SbbLink;

  beforeEach(async () => {
    element = await fixture(html`<sbb-link id="focus-id">Link as Button</sbb-link>`);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      const changeSpy = new EventSpy('click');

      await element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should not dispatch event on click if disabled', async () => {
      element.setAttribute('disabled', 'true');

      await waitForLitRender(element);

      const changeSpy = new EventSpy('click');

      await element.click();
      expect(changeSpy.count).not.to.be.greaterThan(0);
    });

    it('should dispatch event on click if static', async () => {
      element.setAttribute('is-static', 'true');

      await waitForLitRender(element);

      const changeSpy = new EventSpy('click');

      await element.click();
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should stop propagating host click if disabled', async () => {
      element.disabled = true;

      const clickSpy = new EventSpy('click');

      element.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);

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
      await waitForLitRender(element);

      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(changeSpy.count).to.be.greaterThan(0);
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', '#');
      await waitForLitRender(element);

      const changeSpy = new EventSpy('click');
      element.focus();
      await sendKeys({ press: ' ' });
      expect(changeSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      await element.focus();
      await waitForLitRender(element);

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });
});
