import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, unsafeStatic } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing.js';
import type { SbbRadioButtonPanelElement } from '../radio-button-panel.js';
import type { SbbRadioButtonElement } from '../radio-button.js';

import '../radio-button.js';
import '../radio-button-panel.js';

import { SbbRadioButtonGroupElement } from './radio-button-group.js';

['sbb-radio-button', 'sbb-radio-button-panel'].forEach((selector) => {
  const tagSingle = unsafeStatic(selector);
  describe(`sbb-radio-button-group with ${selector}`, () => {
    let element: SbbRadioButtonGroupElement;

    describe('events', () => {
      beforeEach(async () => {
        /* eslint-disable lit/binding-positions */
        element = await fixture(
          html`
        <sbb-radio-button-group value="Value one">
          <${tagSingle} id="sbb-radio-1" value="Value one">Value one</${tagSingle}>
          <${tagSingle} id="sbb-radio-2" value="Value two">Value two</${tagSingle}>
          <${tagSingle} id="sbb-radio-3" value="Value three" disabled
            >Value three</${tagSingle}
          >
          <${tagSingle} id="sbb-radio-4" value="Value four">Value four</${tagSingle}>
        </sbb-radio-button-group>
      `,
        );
      });

      it('renders', () => {
        assert.instanceOf(element, SbbRadioButtonGroupElement);
      });

      it('selects radio on click', async () => {
        const firstRadio = element.querySelector('#sbb-radio-1') as
          | SbbRadioButtonElement
          | SbbRadioButtonPanelElement;
        const radio = element.querySelector('#sbb-radio-2') as
          | SbbRadioButtonElement
          | SbbRadioButtonPanelElement;

        expect(firstRadio).to.have.attribute('checked');

        radio.click();
        await waitForLitRender(element);

        expect(radio).to.have.attribute('checked');
        expect(firstRadio).not.to.have.attribute('checked');
      });

      it('renders', () => {
        assert.instanceOf(element, SbbRadioButtonGroupElement);
      });

      describe('events', () => {
        it('selects radio on click', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;
          const radio = element.querySelector('#sbb-radio-2') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          expect(firstRadio).to.have.attribute('checked');

          radio.click();
          await waitForLitRender(element);

          expect(radio).to.have.attribute('checked');
          expect(firstRadio).not.to.have.attribute('checked');
        });

        it('dispatches event on radio change', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;
          const checkedRadio = element.querySelector('#sbb-radio-2') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;
          const changeSpy = new EventSpy('change');
          const inputSpy = new EventSpy('input');

          checkedRadio.click();
          await waitForCondition(() => changeSpy.events.length === 1);
          expect(changeSpy.count).to.be.equal(1);
          await waitForCondition(() => inputSpy.events.length === 1);
          expect(inputSpy.count).to.be.equal(1);

          firstRadio.click();
          await waitForLitRender(element);
          expect(firstRadio).to.have.attribute('checked');
        });

        it('does not select disabled radio on click', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;
          const disabledRadio = element.querySelector('#sbb-radio-3') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          disabledRadio.click();
          await waitForLitRender(element);

          expect(disabledRadio).not.to.have.attribute('checked');
          expect(firstRadio).to.have.attribute('checked');
        });

        it('should update tabIndex on disabled child change', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          const secondRadio = element.querySelector('#sbb-radio-2') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          expect(firstRadio.tabIndex).to.be.equal(0);
          expect(secondRadio.tabIndex).to.be.equal(-1);

          firstRadio.disabled = true;
          await waitForLitRender(element);

          expect(firstRadio.tabIndex).to.be.equal(-1);
          expect(secondRadio.tabIndex).to.be.equal(0);
        });

        it('preserves radio button disabled state after being disabled from group', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;
          const secondRadio = element.querySelector('#sbb-radio-2') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;
          const disabledRadio = element.querySelector('#sbb-radio-3') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          element.disabled = true;
          await waitForLitRender(element);

          disabledRadio.click();
          await waitForLitRender(element);
          expect(disabledRadio).not.to.have.attribute('checked');
          expect(firstRadio).to.have.attribute('checked');

          secondRadio.click();
          await waitForLitRender(element);
          expect(secondRadio).not.to.have.attribute('checked');

          element.disabled = false;
          await waitForLitRender(element);

          disabledRadio.click();
          await waitForLitRender(element);
          expect(disabledRadio).not.to.have.attribute('checked');
          expect(firstRadio).to.have.attribute('checked');
        });

        it('selects radio on left arrow key pressed', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          firstRadio.focus();
          await waitForLitRender(element);

          await sendKeys({ press: 'ArrowLeft' });
          await waitForLitRender(element);

          const radio = element.querySelector('#sbb-radio-4');
          expect(radio).to.have.attribute('checked');

          firstRadio.click();
          await waitForLitRender(element);

          expect(firstRadio).to.have.attribute('checked');
        });

        it('selects radio on right arrow key pressed', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          firstRadio.focus();
          await sendKeys({ press: 'ArrowRight' });

          await waitForLitRender(element);
          const radio = element.querySelector('#sbb-radio-2');

          expect(radio).to.have.attribute('checked');

          firstRadio.click();
          await waitForLitRender(element);

          expect(firstRadio).to.have.attribute('checked');
        });

        it('wraps around on arrow key navigation', async () => {
          const firstRadio = element.querySelector('#sbb-radio-1') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;
          const secondRadio = element.querySelector('#sbb-radio-2') as
            | SbbRadioButtonElement
            | SbbRadioButtonPanelElement;

          secondRadio.click();
          await waitForLitRender(element);
          expect(secondRadio).to.have.attribute('checked');

          secondRadio.focus();
          await waitForLitRender(element);

          await sendKeys({ press: 'ArrowRight' });
          await waitForLitRender(element);

          await sendKeys({ press: 'ArrowRight' });
          await waitForLitRender(element);

          const radio = element.querySelector('#sbb-radio-1');
          expect(radio).to.have.attribute('checked');

          firstRadio.click();
          await waitForLitRender(element);

          expect(firstRadio).to.have.attribute('checked');
        });
      });
    });

    describe('initialization', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-radio-button-group value="Value one">
            <p>Other content</p>
          </sbb-radio-button-group>
        `);
      });

      it('should preserve value when no radios were slotted but slotchange was triggered', () => {
        expect(element.value).to.equal('Value one');
      });

      it('should restore value when radios are slotted', async () => {
        const radioOne = document.createElement('sbb-radio-button');
        radioOne.value = 'Value one';

        const radioTwo = document.createElement('sbb-radio-button');
        radioTwo.value = 'Value two';

        element.appendChild(radioTwo);
        element.appendChild(radioOne);

        await waitForLitRender(element);

        expect(element.value).to.equal('Value one');
        expect(radioOne).to.have.attribute('checked');
      });
    });
  });
});
