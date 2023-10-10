import { assert, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { waitForCondition } from '../../global/testing';
import { SbbToggleCheck } from './sbb-toggle-check';
import { EventSpy, waitForLitRender } from '../../global/testing';

describe('sbb-toggle-check', () => {
  let element: SbbToggleCheck;

  beforeEach(async () => {
    element = await fixture(html`<sbb-toggle-check id="focus-id"></sbb-toggle-check>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbToggleCheck);
  });

  describe('events', () => {
    it('emit event on click', async () => {
      const changeSpy = new EventSpy('change');

      element.click();
      await waitForLitRender(element);

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should emit click on Space', async () => {
      const changeSpy = new EventSpy('click');

      element.focus();
      await sendKeys({ press: ' ' });
      await waitForLitRender(element);

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should receive focus', async () => {
      const focusSpy = new EventSpy('focus', element);

      element.focus();

      await waitForCondition(() => focusSpy.events.length === 1);
      expect(focusSpy.count).to.be.equal(1);

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });

  it('should prevent scrolling on space bar press', async () => {
    element = await fixture(
      html`<div style="height: 100px; overflow: scroll" id="scroll-context">
        <div style="height: 500px">
          <sbb-toggle-check></sbb-toggle-check>
        </div>
      </div>`,
    );
    const toggle = element.querySelector('sbb-toggle-check');

    expect(toggle).not.to.have.attribute('checked');
    expect(document.querySelector('#scroll-context').scrollTop).to.be.equal(0);

    toggle.focus();
    await sendKeys({ press: ' ' });
    await waitForLitRender(toggle);
    await nextFrame();

    expect(toggle).to.have.attribute('checked');
    expect(document.querySelector('#scroll-context').scrollTop).to.be.equal(0);
  });
});
