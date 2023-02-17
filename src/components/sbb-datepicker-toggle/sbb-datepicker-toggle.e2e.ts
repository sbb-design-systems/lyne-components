import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-toggle', () => {
  describe('standalone', () => {
    it('renders', async () => {
      const page: E2EPage = await newE2EPage({
        html: '<sbb-datepicker-toggle></sbb-datepicker-toggle>',
      });
      const element: E2EElement = await page.find('sbb-datepicker-toggle');
      const tooltipTrigger = await page.find('sbb-datepicker-toggle >>> sbb-tooltip-trigger');
      expect(element).toHaveClass('hydrated');
      expect(tooltipTrigger).toHaveAttribute('disabled');
    });
  });

  describe('with picker', () => {
    it('renders and open tooltip', async () => {
      const page: E2EPage = await newE2EPage({
        html: `
          <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
          <sbb-datepicker id='datepicker' value="01-01-2023"></sbb-datepicker>
        `,
      });
      const element: E2EElement = await page.find('sbb-datepicker-toggle');
      const tooltipTrigger = await page.find('sbb-datepicker-toggle >>> sbb-tooltip-trigger');
      const tooltip = await page.find('sbb-datepicker-toggle >>> sbb-tooltip');
      await page.waitForChanges();
      expect(element).toHaveClass('hydrated');
      expect(tooltipTrigger).not.toHaveAttribute('disabled');
      expect(tooltip).toEqualAttribute('data-state', 'closed');

      await tooltipTrigger.click();
      await page.waitForChanges();
      expect(tooltip).toEqualAttribute('data-state', 'opened');
    });
  });

  describe('in form field', () => {
    let element: E2EElement, tooltip: E2EElement, tooltipTrigger: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker value="20-01-2023"></sbb-datepicker>
        </sbb-form-field>
      `);
      element = await page.find('sbb-datepicker-toggle');
      tooltipTrigger = await page.find('sbb-datepicker-toggle >>> sbb-tooltip-trigger');
      tooltip = await page.find('sbb-datepicker-toggle >>> sbb-tooltip');
      await page.waitForChanges();
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('open calendar and change date', async () => {
      expect(tooltip).toEqualAttribute('data-state', 'closed');

      await tooltipTrigger.click();
      await page.waitForChanges();
      expect(tooltip).toEqualAttribute('data-state', 'opened');

      const calendar = await page.find('sbb-datepicker-toggle >>> sbb-calendar');
      await calendar.triggerEvent('date-selected', {
        detail: new Date('2022-01-01'),
      });
      await page.waitForChanges();
      const picker = await page.find('sbb-datepicker');
      expect(await picker.getProperty('value')).toEqual('01.01.2022');
    });
  });
});
