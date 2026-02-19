import { assert, expect } from '@open-wc/testing';
import { html, unsafeStatic } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbRadioButtonPanelElement } from '../radio-button-panel.ts';
import type { SbbRadioButtonElement } from '../radio-button.ts';

import { SbbRadioButtonGroupElement } from './radio-button-group.component.ts';

import '../radio-button.ts';
import '../radio-button-panel.ts';

['sbb-radio-button', 'sbb-radio-button-panel'].forEach((selector) => {
  const tagSingle = unsafeStatic(selector);
  describe(`sbb-radio-button-group with ${selector}`, () => {
    let element: SbbRadioButtonGroupElement;

    describe('general behavior', () => {
      let radios: (SbbRadioButtonElement | SbbRadioButtonPanelElement)[];

      beforeEach(async () => {
        /* eslint-disable lit/binding-positions */
        element = await fixture(html`
          <sbb-radio-button-group>
            <${tagSingle} id="sbb-radio-1" value="Value one">Value one</${tagSingle}>
            <${tagSingle} id="sbb-radio-2" value="Value two">Value two</${tagSingle}>
            <${tagSingle} id="sbb-radio-3" value="Value three" disabled>Value three</${tagSingle}>
          </sbb-radio-button-group>
        `);
        radios = Array.from(element.querySelectorAll(selector));

        await waitForLitRender(element);
      });

      it('renders', () => {
        assert.instanceOf(element, SbbRadioButtonGroupElement);
      });

      it('should set name on each radios', async () => {
        const name = element.name;
        radios.forEach((r) => expect(r.name).to.equal(name));
      });

      it('should update the name of each radios', async () => {
        element.name = 'group-1';
        await waitForLitRender(element);

        radios.forEach((r) => expect(r.name).to.equal('group-1'));
      });

      it('selects radio on click', async () => {
        const radio = radios[0];
        expect(element.value).to.null;

        radio.click();
        await waitForLitRender(element);

        expect(radio.checked).to.be.true;
        expect(element.value).to.be.equal(radio.value);
      });

      it('selects radio when value is set', async () => {
        const radio = radios[0];
        expect(element.value).to.null;
        element.value = radio.value;

        await waitForLitRender(element);

        expect(radio.checked).to.be.true;
        expect(element.value).to.be.equal(radio.value);
      });

      it('should ignore disabled radios', async () => {
        const radio = radios[0];
        radio.checked = true;
        radio.disabled = true;
        await waitForLitRender(element);

        expect(element.value).to.be.null;
      });

      it('should update disabled on children', async () => {
        element.disabled = true;
        await waitForLitRender(element);

        radios.forEach((r) => expect(r.disabled).to.be.true);

        element.disabled = false;
        await waitForLitRender(element);
        expect(radios[0].disabled).to.be.false;
        expect(radios[1].disabled).to.be.false;
        expect(radios[2].disabled).to.be.true;
      });

      it('should update required on children', async () => {
        element.required = true;
        await waitForLitRender(element);

        radios.forEach((r) => expect(r.required).to.be.true);

        element.required = false;
        await waitForLitRender(element);
        radios.forEach((r) => expect(r.required).to.be.false);
      });

      it('should update size on children', async () => {
        element.size = 's';
        await waitForLitRender(element);

        radios.forEach((r) => expect(r.size).to.be.equal('s'));
      });

      it('preserves radio button disabled state after being disabled from group', async () => {
        const firstRadio = radios[0];
        const disabledRadio = radios[2];

        element.disabled = true;
        await waitForLitRender(element);
        radios.forEach((r) => expect(r.disabled).to.be.true);

        element.disabled = false;
        await waitForLitRender(element);
        expect(firstRadio.disabled).to.be.false;
        expect(disabledRadio.disabled).to.be.true;
      });

      if (selector === 'sbb-radio-button-panel') {
        it('recognizes panel when added later', async () => {
          element = await fixture(html`<sbb-radio-button-group></sbb-radio-button-group>`);

          const panel = document.createElement('sbb-radio-button-panel');
          element.appendChild(panel);
          await waitForLitRender(element);

          expect(element).to.match(':state(has-panel)');
        });
      }

      describe('events', () => {
        it('dispatches event on radio change', async () => {
          radios[0].checked = true;
          const radio = radios[1];
          const changeSpy = new EventSpy('change', element);
          const inputSpy = new EventSpy('input', element);

          element.addEventListener(
            'change',
            () => {
              expect(element.value).to.be.equal('Value two');
              expect(
                Array.from(
                  element.querySelectorAll<SbbRadioButtonElement | SbbRadioButtonPanelElement>(
                    selector,
                  ),
                ).filter((radio) => radio.checked).length,
              ).to.be.equal(1);
            },
            { once: true },
          );

          radio.click();
          await waitForLitRender(element);

          await changeSpy.calledOnce();
          await inputSpy.calledOnce();

          const changeEvent = changeSpy.lastEvent!;
          expect(changeSpy.count).to.be.equal(1);
          expect(changeEvent.target === radio).to.be.true;

          const inputEvent = changeSpy.lastEvent!;
          expect(inputSpy.count).to.be.equal(1);
          expect(inputEvent.target === radio).to.be.true;

          // A click on a checked radio should not emit any event
          radio.click();
          await waitForLitRender(element);

          expect(changeSpy.count).to.be.equal(1);
          expect(inputSpy.count).to.be.equal(1);
        });

        it('does not select disabled radio on click', async () => {
          const changeSpy = new EventSpy('change');
          const inputSpy = new EventSpy('input');
          const disabledRadio = radios[2];

          disabledRadio.click();
          await waitForLitRender(element);

          expect(disabledRadio.checked).to.be.false;
          expect(changeSpy.count).to.be.equal(0);
          expect(inputSpy.count).to.be.equal(0);
        });
      });
    });

    describe('with init properties', () => {
      let radios: (SbbRadioButtonElement | SbbRadioButtonPanelElement)[];

      beforeEach(async () => {
        element = await fixture(html`
          <sbb-radio-button-group name="group-2" value="Value two">
            <${tagSingle} id="sbb-radio-1" value="Value one">Value one</${tagSingle}>
            <${tagSingle} id="sbb-radio-2" value="Value two">Value two</${tagSingle}>
          </sbb-radio-button-group>
        `);
        radios = Array.from(element.querySelectorAll(selector));
        await waitForLitRender(element);
      });

      it('should correctly set the init state', async () => {
        radios.forEach((r) => expect(r.name).to.be.equal('group-2'));
        expect(radios[0].checked).to.be.false;
        expect(radios[0].tabIndex).to.be.equal(-1);

        expect(radios[1].checked).to.be.true;
        expect(radios[1].tabIndex).to.be.equal(0);
      });
    });

    describe('with complex value', () => {
      let element: SbbRadioButtonGroupElement<{ value: string; label: string }>;
      let radios: (SbbRadioButtonElement | SbbRadioButtonPanelElement)[];
      const values = [
        { value: '1', label: 'Value 1' },
        { value: '2', label: 'Value 2' },
        { value: '3', label: 'Value 3' },
      ];

      beforeEach(async () => {
        element = await fixture(html`
          <sbb-radio-button-group>
            <${tagSingle} .value=${values[0]}>${values[0].label}</${tagSingle}>
            <${tagSingle} .value=${values[1]} checked>${values[1].label}</${tagSingle}>
            <${tagSingle} .value=${values[2]}>${values[2].label}</${tagSingle}>
          </sbb-radio-button-group>
        `);

        radios = Array.from(element.querySelectorAll(selector));

        await waitForLitRender(element);
      });

      it('should init with value', async () => {
        expect(element.value).to.be.deep.equal(radios[1].value);
      });

      it('should update value on click', async () => {
        radios[0].click();
        await waitForLitRender(element);

        expect(element.value).to.be.deep.equal(radios[0].value);
      });

      it('should set complex value', async () => {
        element.value = values[0];
        await waitForLitRender(element);

        expect(element.value).to.be.deep.equal(radios[0].value);
        expect(radios[0].checked).to.be.true;
        expect(radios[1].checked).to.be.false;
        expect(radios[2].checked).to.be.false;
      });

      describe('with falsy value', () => {
        let element: SbbRadioButtonGroupElement<boolean | number>;

        beforeEach(async () => {
          element = await fixture(html`
          <sbb-radio-button-group .value=${false}>
            <${tagSingle} .value=${true}>Value 0</${tagSingle}>
            <${tagSingle} .value=${false}>Value 1</${tagSingle}>
            <${tagSingle} .value=${0}>Value 1</${tagSingle}>
          </sbb-radio-button-group>
        `);
          radios = Array.from(element.querySelectorAll(selector));
        });

        it('should init with falsy value', async () => {
          expect(element.value).to.be.equal(false);
          expect(radios[0].checked).to.be.false;
          expect(radios[1].checked).to.be.true;
          expect(radios[2].checked).to.be.false;
        });

        it('should set falsy value', async () => {
          element.value = 0;
          await waitForLitRender(element);

          expect(element.value).to.be.equal(0);
          expect(radios[0].checked).to.be.false;
          expect(radios[1].checked).to.be.false;
          expect(radios[2].checked).to.be.true;
        });
      });
    });

    describe('value preservation', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-radio-button-group value="Value one">
            <sbb-radio-button value="42"></sbb-radio-button>
            <p>Other content</p>
          </sbb-radio-button-group>
        `);
      });

      it('should preserve value when no radios match the group value', () => {
        expect(element.value).to.equal('Value one');
      });

      it('should restore value when radios are slotted', async () => {
        const radioTwo = document.createElement('sbb-radio-button');
        radioTwo.value = 'Value two';
        element.appendChild(radioTwo);
        await waitForLitRender(element);
        expect(element.value).to.equal('Value one');

        const radioOne = document.createElement('sbb-radio-button');
        radioOne.value = 'Value one';
        element.appendChild(radioOne);
        await waitForLitRender(element);

        expect(element.value).to.equal('Value one');
        expect(radioOne.checked).to.be.true;
      });

      it('checked radios should have priority over group value', async () => {
        const radioOne = document.createElement('sbb-radio-button');
        radioOne.value = 'Value one';

        const radioTwo = document.createElement('sbb-radio-button');
        radioTwo.value = 'Value two';
        radioTwo.checked = true;

        element.appendChild(radioTwo);
        element.appendChild(radioOne);

        await waitForLitRender(element);

        expect(element.value).to.equal('Value two');
        expect(radioOne.checked).to.be.false;
        expect(radioTwo.checked).to.be.true;
      });

      it('user interaction should have priority over group value', async () => {
        const radioOne = element.querySelector<SbbRadioButtonElement>(
          'sbb-radio-button[value="42"]',
        )!;
        radioOne.click();

        await waitForLitRender(element);

        expect(element.value).to.equal('42');
      });
    });

    describe('nested groups', () => {
      let radios: (SbbRadioButtonElement | SbbRadioButtonPanelElement)[];

      beforeEach(async () => {
        /* eslint-disable lit/binding-positions */
        element = await fixture(html`
          <sbb-radio-button-group>
            <sbb-radio-button-group>
              <${tagSingle} id="sbb-radio-1" value="Value one">Value one</${tagSingle}>
              <${tagSingle} id="sbb-radio-2" value="Value two">Value two</${tagSingle}>
              <${tagSingle} id="sbb-radio-3" value="Value three" disabled>Value three</${tagSingle}>
            </sbb-radio-button-group>
          </sbb-radio-button-group>
        `);
        radios = Array.from(element.querySelectorAll(selector));

        await waitForLitRender(element);
      });

      it('user interaction should have priority over group value', async () => {
        const changeSpy = new EventSpy('change', element);
        const didChangeSpy = new EventSpy('didChange', element);
        radios[0].click();

        await waitForLitRender(element);

        await changeSpy.calledOnce();
        await didChangeSpy.calledOnce();
      });
    });
  });
});
