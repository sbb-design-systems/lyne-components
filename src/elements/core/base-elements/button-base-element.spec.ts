import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';
import { spy } from 'sinon';

import { SbbDisabledInteractiveMixin, SbbDisabledMixin } from '../mixins.js';
import { fixture } from '../testing/private.js';
import { EventSpy, waitForLitRender } from '../testing.js';

import { SbbButtonBaseElement } from './button-base-element.js';

class GenericButton extends SbbDisabledInteractiveMixin(SbbDisabledMixin(SbbButtonBaseElement)) {
  protected override renderTemplate(): TemplateResult {
    return html`Button`;
  }
}
customElements.define('generic-button', GenericButton);

describe(`SbbButtonBaseElement`, () => {
  describe('template', () => {
    let element: GenericButton;

    beforeEach(async () => {
      element = await fixture(html`<generic-button></generic-button>`);
    });

    it('renders', async () => {
      assert.instanceOf(element, GenericButton);
    });

    it('check host attributes and content', () => {
      expect(element.getAttribute('role')).to.be.equal('button');
      expect(element.getAttribute('tabindex')).to.be.equal('0');
      expect(element.shadowRoot!.firstElementChild!.classList.contains('generic-button')).to.be
        .true;
      expect(element.shadowRoot!.textContent!.trim()).to.be.equal('Button');
    });
  });

  describe('events', () => {
    let element: GenericButton;

    beforeEach(async () => {
      element = await fixture(html` <generic-button></generic-button> `);
    });

    it('no click dispatch if disabled', async () => {
      element.disabled = true;
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');
      element.click();
      await waitForLitRender(element);
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('dispatch click if disabled and disabledInteractive', async () => {
      const clickSpy = new EventSpy('click');

      element.disabled = true;
      element.disabledInteractive = true;
      await waitForLitRender(element);

      element.click();
      await waitForLitRender(element);

      expect(clickSpy.count).to.be.equal(1);
    });

    it('dispatch click if type button', async () => {
      element.type = 'button';
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');
      element.click();
      await waitForLitRender(element);
      expect(clickSpy.count).to.be.equal(1);
      expect(await element.getAttribute('data-active')).to.be.equal(null);
    });

    it('space keydown and keyup', async () => {
      element.focus();
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');
      expect(await element.getAttribute('data-active')).to.be.equal(null);

      await sendKeys({ down: 'Space' });
      await waitForLitRender(element);
      expect(await element.getAttribute('data-active')).to.be.equal('');

      await sendKeys({ up: 'Space' });
      await waitForLitRender(element);
      expect(await element.getAttribute('data-active')).to.be.equal(null);
      await waitForLitRender(element);
      expect(clickSpy.count).to.be.equal(1);
    });

    it('enter keydown', async () => {
      element.focus();
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');

      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);
      expect(clickSpy.count).to.be.equal(1);
    });
  });

  describe('form association', () => {
    let form: HTMLFormElement;

    let submitButton: GenericButton | HTMLButtonElement;
    let resetButton: GenericButton | HTMLButtonElement;
    let fieldSet: HTMLFieldSetElement;
    const submitEventSpy = spy();
    const resetEventSpy = spy();

    for (const entry of [
      {
        selector: 'generic-button',
        resetButton: html`<generic-button name="reset-button" value="reset" type="reset">
          Reset
        </generic-button>`,
        button: html`<generic-button name="submit-button" value="submit" type="submit">
          Submit
        </generic-button>`,
      },
      {
        selector: 'button',
        resetButton: html`<button name="reset-button" value="reset" type="reset">Reset</button>`,
        button: html`<button name="submit-button" value="submit" type="submit">Submit</button>`,
      },
    ]) {
      describe(entry.selector, () => {
        beforeEach(async () => {
          form = await fixture(html`
            <form
              @submit=${(e: SubmitEvent) => submitEventSpy(e)}
              @reset=${(e: Event) => resetEventSpy(e)}
            >
              <fieldset>
                <input type="hidden" name="hidden" value="input" />

                ${entry.resetButton} ${entry.button}
              </fieldset>
            </form>
          `);
          submitButton = form.querySelector(`[type="submit"]`)!;
          resetButton = form.querySelector(`[type="reset"]`)!;
          fieldSet = form.querySelector('fieldset')!;
        });

        it('should set default value', async () => {
          expect(submitButton.value).to.be.equal('submit');
        });

        it('should result :disabled', async () => {
          submitButton.disabled = true;
          await waitForLitRender(form);
          expect(submitButton).to.match(':disabled');

          submitButton.disabled = false;
          await waitForLitRender(form);
          expect(submitButton).not.to.match(':disabled');
        });

        it('should result :disabled if a fieldSet is', async () => {
          fieldSet.disabled = true;

          await waitForLitRender(form);

          expect(submitButton).to.match(':disabled');

          fieldSet.disabled = false;
          await waitForLitRender(form);

          expect(submitButton).not.to.match(':disabled');
        });

        it('should reset on form reset', async () => {
          submitButton.value = 'changed-value';

          form.reset();

          await waitForLitRender(form);

          expect(submitButton.value).to.be.equal('changed-value');
        });

        it('should reset on button reset', async () => {
          submitButton.value = 'changed-value';

          resetButton.click();
          await waitForLitRender(form);

          expect(submitButton.value).to.be.equal('changed-value');
        });
      });
    }
  });

  /*
  // TODO: implement
   it('should restore form state on formStateRestoreCallback()', async () => {
          // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
          submitButton.formStateRestoreCallback('3', 'restore');
          await waitForLitRender(element);

          expect(element.value).to.be.equal('3');

          element.multiple = true;
          await waitForLitRender(element);

          const formData = new FormData();
          formData.append(element.name, '1');
          formData.append(element.name, '2');

          element.formStateRestoreCallback(Array.from(formData.entries()), 'restore');
          await waitForLitRender(element);

          expect(element.value).to.be.eql(['1', '2']);
        });

   */
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'generic-button': GenericButton;
  }
}
