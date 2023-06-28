import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-option.events';

describe('sbb-option', () => {
  describe('autocomplete', () => {
    let element: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <input/>
          <sbb-autocomplete>
            <sbb-option id="option-1" value="1">Option 1</sbb-option>
            <sbb-option id="option-2" value="2">Option 2</sbb-option>
            <sbb-option id="option-3" value="3">Option 3</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      `);
      element = await page.find('sbb-autocomplete');
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('set selected and emits on click', async () => {
      const optionOne = await page.find('sbb-autocomplete > sbb-option#option-1');
      expect(optionOne).not.toBeNull();
      const selectionChangeSpy = await page.spyOnEvent(events.selectionChange);
      optionOne.triggerEvent('click');
      await page.waitForChanges();
      expect(await optionOne.getProperty('selected')).toEqual(true);
      expect(selectionChangeSpy).toHaveReceivedEventTimes(1);
    });

    it('highlight on input', async () => {
      const input = await page.find('sbb-form-field > input');
      expect(input).not.toBeNull();
      await input.focus();
      await input.press('1');
      const optionOne = await page.find(
        'sbb-autocomplete > sbb-option#option-1 >>> .sbb-option__label'
      );
      expect(optionOne).toEqualHtml(`
        <span class="sbb-option__label">
          <slot></slot>
          <span class="sbb-option__label--highlight">Option</span>
          <span>1</span>
          <span class="sbb-option__label--highlight"></span>
        </span>
      `);
      const optionTwo = await page.find(
        'sbb-autocomplete > sbb-option#option-2 >>> .sbb-option__label'
      );
      expect(optionTwo).toEqualHtml(`
        <span class="sbb-option__label">
          <slot></slot>
          Option 2
        </span>
      `);
      const optionThree = await page.find(
        'sbb-autocomplete > sbb-option#option-3 >>> .sbb-option__label'
      );
      expect(optionThree).toEqualHtml(`
        <span class="sbb-option__label">
          <slot></slot>
          Option 3
        </span>
      `);
    });
  });
});
