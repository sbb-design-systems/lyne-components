import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition, waitForLitRender, EventSpy } from '../../../core/testing';

import { SbbNavigationButtonElement } from './navigation-button';

describe('sbb-navigation-button', () => {
  let element: SbbNavigationButtonElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-navigation-button id="focus-id">Navigation Action</sbb-navigation-button>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNavigationButtonElement);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      const navigationButton = document.querySelector('sbb-navigation-button');
      const changeSpy = new EventSpy('click');
      navigationButton.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
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
      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });
});
