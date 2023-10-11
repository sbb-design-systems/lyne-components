import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy, waitForCondition, waitForLitRender } from '../../global/testing';
import { SbbCheckbox } from './sbb-checkbox';

describe('sbb-checkbox', () => {
  let element: SbbCheckbox;

  beforeEach(async () => {
    await fixture(html`<sbb-checkbox></sbb-checkbox>`);
    element = document.querySelector('sbb-checkbox');
  });

  it('should render', async () => {
    assert.instanceOf(element, SbbCheckbox);
  });

  it('should not render accessibility label containing expanded state', async () => {
    expect(element.shadowRoot.querySelector('.sbb-checkbox__expanded-label')).to.be.null;
  });

  describe('events', () => {
    it('emit event on click', async () => {
      expect(element.getAttribute('checked')).to.be.null;
      await waitForLitRender(element);
      const changeSpy = new EventSpy('change');
      await element.click();
      expect(changeSpy.count).to.be.greaterThan(0);
      expect(element.getAttribute('checked')).not.to.be.null;
    });

    it('emit event on keypress', async () => {
      await waitForLitRender(element);
      const changeSpy = new EventSpy('change');
      element.focus();
      await sendKeys({ press: 'Space' });
      await waitForLitRender(element);
      expect(changeSpy.count).to.be.greaterThan(0);
    });
  });

  describe('indeterminate', () => {
    it('should set indeterminate to false after checked', async () => {
      element.setAttribute('indeterminate', 'true');
      await waitForLitRender(element);

      expect(element.checked).to.be.equal(false);
      expect(element.indeterminate).to.be.equal(true);

      await element.click();
      await waitForLitRender(element);

      expect(element.checked).to.be.equal(true);
      expect(element.indeterminate).to.be.equal(false);
    });

    it('should update indeterminate state of input', async () => {
      await waitForLitRender(element);

      expect(element.indeterminate).to.be.equal(false);

      element.indeterminate = true;
      await waitForLitRender(element);

      expect(element.indeterminate).to.be.equal(true);
    });
  });

  it('should prevent scrolling on space bar press', async () => {
    const root = await fixture(
      html`<div style="height: 100px; overflow: scroll" id="scroll-context">
        <div style="height: 500px">
          <sbb-checkbox></sbb-checkbox>
        </div>
      </div>`,
    );
    element = root.querySelector('sbb-checkbox');
    expect(element).not.to.have.attribute('checked');
    expect(root.scrollTop).to.be.equal(0);

    element.focus();
    await sendKeys({ press: ' ' });
    await waitForLitRender(element);
    await waitForCondition(() => element.getAttribute('checked') !== null);
    expect(root.scrollTop).to.be.equal(0);
  });
});
