import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbCheckbox } from './sbb-checkbox';

describe('sbb-checkbox', () => {
  /** NOTE: These are too hard to migrate and are prone to errors :/
   * consider that the E2EPage is now the 'document' (you should just delete it)
   * and that the E2EElement equivalent is directly the SbbComponent (e.g. SbbTimeInput) */
  let element: SbbCheckbox;

  beforeEach(async () => {
    await fixture(html`<sbb-checkbox></sbb-checkbox>`);
    element = document.querySelector('sbb-checkbox');
  });

  it('should render', async () => {
    element = document.querySelector('sbb-checkbox');
    assert.instanceOf(element, SbbCheckbox);
  });

  it('should not render accessibility label containing expanded state', async () => {
    element = await page.find('sbb-checkbox >>> .sbb-checkbox__expanded-label');
    expect(element).toBeFalsy();
  });

  describe('events', () => {
    it.only('emit event on click', async () => {
      expect(element.getAttribute('checked')).to.be.null;
      await element.updateComplete;
      const changeSpy = new EventSpy('change');
      await element.click();
      expect(changeSpy.count).to.be.greaterThan(0);
      expect(element.getAttribute('checked')).not.to.be.null;
    });

    it('emit event on keypress', async () => {
      await element.updateComplete;
      const changeSpy = new EventSpy('change');
      element.focus();
      await sendKeys({ press: 'Tab' });
      element.focus();
      await sendKeys({ press: 'Space' });
      await element.updateComplete;
      expect(changeSpy.count).to.be.greaterThan(0);
    });
  });

  describe('indeterminate', () => {
    it('should set indeterminate to false after checked', async () => {
      element.setAttribute('indeterminate', 'true');
      await element.updateComplete;

      expect(element.checked).to.be.equal(false);
      expect(element.indeterminate).to.be.equal(true);

      await element.click();
      await element.updateComplete;

      expect(element.checked).to.be.equal(true);
      expect(element.indeterminate).to.be.equal(false);
    });

    it('should update indeterminate state of input', async () => {
      await element.updateComplete;

      expect(element.indeterminate).to.be.equal(false);

      element.indeterminate = true;
      await element.updateComplete;

      expect(element.indeterminate).to.be.equal(true);
    });
  });

  it('should prevent scrolling on space bar press', async () => {
    await fixture(
      html`<div style="height: 100px; overflow: scroll" id="scroll-context">
        <div style="height: 500px">
          <sbb-checkbox></sbb-checkbox>
        </div>
      </div>`,
    );
    element = document.querySelector('sbb-checkbox');
    expect(element).not.to.have.attribute('checked');
    expect(document.querySelector('#scroll-context').scrollTop).to.be.equal(0);

    element.focus();
    await sendKeys({ press: ' ' });
    await element.updateComplete;

    expect(element).to.have.attribute('checked');
    expect(document.querySelector('#scroll-context').scrollTop).to.be.equal(0);
  });
});
