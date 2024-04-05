import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing/index.js';
import { fixture } from '../../core/testing/private/index.js';

import { SbbButtonStaticElement } from './button-static.js';

describe(`sbb-button-static with ${fixture.name}`, () => {
  let element: SbbButtonStaticElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-button-static id="focus-id">I am a static button</sbb-button-static>`,
      { modules: ['./button-static.ts'] },
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbButtonStaticElement);
  });

  describe('events', () => {
    it('dispatches event on click', async () => {
      const clickSpy = new EventSpy('click');

      element.click();
      await waitForCondition(() => clickSpy.events.length === 1);
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

      element.dispatchEvent(new CustomEvent('click'));
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
});
