import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

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
      const secondOoption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      expect(firstOption).toHaveAttribute('checked');

      await secondOoption.click();

      expect(secondOoption).toHaveAttribute('checked');
      expect(firstOption).not.toHaveAttribute('checked');
    });

    it('dispatches event on option change', async () => {
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');
      const secondOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');
      const changeSpy = await page.spyOnEvent('change');

      await secondOption.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);

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
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');

      await firstOption.click();
      await page.keyboard.down('ArrowLeft');

      await page.waitForChanges();
      const secondOoption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      expect(secondOoption).toHaveAttribute('checked');

      await firstOption.click();
      await page.waitForChanges();

      expect(firstOption).toHaveAttribute('checked');
    });

    it('selects option on right arrow key pressed', async () => {
      const firstOption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-1');

      await firstOption.click();
      await page.keyboard.down('ArrowRight');

      await page.waitForChanges();
      const secondOoption = await page.find('sbb-toggle > sbb-toggle-option#sbb-toggle-option-2');

      expect(secondOoption).toHaveAttribute('checked');

      await firstOption.click();
      await page.waitForChanges();

      expect(firstOption).toHaveAttribute('checked');
    });
  });
});
