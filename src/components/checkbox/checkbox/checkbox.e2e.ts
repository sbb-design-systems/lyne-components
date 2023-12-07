import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';

import { SbbCheckboxElement } from './checkbox';

describe('sbb-checkbox', () => {
  let element: SbbCheckboxElement;

  beforeEach(async () => {
    await fixture(html`<sbb-checkbox></sbb-checkbox>`);
    element = document.querySelector('sbb-checkbox');
  });

  it('should render', async () => {
    assert.instanceOf(element, SbbCheckboxElement);
  });

  it('should not render accessibility label containing expanded state', async () => {
    expect(element.shadowRoot.querySelector('.sbb-checkbox__expanded-label')).to.be.null;
  });

  describe('events', () => {
    it('emit event on click', async () => {
      expect(element).not.to.have.attribute('checked');
      const changeSpy = new EventSpy('change');
      element.click();
      await waitForLitRender(element);
      expect(changeSpy.count).to.be.greaterThan(0);
      expect(element).to.have.attribute('checked');
    });

    it('emit event on keypress', async () => {
      const changeSpy = new EventSpy('change');
      element.focus();
      await sendKeys({ press: 'Space' });
      await waitForCondition(() => changeSpy.count === 1);
      expect(changeSpy.count).to.be.greaterThan(0);
    });
  });

  describe('indeterminate', () => {
    it('should set indeterminate to false after checked', async () => {
      element.setAttribute('indeterminate', 'true');
      await waitForLitRender(element);
      expect(element.checked).to.be.false;
      expect(element.indeterminate).to.be.true;

      element.click();
      await waitForLitRender(element);
      expect(element.checked).to.be.true;
      expect(element.indeterminate).to.be.false;
    });

    it('should update indeterminate state of input', async () => {
      expect(element.indeterminate).to.be.false;

      element.indeterminate = true;
      await waitForLitRender(element);

      expect(element.shadowRoot.querySelector('input').indeterminate).to.be.true;
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
    await waitForCondition(() => element.hasAttribute('checked'));
    expect(root.scrollTop).to.be.equal(0);
  });
});
