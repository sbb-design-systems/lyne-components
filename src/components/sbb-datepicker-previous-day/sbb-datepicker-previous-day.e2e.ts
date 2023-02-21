import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-previous-day', () => {
  describe('standalone', () => {
    it('renders', async () => {
      const page: E2EPage = await newE2EPage({
        html: '<sbb-datepicker-previous-day></sbb-datepicker-previous-day>',
      });
      const element: E2EElement = await page.find('sbb-datepicker-previous-day');
      expect(element).toHaveClass('hydrated');
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const page: E2EPage = await newE2EPage({
        html: `
          <sbb-datepicker-previous-day date-picker='datepicker'></sbb-datepicker-previous-day>
          <sbb-datepicker id='datepicker' value="01-01-2023"></sbb-datepicker>
        `,
      });
      const element = await page.find('sbb-datepicker-previous-day');
      const picker = await page.find('sbb-datepicker');
      const button = await page.find('sbb-datepicker-previous-day >>> button');
      await page.waitForChanges();
      expect(element).toHaveClass('hydrated');
      expect(await picker.getProperty('value')).toEqual('01.01.2023');

      const changeSpy = await page.spyOnEvent('click');
      await button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await picker.getProperty('value')).toEqual('31.12.2022');
    });
  });

  describe('in form field', () => {
    let element: E2EElement, picker: E2EElement, button: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker value="20-01-2023"></sbb-datepicker>
        </sbb-form-field>
      `);
      element = await page.find('sbb-datepicker-previous-day');
      picker = await page.find('sbb-datepicker');
      await page.waitForChanges();
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('click', async () => {
      expect(await picker.getProperty('value')).toEqual('20.01.2023');
      button = await page.find('sbb-datepicker-previous-day >>> button');

      const changeSpy = await page.spyOnEvent('click');
      await button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await picker.getProperty('value')).toEqual('19.01.2023');
    });

    it('disabled due min value equals to value', async () => {
      button = await page.find('sbb-datepicker-previous-day >>> button');

      picker.setAttribute('min', 1674172800);
      await page.waitForChanges();

      expect(await picker.getProperty('value')).toEqual('20.01.2023');
      expect(button).toHaveAttribute('disabled');
      await button.click();
      await page.waitForChanges();
      expect(await picker.getProperty('value')).toEqual('20.01.2023');
    });

    it('disabled due disabled picker', async () => {
      button = await page.find('sbb-datepicker-previous-day >>> button');

      picker.setAttribute('disabled', true);
      await page.waitForChanges();

      expect(await picker.getProperty('value')).toEqual('20.01.2023');
      expect(button).toHaveAttribute('disabled');
      await button.click();
      await page.waitForChanges();
      expect(await picker.getProperty('value')).toEqual('20.01.2023');
    });
  });
});
