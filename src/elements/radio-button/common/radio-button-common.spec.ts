import { aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, unsafeStatic } from 'lit/static-html.js';

import { isChromium, isWebkit } from '../../core/dom.ts';
import { radioButtonRegistry } from '../../core/mixins.ts';
import { a11yTreeSnapshot, fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.ts';
import type { SbbRadioButtonPanelElement } from '../radio-button-panel.ts';
import type { SbbRadioButtonElement } from '../radio-button.ts';

import '../radio-button.ts';
import '../radio-button-panel.ts';

describe(`sbb-radio-button-common`, () => {
  ['sbb-radio-button', 'sbb-radio-button-panel'].forEach((selector) => {
    const tagSingle = unsafeStatic(selector);

    describe(`${selector} general`, () => {
      let element: SbbRadioButtonElement | SbbRadioButtonPanelElement;

      beforeEach(async () => {
        document.documentElement.removeAttribute('lang');
        /* eslint-disable lit/binding-positions */
        element = await fixture(html`<${tagSingle} name="name" value="value">Label</${tagSingle}>`);
        await waitForLitRender(element);
      });

      describe('events', () => {
        it('emit event on click', async () => {
          expect(element).not.to.have.attribute('checked');
          const changeSpy = new EventSpy('change');

          element.click();
          await waitForLitRender(element);

          expect(changeSpy.count).to.be.greaterThan(0);
          expect(element).not.to.have.attribute('checked');
          expect(element.checked).to.equal(true);
        });

        it('emit event on keypress', async () => {
          const changeSpy = new EventSpy('change');

          element.focus();
          await sendKeys({ press: 'Space' });

          await waitForCondition(() => changeSpy.count === 1);
          expect(changeSpy.count).to.be.greaterThan(0);
        });
      });

      it('should prevent scrolling on space bar press', async () => {
        const root = await fixture(
          html`<div style="height: 100px; overflow: scroll" id="scroll-context">
            <div style="height: 500px">
              <${tagSingle} name="name2"></${tagSingle}>
            </div>
          </div>`,
        );
        element = root.querySelector(selector)!;

        expect(element.checked).to.be.false;
        expect(root.scrollTop).to.be.equal(0);

        element.focus();
        await sendKeys({ press: ' ' });
        await waitForLitRender(element);

        await waitForCondition(() => element.checked);
        expect(root.scrollTop).to.be.equal(0);
      });

      it('should update validity with required true', async () => {
        expect(element.validationMessage).to.equal('');
        expect(element.validity.valueMissing).to.be.false;

        element.toggleAttribute('required', true);
        await waitForLitRender(element);

        expect(element.validationMessage.length).to.be.greaterThan(0);
        expect(element.validity.valueMissing).to.be.true;
      });

      it('should update validity with required true and checked', async () => {
        element.toggleAttribute('required', true);
        element.checked = true;
        await waitForLitRender(element);

        expect(element.validationMessage).to.equal('');
        expect(element.validity.valueMissing).to.be.false;
      });

      it('should update validity message language', async () => {
        element.toggleAttribute('required', true);
        await waitForLitRender(element);

        const original = element.validationMessage;
        expect(element.validationMessage.length).to.be.greaterThan(0);
        expect(element.validity.valueMissing).to.be.true;

        document.documentElement.setAttribute('lang', 'de');
        await waitForLitRender(element);

        expect(element.validationMessage.length).to.be.greaterThan(0);
        expect(element.validationMessage).not.to.equal(original);
      });

      it('should keep custom validity', async () => {
        element.setCustomValidity('my error');
        expect(element.validationMessage).to.equal('my error');
        expect(element.validity.customError).to.be.true;

        element.toggleAttribute('required', true);
        await waitForLitRender(element);

        expect(element.validationMessage).to.equal('my error');
        expect(element.validity.customError, 'customError').to.be.true;
        expect(element.validity.valueMissing, 'valueMissing').to.be.true;
      });

      it('should not unset required validity', async () => {
        element.toggleAttribute('required', true);
        await waitForLitRender(element);

        const checkedMessage = element.validationMessage;
        expect(checkedMessage.length).to.be.greaterThan(
          0,
          'required validation message must not be empty',
        );

        element.setCustomValidity('my error');
        expect(element.validationMessage).to.equal('my error', 'With custom error');
        expect(element.validity.customError, 'customError').to.be.true;
        expect(element.validity.valueMissing, 'valueMissing').to.be.true;

        element.setCustomValidity('');

        expect(element.validationMessage).to.equal(checkedMessage, 'Without custom error');
        expect(element.validity.customError, 'customError').to.be.false;
        expect(element.validity.valueMissing, 'valueMissing').to.be.true;
      });

      it('should set validity correctly on initialization', async () => {
        element = await fixture(html`<${tagSingle} name="testvalidation" required></${tagSingle}>`);
        await waitForLitRender(element);

        expect(element.validationMessage.length).to.be.greaterThan(0);
        expect(element.validity.valueMissing).to.be.true;
      });

      it('should match :invalid with required true', async () => {
        expect(element).to.match(':valid');
        expect(element).not.to.match(':invalid');

        element.toggleAttribute('required', true);
        await waitForLitRender(element);

        expect(element).not.to.match(':valid');
        expect(element).to.match(':invalid');
      });

      if (isChromium) {
        it('should reflect aria-required false', async () => {
          const snapshot = await a11yTreeSnapshot({ selector });

          expect(snapshot.required).to.be.undefined;
        });

        // required is currently not supported by CDPSession a11y info
        it.skip('should reflect accessibility tree setting required attribute to true', async () => {
          element.toggleAttribute('required', true);
          await waitForLitRender(element);

          const snapshot = await a11yTreeSnapshot({ selector });

          expect(snapshot.required).to.be.true;
        });

        it('should reflect accessibility tree setting required attribute to false', async () => {
          element.toggleAttribute('required', true);
          await waitForLitRender(element);

          element.removeAttribute('required');
          await waitForLitRender(element);

          const snapshot = await a11yTreeSnapshot({
            selector,
          });

          expect(snapshot.required).not.to.be.ok;
        });

        // required is currently not supported by CDPSession a11y info
        it.skip('should reflect accessibility tree setting required property to true', async () => {
          element.required = true;
          await waitForLitRender(element);

          const snapshot = await a11yTreeSnapshot({
            selector,
          });

          expect(snapshot.required).to.be.true;
        });

        it('should reflect accessibility tree setting required property to false', async () => {
          element.required = true;
          await waitForLitRender(element);

          element.required = false;
          await waitForLitRender(element);

          const snapshot = await a11yTreeSnapshot({
            selector,
          });

          expect(snapshot.required).not.to.be.ok;
        });
      }

      it('should restore form state on formStateRestoreCallback()', async () => {
        // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
        element.formStateRestoreCallback('value', 'restore');
        await waitForLitRender(element);

        expect(element.checked).to.be.true;

        element.formStateRestoreCallback('anotherValue', 'restore');
        await waitForLitRender(element);

        expect(element.checked).to.be.false;
      });

      it('should ignore interaction when disabled', async () => {
        const inputSpy = new EventSpy('input', element);
        const changeSpy = new EventSpy('change', element);
        element.disabled = true;
        await waitForLitRender(element);

        element.focus();
        element.click();
        await sendKeys({ press: ' ' });

        expect(inputSpy.count).to.be.equal(0);
        expect(changeSpy.count).to.be.equal(0);
        expect(element.checked).to.be.false;
      });
    });
  });

  describe('compare to native', () => {
    let elements: (SbbRadioButtonElement | SbbRadioButtonPanelElement)[],
      nativeElements: HTMLInputElement[],
      form: HTMLFormElement,
      fieldset: HTMLFieldSetElement,
      nativeFieldset: HTMLFieldSetElement,
      inputSpy: EventSpy<any>,
      changeSpy: EventSpy<any>,
      nativeInputSpy: EventSpy<any>,
      nativeChangeSpy: EventSpy<any>;

    const compareToNative = async (): Promise<void> => {
      elements.forEach((radio, i) => {
        expect(radio.checked, `radio ${radio.value} checked`).to.be.equal(
          nativeElements[i].checked,
        );
      });

      // General form configuration
      expect(elements[0].type, 'radio type').to.be.equal(nativeElements[0].type);
      expect(elements[0].role, 'radio role').to.be.equal(nativeElements[0].role);

      // Events
      expect(inputSpy.count, `'input' event`).to.be.equal(nativeInputSpy.count);
      expect(changeSpy.count, `'change' event`).to.be.equal(nativeChangeSpy.count);

      // Form state should always correspond to checked property.
      const formData = new FormData(form);
      expect(formData.get('sbb-group-1'), 'form data - group 1').to.be.equal(
        formData.get('native-group-1'),
      );
      expect(formData.get('sbb-group-2'), 'form data - group 2').to.be.equal(
        formData.get('native-group-2'),
      );
    };

    ['sbb-radio-button', 'sbb-radio-button-panel'].forEach((selector) => {
      describe(selector, () => {
        const tagSingle = unsafeStatic(selector);

        describe('general behavior', () => {
          beforeEach(async () => {
            form = await fixture(html`
              <form id="main">
                <fieldset id="sbb-set">
                  <${tagSingle} value="1" name="sbb-group-1">1</${tagSingle}>
                  <${tagSingle} value="2" name="sbb-group-1">2</${tagSingle}>
                  <${tagSingle} value="3" name="sbb-group-1">3</${tagSingle}>

                  <${tagSingle} value="4" name="sbb-group-2">1</${tagSingle}>
                  <${tagSingle} value="5" name="sbb-group-2">2</${tagSingle}>
                </fieldset>
                <fieldset id="native-set">
                  <input type="radio" value="1" name="native-group-1">
                  <input type="radio" value="2" name="native-group-1">
                  <input type="radio" value="3" name="native-group-1">

                  <input type="radio" value="4" name="native-group-2">
                  <input type="radio" value="5" name="native-group-2">
                </fieldset>
              </form>`);

            elements = Array.from(form.querySelectorAll(selector));
            nativeElements = Array.from(form.querySelectorAll('input'));
            fieldset = form.querySelector<HTMLFieldSetElement>('#sbb-set')!;
            nativeFieldset = form.querySelector<HTMLFieldSetElement>('#native-set')!;

            inputSpy = new EventSpy('input', fieldset);
            changeSpy = new EventSpy('change', fieldset);
            nativeInputSpy = new EventSpy('input', nativeFieldset);
            nativeChangeSpy = new EventSpy('change', nativeFieldset);

            await waitForLitRender(form);
          });

          it('should find connected form', () => {
            expect(elements[0].form).to.be.equal(form);
          });

          it('first elements of groups should be focusable', async () => {
            expect(elements[0].tabIndex).to.be.equal(0);
            expect(elements[1].tabIndex).to.be.equal(-1);
            expect(elements[2].tabIndex).to.be.equal(-1);
            expect(elements[3].tabIndex).to.be.equal(0);
            expect(elements[4].tabIndex).to.be.equal(-1);
            await compareToNative();
          });

          it('should select on click', async () => {
            elements[1].click();
            await waitForLitRender(form);
            expect(document.activeElement === elements[1]).to.be.true;

            nativeElements[1].click();
            await waitForLitRender(form);

            expect(elements[0].tabIndex).to.be.equal(-1);
            expect(elements[1].tabIndex).to.be.equal(0);
            expect(elements[1].checked).to.be.true;
            await compareToNative();
          });

          it('should reflect state after programmatic change', async () => {
            elements[1].checked = true;
            nativeElements[1].checked = true;
            await waitForLitRender(form);

            expect(elements[0].tabIndex).to.be.equal(-1);
            expect(elements[1].tabIndex).to.be.equal(0);
            await compareToNative();
          });

          it('should update validity for associated radio buttons with required true', async () => {
            for (const radioButtons of [elements, nativeElements]) {
              for (const element of radioButtons) {
                expect(element.validationMessage).to.equal('');
                expect(element.validity.valueMissing).to.be.false;
              }
            }

            nativeElements[0].toggleAttribute('required', true);
            elements[0].toggleAttribute('required', true);
            await waitForLitRender(elements[0]);

            for (const radioButtons of [elements, nativeElements]) {
              for (const element of radioButtons) {
                if (element.name === radioButtons[0].name) {
                  expect(element.validationMessage.length).to.be.greaterThan(
                    0,
                    'Required group validation message',
                  );
                  expect(element.validity.valueMissing).to.be.true;
                } else {
                  expect(element.validationMessage).to.equal(
                    '',
                    'Non-required group validation message',
                  );
                  expect(element.validity.valueMissing).to.be.false;
                }
              }
            }
          });

          it('should update validity with required true and checked for associated radio buttons', async () => {
            elements[0].toggleAttribute('required', true);
            elements[0].checked = true;
            await waitForLitRender(elements[0]);

            expect(elements[1].validationMessage).to.equal('');
            expect(elements[1].validity.valueMissing).to.be.false;
          });

          it('should update validity for associated radio buttons on disconnect', async () => {
            elements[0].toggleAttribute('required', true);
            await waitForLitRender(elements[0]);

            const observedElements = elements.filter((e) => e.name === elements[0].name);
            for (const element of observedElements) {
              expect(element.validationMessage.length).to.be.greaterThan(
                0,
                'Required group validation message',
              );
              expect(element.validity.valueMissing).to.be.true;
            }

            observedElements[0].remove();
            expect(observedElements[1].validationMessage).to.equal('');
            expect(observedElements[1].validity.valueMissing).to.be.false;
          });

          it('should update validity for associated radio buttons on connect', async () => {
            elements[0].toggleAttribute('required', true);
            await waitForLitRender(elements[0]);

            const observedElements = elements.filter((e) => e.name !== elements[0].name);
            for (const element of observedElements) {
              expect(element.validationMessage).to.be.equal('');
              expect(element.validity.valueMissing).to.be.false;
            }

            elements[0].name = observedElements[0].name;
            for (const element of observedElements) {
              expect(element.validationMessage.length).to.be.greaterThan(
                0,
                'Required group validation message',
              );
              expect(element.validity.valueMissing).to.be.true;
            }
          });

          it('should update validity after a rename', async () => {
            elements[0].toggleAttribute('required', true);
            await waitForLitRender(elements[0]);

            const element = elements[1];
            expect(element.validationMessage.length).to.be.greaterThan(
              0,
              'Required group validation message',
            );
            expect(element.validity.valueMissing).to.be.true;

            element.name = 'my-test';

            expect(element.validationMessage).to.be.equal('');
            expect(element.validity.valueMissing).to.be.false;
          });

          it('should reset on form reset', async () => {
            elements[1].checked = true;
            nativeElements[1].checked = true;
            await waitForLitRender(form);

            form.reset();
            await waitForLitRender(form);

            expect(elements[0].tabIndex).to.be.equal(0);
            expect(elements[1].tabIndex).to.be.equal(-1);
            expect(elements[1].checked).to.be.false;
            await compareToNative();
          });

          it('should restore default on form reset', async () => {
            elements[1].toggleAttribute('checked', true);
            nativeElements[1].toggleAttribute('checked', true);
            await waitForLitRender(form);

            elements[0].click();
            nativeElements[0].click();
            await waitForLitRender(form);

            form.reset();
            await waitForLitRender(form);

            expect(elements[0].tabIndex).to.be.equal(-1);
            expect(elements[1].tabIndex).to.be.equal(0);
            expect(elements[0].checked).to.be.false;
            expect(elements[1].checked).to.be.true;
            await compareToNative();
          });

          it('should restore on form restore', async () => {
            // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
            elements[0].formStateRestoreCallback('2', 'restore');
            elements[1].formStateRestoreCallback('2', 'restore');
            await waitForLitRender(form);

            expect(elements[0].checked).to.be.false;
            expect(elements[1].checked).to.be.true;
            expect(elements[0].tabIndex).to.be.equal(-1);
            expect(elements[1].tabIndex).to.be.equal(0);
          });

          it('should handle adding a new radio to the group', async () => {
            elements[0].checked = true;
            await waitForLitRender(form);

            // Create and add a new checked radio to the group
            const newRadio = document.createElement(selector) as
              | SbbRadioButtonElement
              | SbbRadioButtonPanelElement;
            newRadio.setAttribute('name', 'sbb-group-1');
            newRadio.setAttribute('value', '4');
            newRadio.toggleAttribute('checked', true);
            fieldset.appendChild(newRadio);

            await waitForLitRender(form);

            expect(elements[0].checked).to.be.false;
            expect(newRadio.checked).to.be.true;
            expect(elements[0].tabIndex).to.be.equal(-1);
            expect(newRadio.tabIndex).to.be.equal(0);
          });

          it('should handle moving a radio between the groups', async () => {
            elements[0].checked = true;
            nativeElements[0].checked = true;
            elements[3].checked = true;
            nativeElements[3].checked = true;

            await waitForLitRender(form);

            elements[3].name = elements[0].name;
            nativeElements[3].name = nativeElements[0].name;

            await waitForLitRender(form);

            // When moving a checked radio to a group, it has priority and becomes the new checked
            expect(elements[0].checked).to.be.false;
            expect(elements[3].checked).to.be.true;
            expect(elements[0].tabIndex).to.be.equal(-1);
            expect(elements[3].tabIndex).to.be.equal(0);
            await compareToNative();
          });

          describe('keyboard interaction', () => {
            it('should select on space key', async () => {
              elements[0].focus();
              await sendKeys({ press: 'Space' });
              await waitForLitRender(form);

              expect(elements[0].checked).to.be.true;
            });

            it('should select and wrap on arrow keys', async () => {
              elements[1].checked = true;
              await waitForLitRender(form);
              elements[1].focus();

              await sendKeys({ press: 'ArrowRight' });
              await waitForLitRender(form);

              expect(elements[1].checked).to.be.false;
              expect(elements[2].checked).to.be.true;
              expect(document.activeElement === elements[2]).to.be.true;

              await sendKeys({ press: 'ArrowDown' });
              await waitForLitRender(form);

              expect(elements[2].checked).to.be.false;
              expect(elements[0].checked).to.be.true;
              expect(document.activeElement === elements[0]).to.be.true;

              await sendKeys({ press: 'ArrowLeft' });
              await waitForLitRender(form);

              expect(elements[0].checked).to.be.false;
              expect(elements[2].checked).to.be.true;
              expect(document.activeElement === elements[2]).to.be.true;

              await sendKeys({ press: 'ArrowUp' });
              await waitForLitRender(form);

              expect(elements[2].checked).to.be.false;
              expect(elements[1].checked).to.be.true;
              expect(document.activeElement === elements[1]).to.be.true;

              // Execute same steps on native and compare the outcome
              nativeElements[1].focus();
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: 'ArrowDown' });
              await sendKeys({ press: 'ArrowLeft' });
              await sendKeys({ press: 'ArrowUp' });

              // On webkit, native radios do not wrap
              if (!isWebkit) {
                await compareToNative();
              }
            });

            it('should handle keyboard interaction outside of a form', async () => {
              // Move the radios outside the form
              form.parentElement!.append(fieldset);
              await waitForLitRender(fieldset);

              elements[0].focus();
              await sendKeys({ press: 'ArrowDown' });
              await waitForLitRender(fieldset);
              expect(elements[0].checked).to.be.false;
              expect(elements[1].checked).to.be.true;
              expect(document.activeElement === elements[1]).to.be.true;

              await sendKeys({ press: 'ArrowDown' });
              await sendKeys({ press: 'ArrowDown' });
              await waitForLitRender(fieldset);
              expect(elements[0].checked).to.be.true;
              expect(document.activeElement === elements[0]).to.be.true;
            });

            it('should skip disabled elements on arrow keys', async () => {
              elements[1].disabled = true;
              await waitForLitRender(form);

              elements[0].focus();
              await sendKeys({ press: 'ArrowRight' });
              await waitForLitRender(form);

              expect(elements[0].checked).to.be.false;
              expect(elements[2].checked).to.be.true;
              expect(document.activeElement === elements[2]).to.be.true;

              await sendKeys({ press: 'ArrowLeft' });
              await waitForLitRender(form);

              expect(elements[2].checked).to.be.false;
              expect(elements[0].checked).to.be.true;
              expect(document.activeElement === elements[0]).to.be.true;
            });

            it('should skip non-visible elements on arrow keys', async () => {
              elements[1].style.display = 'none';
              await waitForLitRender(form);

              elements[0].focus();
              await sendKeys({ press: 'ArrowRight' });
              await waitForLitRender(form);

              expect(elements[0].checked).to.be.false;
              expect(elements[2].checked).to.be.true;
              expect(document.activeElement === elements[2]).to.be.true;

              await sendKeys({ press: 'ArrowLeft' });
              await waitForLitRender(form);

              expect(elements[2].checked).to.be.false;
              expect(elements[0].checked).to.be.true;
              expect(document.activeElement === elements[0]).to.be.true;
            });
          });

          describe('disabled state', () => {
            it('should result :disabled', async () => {
              elements[0].disabled = true;
              await waitForLitRender(form);

              expect(elements[0]).to.match(':disabled');
              expect(elements[1].tabIndex).to.be.equal(0);
            });

            it('should result :disabled if a fieldSet is', async () => {
              fieldset.toggleAttribute('disabled', true);
              await waitForLitRender(form);

              expect(elements[0]).to.match(':disabled');
            });

            it('should do nothing when clicked', async () => {
              elements[0].disabled = true;
              await waitForLitRender(form);

              elements[0].click();
              await waitForLitRender(form);

              expect(elements[0].checked).to.be.false;
            });

            it('should update tabindex when the first element is disabled', async () => {
              expect(elements[0].tabIndex).to.be.equal(0);
              elements[0].disabled = true;
              await waitForLitRender(form);

              expect(elements[0].tabIndex).to.be.equal(-1);
              expect(elements[1].tabIndex).to.be.equal(0);
            });
          });
        });

        describe('multiple groups with the same name', () => {
          let root: HTMLElement;
          let form2: HTMLFormElement;

          beforeEach(async () => {
            root = await fixture(html`
              <div>
                <form id="main">
                  <${tagSingle} value="1" name="sbb-group-1">1</${tagSingle}>
                  <${tagSingle} value="2" name="sbb-group-1">2</${tagSingle}>
                  <${tagSingle} value="3" name="sbb-group-1">3</${tagSingle}>
                </form>
                <form id="secondary">
                  <${tagSingle} value="1" name="sbb-group-1">1</${tagSingle}>
                  <${tagSingle} value="2" name="sbb-group-1">2</${tagSingle}>
                  <${tagSingle} value="3" name="sbb-group-1">3</${tagSingle}>
                </form>
              </div>
            `);

            form = root.querySelector('form#main')!;
            form2 = root.querySelector('form#secondary')!;
            elements = Array.from(root.querySelectorAll(selector));
            await waitForLitRender(root);
          });

          it('groups should be independent', async () => {
            expect(elements[0].tabIndex).to.be.equal(0);
            expect(elements[3].tabIndex).to.be.equal(0);

            // Check the first element of each group
            elements[0].click();
            elements[3].click();
            await waitForLitRender(root);

            expect(elements[0].tabIndex).to.be.equal(0);
            expect(elements[0].checked).to.be.true;
            expect(elements[3].tabIndex).to.be.equal(0);
            expect(elements[3].checked).to.be.true;
          });

          it('groups should be independent when keyboard navigated', async () => {
            elements[0].focus();

            await sendKeys({ press: 'ArrowUp' });
            await waitForLitRender(root);

            expect(elements[2].tabIndex).to.be.equal(0);
            expect(elements[2].checked).to.be.true;
            expect(elements[5].tabIndex).to.be.equal(-1);
            expect(elements[5].checked).to.be.false;
          });

          describe('radioButtonRegistry', () => {
            it('should be in the correct state', async () => {
              const group1Set = radioButtonRegistry.get(form)!.get('sbb-group-1')!;
              const group2Set = radioButtonRegistry.get(form2)!.get('sbb-group-1')!;
              const group1Radios = Array.from(form.querySelectorAll(selector));
              const group2Radios = Array.from(form2.querySelectorAll(selector));

              // Assert the order is the correct
              expect(group1Set.size).to.be.equal(3);
              expect(group2Set.size).to.be.equal(3);

              expect(Array.from(group1Set)).contains.members(group1Radios);
              expect(Array.from(group2Set)).contains.members(group2Radios);
            });

            it('should be sorted in DOM order', async () => {
              const group1Set = radioButtonRegistry
                .get(form)!
                .get('sbb-group-1')! as unknown as Set<Element>;
              let group1Radios = Array.from(form.querySelectorAll(selector));

              // Assert the order is the correct
              expect(group1Set.size).to.be.equal(3);
              Array.from(group1Set).forEach((r, i) => expect(group1Radios[i] === r).to.be.true);

              // Move the first radio to the last position
              form.append(group1Radios[0]);
              group1Radios = Array.from(form.querySelectorAll(selector));

              // Assert the order is the correct
              expect(group1Set.size).to.be.equal(3);
              Array.from(group1Set).forEach((r, i) => expect(group1Radios[i] === r).to.be.true);
            });

            it('should remove empty entries from the registry', async () => {
              const group2Set = radioButtonRegistry.get(form2)!.get('sbb-group-1')!;

              // Remove the second radio group from the DOM
              form2.remove();
              await waitForLitRender(root);

              expect(group2Set.size).to.be.equal(0);
              expect(radioButtonRegistry.get(form)!.get('sbb-group-1')?.size).to.be.equal(3);
              expect(radioButtonRegistry.get(form2)!.get('sbb-group-1')).to.be.undefined;
            });
          });
        });

        describe('with complex value', () => {
          const values = [
            { value: '1', label: 'Value 1' },
            { value: '2', label: 'Value 2' },
            { value: '3', label: 'Value 3' },
          ];

          beforeEach(async () => {
            form = await fixture(html`
              <form id="main">
                <${tagSingle} .value=${values[0]} name="sbb-group-1">${values[0].label}</${tagSingle}>
                <${tagSingle} .value=${values[1]} name="sbb-group-1" checked>${values[1].label}</${tagSingle}>
                <${tagSingle} .value=${values[2]} name="sbb-group-1">${values[2].label}</${tagSingle}>
              </form>`);

            elements = Array.from(form.querySelectorAll(selector));

            inputSpy = new EventSpy('input', fieldset);
            changeSpy = new EventSpy('change', fieldset);
            await waitForLitRender(form);
          });

          it('should init with value', async () => {
            const formData = new FormData(form);
            const data = formData.get('sbb-group-1');
            const value = data instanceof Blob ? JSON.parse(await data.text()) : data;

            expect(value).to.be.deep.equal(values[1]);
            expect(elements[1].checked).to.be.true;
          });

          it('should update value on click', async () => {
            elements[0].click();
            await waitForLitRender(form);

            const formData = new FormData(form);
            const data = formData.get('sbb-group-1');
            const value = data instanceof Blob ? JSON.parse(await data.text()) : data;

            expect(value).to.be.deep.equal(values[0]);
            expect(elements[0].checked).to.be.true;
            expect(elements[1].checked).to.be.false;
          });

          it('should serialize and deserialize complex value', async () => {
            // TODO: Deserialization needs the compareValue function to work properly, for now we use 'numbers' as complex value.
            (
              elements as unknown as (
                | SbbRadioButtonElement<number>
                | SbbRadioButtonPanelElement<number>
              )[]
            ).forEach((r, i) => (r.value = i));
            await waitForLitRender(form);

            // Get the stored formData from the form
            const formData = new FormData(form);
            const data = formData.get('sbb-group-1');
            const value = data instanceof Blob ? JSON.parse(await data.text()) : data;

            form.reset();
            await waitForLitRender(form);

            // Simulate navigating to other page and then back to form
            elements.forEach((e) => e.formStateRestoreCallback(formData, 'restore'));

            // Wait for the formStateRestoreCallback to finish
            await aTimeout(30);
            await waitForLitRender(form);

            expect(value).to.be.deep.equal(1); // Should be 'expect(value).to.be.deep.equal(values[1])'
            expect(elements[1]).to.have.attribute('checked');
          });
        });
      });
    });
  });
});
