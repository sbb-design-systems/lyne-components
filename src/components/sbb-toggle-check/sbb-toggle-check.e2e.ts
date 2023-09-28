import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { waitForCondition } from '../../global/testing';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbToggleCheck } from './sbb-toggle-check';

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
      await element.updateComplete;

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should emit click on Space', async () => {
      const changeSpy = new EventSpy('click');

      element.focus();
      await sendKeys({ press: ' ' });
      await element.updateComplete;

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
    expect(element).not.to.have.attribute('checked');
    expect(document.querySelector('#scroll-context').scrollTop).to.be.equal(0);

    element.focus();
    await sendKeys({ press: ' ' });
    await element.updateComplete;

    expect(element).to.have.attribute('checked');
    expect(document.querySelector('#scroll-context').scrollTop).to.be.equal(0);
  });
});
