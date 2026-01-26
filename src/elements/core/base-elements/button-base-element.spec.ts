import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';

import { isChromium } from '../dom.ts';
import { SbbDisabledInteractiveMixin, SbbDisabledMixin } from '../mixins.ts';
import { tabKey } from '../testing/private/keys.ts';
import { a11yTreeSnapshot, fixture, typeInElement } from '../testing/private.ts';
import { EventSpy, waitForLitRender } from '../testing.ts';

import { SbbButtonBaseElement } from './button-base-element.ts';

type FormDataEntry = { [p: string]: FormDataEntryValue };

interface ButtonAccessibilitySnapshot {
  role: string;
  disabled: boolean;
}

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

    it('dispatch click if disabledInteractive', async () => {
      const clickSpy = new EventSpy('click');

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
      expect(element).not.to.match(':state(active)');
    });

    it('space keydown and keyup', async () => {
      element.focus();
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');
      expect(element).not.to.match(':state(active)');

      await sendKeys({ down: 'Space' });
      await waitForLitRender(element);
      expect(element).to.match(':state(active)');

      await sendKeys({ up: 'Space' });
      await waitForLitRender(element);
      expect(element).not.to.match(':state(active)');
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
    let input: HTMLInputElement;
    let submitEventSpyPromise: Promise<FormDataEntry>;
    let submittedCount: number = 0;
    let formDataEventSpyPromise: Promise<FormDataEntry>;

    const onInputEnterPressTests = (): void => {
      describe('on enter press in input', () => {
        for (const inputCount of ['one input', 'two inputs']) {
          describe(`with ${inputCount}`, () => {
            if (inputCount === 'two inputs') {
              beforeEach(() => {
                form.appendChild(document.createElement('input'));
              });
            }

            it('should submit form', async () => {
              input.focus();
              await sendKeys({ press: 'Enter' });

              const submitFormData = await submitEventSpyPromise;

              expect(submitFormData).to.be.deep.equal({
                'submit-button': 'submit',
                test: 'test',
              });

              expect(submittedCount).to.be.equal(1);
            });

            it('should not submit when submitButton is disabled', async () => {
              submitButton.disabled = true;
              await waitForLitRender(form);

              input.focus();
              await sendKeys({ press: 'Enter' });

              await aTimeout(10);
              expect(submittedCount).to.be.equal(0);
            });
          });
        }

        it('should not submit when submitButton was removed with two inputs', async () => {
          form.appendChild(document.createElement('input'));

          submitButton.remove();
          await waitForLitRender(form);

          input.focus();
          await sendKeys({ press: 'Enter' });

          await aTimeout(10);
          expect(submittedCount).to.be.equal(0);
        });

        it('should submit when submitButton was removed with one input', async () => {
          submitButton.remove();
          await waitForLitRender(form);

          input.focus();
          await sendKeys({ press: 'Enter' });

          const submitFormData = await submitEventSpyPromise;

          expect(submitFormData).to.be.deep.equal({
            test: 'test',
          });
        });
      });
    };

    for (const entry of [
      {
        selector: 'generic-button',
        button: html`<generic-button name="submit-button" value="submit" type="submit">
          Submit
        </generic-button>`,
        resetButton: html`<generic-button type="reset">Reset</generic-button>`,
      },
      {
        selector: 'button',
        button: html`<button name="submit-button" value="submit" type="submit">Submit</button>`,
        resetButton: html`<button type="reset">Reset</button>`,
      },
    ]) {
      describe(entry.selector, () => {
        beforeEach(() => {
          submittedCount = 0;
        });

        describe('included in form', () => {
          let fieldSet: HTMLFieldSetElement;

          beforeEach(async () => {
            let submitResolve: (value: PromiseLike<FormDataEntry> | FormDataEntry) => void;
            let formDataResolve: (value: PromiseLike<FormDataEntry> | FormDataEntry) => void;

            submitEventSpyPromise = new Promise<FormDataEntry>((r) => (submitResolve = r));
            formDataEventSpyPromise = new Promise<FormDataEntry>((r) => (formDataResolve = r));

            form = await fixture(html`
              <form
                @submit=${(e: SubmitEvent) => {
                  e.preventDefault();
                  submitResolve(Object.fromEntries(new FormData(form, e.submitter)));
                  submittedCount++;
                }}
                @formdata=${(e: FormDataEvent) => formDataResolve(Object.fromEntries(e.formData))}
              >
                <input type="text" name="test" value="test" />
                <fieldset>${entry.button} ${entry.resetButton}</fieldset>
              </form>
            `);
            submitButton = form.querySelector(`[type="submit"]`)!;
            resetButton = form.querySelector(`[type="reset"]`)!;
            fieldSet = form.querySelector('fieldset')!;
            input = form.querySelector('input')!;
          });

          if (isChromium) {
            it('should have role button', async () => {
              await aTimeout(1000);
              const snapshot = await a11yTreeSnapshot({
                selector: `${entry.selector}:first-of-type`,
              });

              expect(snapshot.role).to.be.equal('button');
            });

            it('should be focusable', async () => {
              const snapshot = await a11yTreeSnapshot({ selector: entry.selector });

              expect(snapshot.disabled).to.be.undefined;
              expect(submitButton).not.to.have.attribute('disabled');
              expect(submitButton).not.to.match(':disabled');

              await sendKeys({ press: tabKey });
              await sendKeys({ press: tabKey });
              expect(document.activeElement!).to.be.equal(submitButton);
            });

            it('should not be focusable if disabled', async () => {
              submitButton.disabled = true;
              await waitForLitRender(submitButton);

              const snapshot = await a11yTreeSnapshot({ selector: entry.selector });

              expect(snapshot.disabled).to.be.true;
              expect(submitButton).to.have.attribute('disabled');
              expect(submitButton).to.match(':disabled');

              await sendKeys({ press: tabKey });
              await sendKeys({ press: tabKey });
              expect(document.activeElement!).not.to.be.equal(submitButton);
            });

            it('should not be focusable if inside a disabled fieldset', async () => {
              fieldSet.disabled = true;
              await waitForLitRender(submitButton);

              const snapshot = (await a11yTreeSnapshot({
                selector: entry.selector,
              })) as unknown as ButtonAccessibilitySnapshot;

              expect(snapshot.disabled).to.be.true;
              expect(submitButton).to.match(':disabled');

              await sendKeys({ press: tabKey });
              expect(document.activeElement!).not.to.be.equal(submitButton);
            });
          }

          it('should set default value', () => {
            expect(submitButton.value).to.be.equal('submit');
          });

          it('should not reset on form reset', async () => {
            submitButton.value = 'changed-value';
            typeInElement(input, '123');
            expect(input.value).to.be.equal('test123');
            expect(input).to.have.attribute('value', 'test');

            form.reset();

            await waitForLitRender(form);

            expect(input.value).to.be.equal('test');

            // Submit button is not considered as part of the form and cannot be reset therefore
            expect(submitButton.value).to.be.equal('changed-value');
          });

          it('should reset form but not button on button reset', async () => {
            submitButton.value = 'changed-value';
            typeInElement(input, '123');

            expect(input.value).to.be.equal('test123');
            expect(input).to.have.attribute('value', 'test');

            resetButton.click();

            // Needed to handle button click
            await aTimeout(0);

            expect(input.value).to.be.equal('test');

            // Submit button is not considered as part of the form and cannot be reset therefore
            expect(submitButton.value).to.be.equal('changed-value');
          });

          it('should contain button in formData on submit click', async () => {
            submitButton.click();

            const formData = await formDataEventSpyPromise;
            expect(formData).to.be.deep.equal({
              'submit-button': 'submit',
              test: 'test',
            });

            const submitFormData = await submitEventSpyPromise;
            expect(submitFormData).to.be.deep.equal({
              'submit-button': 'submit',
              test: 'test',
            });
          });

          onInputEnterPressTests();
        });

        describe('outside a form', () => {
          beforeEach(async () => {
            let submitResolve: (value: PromiseLike<FormDataEntry> | FormDataEntry) => void;
            let formDataResolve: (value: PromiseLike<FormDataEntry> | FormDataEntry) => void;

            submitEventSpyPromise = new Promise<FormDataEntry>((r) => (submitResolve = r));
            formDataEventSpyPromise = new Promise<FormDataEntry>((r) => (formDataResolve = r));

            const root = await fixture(html`
              <div>
                <form
                  id="formid"
                  @submit=${(e: SubmitEvent) => {
                    e.preventDefault();
                    submitResolve(Object.fromEntries(new FormData(form, e.submitter)));
                    submittedCount++;
                  }}
                  @formdata=${(e: FormDataEvent) => formDataResolve(Object.fromEntries(e.formData))}
                >
                  <input type="text" name="test" value="test" />
                </form>
                ${entry.button} ${entry.resetButton}
              </div>
            `);
            form = root.querySelector('form')!;
            input = root.querySelector('input')!;
            submitButton = root.querySelector(`[type="submit"]`)!;
            submitButton.setAttribute('form', 'formid');
            resetButton = root.querySelector(`[type="reset"]`)!;
            resetButton.setAttribute('form', 'formid');
          });

          it('should submit form linked by id', async () => {
            expect(submitButton.form).to.be.equal(form);

            submitButton.click();

            const formData = await formDataEventSpyPromise;
            expect(formData).to.be.deep.equal({
              'submit-button': 'submit',
              test: 'test',
            });

            const submitFormData = await submitEventSpyPromise;

            expect(submitFormData).to.be.deep.equal({
              'submit-button': 'submit',
              test: 'test',
            });
          });

          it('should reset form linked by id but not button on button reset', async () => {
            submitButton.value = 'changed-value';
            typeInElement(input, '123');

            expect(input.value).to.be.equal('test123');
            expect(input).to.have.attribute('value', 'test');

            resetButton.click();
            // Needed to handle button click
            await aTimeout(0);

            expect(input.value).to.be.equal('test');

            // Submit button is not considered as part of the form and cannot be reset therefore
            expect(submitButton.value).to.be.equal('changed-value');
          });

          onInputEnterPressTests();
        });
      });
    }
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'generic-button': GenericButton;
  }
}
