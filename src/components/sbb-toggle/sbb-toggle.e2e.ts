import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

describe('sbb-toggle', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-toggle value="Value one">
        <sbb-toggle-option id="sbb-toggle-option-1" value="Value one">Value one</sbb-toggle-option>
        <sbb-toggle-option id="sbb-toggle-option-2" value="Value two">Value two</sbb-toggle-option>
      </sbb-toggle>
    `);
    element = await page.find('sbb-toggle');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('selects option on click', async () => {
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');
      const secondOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      expect(firstOption).toHaveAttribute('checked');

      await secondOption.click();

      expect(secondOption).toHaveAttribute('checked');
      expect(firstOption).not.toHaveAttribute('checked');
    });

    it('selects option on checked attribute change', async () => {
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');
      const secondOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      expect(firstOption).toHaveAttribute('checked');

      secondOption.setAttribute('checked', '');
      await page.waitForChanges();

      expect(secondOption).toHaveAttribute('checked');
      expect(firstOption).not.toHaveAttribute('checked');
    });

    it('dispatches event on option change', async () => {
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');
      const secondOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');
      const changeSpy = await page.spyOnEvent('change');
      const inputSpy = await page.spyOnEvent('input');

      await secondOption.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy).toHaveReceivedEventTimes(1);

      await firstOption.click();
      expect(firstOption).toHaveAttribute('checked');
    });

    it('prevents selection with disabled state', async () => {
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');
      const secondOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      element.setProperty('disabled', true);
      await page.waitForChanges();

      await secondOption.click();
      await page.waitForChanges();
      expect(secondOption).not.toHaveAttribute('checked');
      expect(firstOption).toHaveAttribute('checked');

      element.setProperty('disabled', false);
      await page.waitForChanges();

      await secondOption.click();
      await page.waitForChanges();
      expect(secondOption).toHaveAttribute('checked');
      expect(firstOption).not.toHaveAttribute('checked');
    });

    it('selects option on left arrow key pressed', async () => {
      const changeSpy = await page.spyOnEvent('change');
      const inputSpy = await page.spyOnEvent('input');
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');
      const secondOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      await firstOption.click();
      await page.keyboard.down('ArrowLeft');
      await page.waitForChanges();

      expect(secondOption).toHaveAttribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy).toHaveReceivedEventTimes(1);

      await firstOption.click();
      await page.waitForChanges();

      expect(firstOption).toHaveAttribute('checked');
    });

    it('selects option on right arrow key pressed', async () => {
      const changeSpy = await page.spyOnEvent('change');
      const inputSpy = await page.spyOnEvent('input');
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');
      const secondOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      await firstOption.click();
      await page.keyboard.down('ArrowRight');
      await page.waitForChanges();

      expect(secondOption).toHaveAttribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy).toHaveReceivedEventTimes(1);

      await firstOption.click();
      await page.waitForChanges();

      expect(firstOption).toHaveAttribute('checked');
    });
  });
});
