import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html, unsafeStatic } from 'lit/static-html.js';

import { type SbbCheckboxGroupElement, SbbCheckboxPanelElement } from '../checkbox.ts';
import { fixture, tabKey } from '../core/testing/private.ts';
import { waitForLitRender } from '../core/testing.ts';
import { type SbbRadioButtonGroupElement, SbbRadioButtonPanelElement } from '../radio-button.ts';

import { SbbSelectionActionPanelElement } from './selection-action-panel.component.ts';

import '../link/block-link-button.ts';
import '../button/secondary-button.ts';
import '../card/card-badge.ts';

describe(`sbb-selection-action-panel`, () => {
  let elements: SbbSelectionActionPanelElement[];

  for (const inputType of ['checkbox', 'radio-button']) {
    describe(`with ${inputType}`, () => {
      let wrapper: SbbRadioButtonGroupElement | SbbCheckboxGroupElement;
      let firstPanel: SbbSelectionActionPanelElement;
      let firstInput: SbbRadioButtonPanelElement | SbbCheckboxPanelElement;
      let secondPanel: SbbSelectionActionPanelElement;
      let secondInput: SbbRadioButtonPanelElement | SbbCheckboxPanelElement;
      let disabledInput: SbbRadioButtonPanelElement | SbbCheckboxPanelElement;

      beforeEach(async () => {
        const tagGroupElement = unsafeStatic(`sbb-${inputType}-group`);
        const tagSingle = unsafeStatic(`sbb-${inputType}-panel`);

        /* eslint-disable lit/binding-positions */
        wrapper = await fixture(html`
          <${tagGroupElement} size="m">
            <sbb-selection-action-panel>
              <${tagSingle} id="sbb-input-1" value="Value one">Value one</${tagSingle}>
              <sbb-secondary-button size="m" icon-name="arrow-right-small">
              </sbb-secondary-button>
            </sbb-selection-action-panel>
            <sbb-selection-action-panel>
              <${tagSingle} id="sbb-input-2" value="Value two">Value two</${tagSingle}>
              <sbb-secondary-button size="m" icon-name="arrow-right-small">
              </sbb-secondary-button>
            </sbb-selection-action-panel>
            <sbb-selection-action-panel>
              <${tagSingle} id="sbb-input-3" value="Value three" disabled>Value three</${tagSingle}>
              <sbb-secondary-button size="m" icon-name="arrow-right-small" disabled>
              </sbb-secondary-button>
            </sbb-selection-action-panel>
            <sbb-selection-action-panel>
              <${tagSingle} id="sbb-input-4" value="Value four">Value four</${tagSingle}>
              <sbb-secondary-button size="m" icon-name="arrow-right-small">
              </sbb-secondary-button>
            </sbb-selection-action-panel>
          </${tagGroupElement}>`);
        /* eslint-enable lit/binding-positions */

        elements = Array.from(wrapper.querySelectorAll('sbb-selection-action-panel'));
        firstPanel = elements[0];
        secondPanel = elements[1];
        firstInput = wrapper.querySelector<SbbRadioButtonPanelElement>('#sbb-input-1')!;
        secondInput = wrapper.querySelector<SbbRadioButtonPanelElement>('#sbb-input-2')!;
        disabledInput = wrapper.querySelector<SbbRadioButtonPanelElement>('#sbb-input-3')!;
      });

      it('renders', () => {
        const type =
          inputType === 'radio-button' ? SbbRadioButtonPanelElement : SbbCheckboxPanelElement;
        elements.forEach((e) => assert.instanceOf(e, SbbSelectionActionPanelElement));
        assert.instanceOf(firstPanel, SbbSelectionActionPanelElement);
        assert.instanceOf(firstInput, type as any);
        assert.instanceOf(secondPanel, SbbSelectionActionPanelElement);
        assert.instanceOf(secondInput, type as any);
      });

      it('does not focus disabled', async () => {
        secondInput.focus();
        await sendKeys({ press: tabKey });

        // Focus the second action
        expect(document.activeElement!.localName).to.be.equal('sbb-secondary-button');
        await sendKeys({ press: tabKey });

        // Skip the disabled panel to the 4th
        expect(document.activeElement!.id).to.be.equal('sbb-input-4');

        // Assert disabled state
        expect(elements[2]).to.match(':state(disabled)');
        expect(disabledInput).to.match(':disabled');
      });

      it('does update on disabled change', async () => {
        disabledInput.disabled = false;
        await waitForLitRender(wrapper);

        expect(elements[2]).not.to.match(':state(disabled)');
        expect(disabledInput).not.to.match(':disabled');
      });

      it('does update on disabled change on group', async () => {
        wrapper.disabled = true;
        await waitForLitRender(wrapper);

        expect(firstInput).to.match(':disabled');
        expect(firstPanel).to.match(':state(disabled)');

        expect(disabledInput).to.match(':disabled');
        expect(elements[2]).to.match(':state(disabled)');

        wrapper.disabled = false;
        await waitForLitRender(wrapper);

        expect(firstInput).not.to.match(':disabled');
        expect(firstPanel).not.to.match(':state(disabled)');

        expect(disabledInput).to.match(':disabled');
        expect(elements[2]).to.match(':state(disabled)');
      });

      it('preserves input button disabled state after being disabled from group', async () => {
        wrapper.disabled = true;
        await waitForLitRender(wrapper);

        disabledInput.click();
        await waitForLitRender(wrapper);
        expect(disabledInput.checked).to.be.false;

        secondInput.click();
        await waitForLitRender(wrapper);
        expect(secondInput.checked).to.be.false;

        wrapper.disabled = false;
        await waitForLitRender(wrapper);

        disabledInput.click();
        await waitForLitRender(wrapper);
        expect(disabledInput.checked).to.be.false;

        secondInput.click();
        await waitForLitRender(wrapper);
        expect(secondInput.checked).to.be.true;
      });

      it('focuses input on left arrow key pressed and selects it on space key pressed', async () => {
        const fourthInput = wrapper.querySelector<SbbRadioButtonPanelElement>('#sbb-input-4')!;

        firstInput.click();
        firstInput.focus();
        await sendKeys({ press: 'ArrowLeft' });
        await waitForLitRender(wrapper);
        expect(document.activeElement!.id).to.be.equal(fourthInput.id);
        expect(firstInput.checked).to.be.true;
        expect(fourthInput.checked).to.be.false;

        await sendKeys({ press: ' ' });
        expect(fourthInput.checked).to.be.true;
        inputType === 'checkbox'
          ? expect(firstInput.checked).to.be.true
          : expect(firstInput.checked).to.be.false;
      });

      it('focuses input on right arrow key pressed and selects it on space key pressed', async () => {
        firstInput.click();
        firstInput.focus();

        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(wrapper);
        expect(document.activeElement!.id).to.be.equal(secondInput.id);
        expect(firstInput.checked).to.be.true;
        expect(secondInput.checked).to.be.false;

        await sendKeys({ press: ' ' });
        expect(secondInput.checked).to.be.true;
        inputType === 'checkbox'
          ? expect(firstInput.checked).to.be.true
          : expect(firstInput.checked).to.be.false;
        expect(document.activeElement!.id).to.be.equal(secondInput.id);
      });

      it('wraps around on arrow key navigation', async () => {
        secondInput.click();
        secondInput.focus();
        await waitForLitRender(wrapper);

        expect(secondInput.checked).to.be.true;
        await sendKeys({ press: 'ArrowRight' });
        await sendKeys({ press: 'ArrowRight' });
        await waitForLitRender(wrapper);

        expect(document.activeElement!.id).to.be.equal(firstInput.id);
      });

      it('change size on group', async () => {
        expect(firstPanel).to.match(`:state(size-m)`);
        expect(secondPanel).to.match(`:state(size-m)`);

        wrapper.size = 's';
        await waitForLitRender(wrapper);

        expect(firstPanel).to.match(`:state(size-s)`);
        expect(secondPanel).to.match(`:state(size-s)`);
      });

      it('change size on input', async () => {
        const tagSingle = unsafeStatic(`sbb-${inputType}-panel`);
        /* eslint-disable lit/binding-positions */
        firstPanel = await fixture(html`
          <sbb-selection-action-panel>
            <${tagSingle} value="Value one" size="m">Value one</${tagSingle}>
            <sbb-secondary-button size="m" icon-name="arrow-right-small">
            </sbb-secondary-button>
          </sbb-selection-action-panel>
        `);
        /* eslint-enable lit/binding-positions */
        firstInput = firstPanel.querySelector(`sbb-${inputType}-panel`)!;

        expect(firstPanel).to.match(`:state(size-m)`);

        firstInput.size = 's';
        await waitForLitRender(wrapper);

        expect(firstPanel).to.match(`:state(size-s)`);
      });

      it('panel should have ariaDescribedByElements set if badge is used', async () => {
        const tagSingle = unsafeStatic(`sbb-${inputType}-panel`);
        /* eslint-disable lit/binding-positions */
        const panel = await fixture(html`
          <sbb-selection-action-panel>
            <${tagSingle} value="Value one" size="m">Value one</${tagSingle}>
            <sbb-secondary-button size="m" icon-name="arrow-right-small">
            </sbb-secondary-button>
            <sbb-card-badge>ab CHF 26.50</sbb-card-badge>
          </sbb-selection-action-panel>
        `);
        const badge = panel.querySelector(`sbb-card-badge`)!;
        /* eslint-enable lit/binding-positions */
        firstInput = panel.querySelector(`sbb-${inputType}-panel`)!;
        expect(firstInput.ariaDescribedByElements).not.to.be.null;
        expect(firstInput.ariaDescribedByElements!.length).to.be.equal(1);
        expect(firstInput.ariaDescribedByElements![0]).to.be.equal(badge);
      });
    });
  }
});
