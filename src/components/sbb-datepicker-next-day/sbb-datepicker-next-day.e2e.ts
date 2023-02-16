import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-next-day', () => {
  describe('standalone', () => {
    it('renders', async () => {
      const page = await newE2EPage({
        html: '<sbb-datepicker-next-day></sbb-datepicker-next-day>',
      });
      const element = await page.find('sbb-datepicker-next-day');
      expect(element).toHaveClass('hydrated');
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const page = await newE2EPage({
        html: `
          <sbb-datepicker-next-day date-picker='datepicker'></sbb-datepicker-next-day>
          <sbb-datepicker id='datepicker' value="31-12-2022"></sbb-datepicker>
        `,
      });
      const element = await page.find('sbb-datepicker-next-day');
      const picker = await page.find('sbb-datepicker');
      const button = await page.find('sbb-datepicker-next-day >>> button');
      await page.waitForChanges();
      expect(element).toHaveClass('hydrated');
      expect(await picker.getProperty('value')).toEqual('31.12.2022');

      const changeSpy = await page.spyOnEvent('click');
      await button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await picker.getProperty('value')).toEqual('01.01.2023');
    });
  });

  describe('in form field', () => {
    let element: E2EElement, picker: E2EElement, button: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <sbb-datepicker value="21-01-2023"></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `);

      element = await page.find('sbb-datepicker-next-day');
      picker = await page.find('sbb-datepicker');
      button = await page.find('sbb-datepicker-next-day >>> button');
      await page.waitForChanges();
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('click', async () => {
      expect(await picker.getProperty('value')).toEqual('21.01.2023');

      const changeSpy = await page.spyOnEvent('click');
      await button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await picker.getProperty('value')).toEqual('22.01.2023');
    });

    it('disabled due max value equals to value', async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker value="20-01-2023" max="1674172800"></sbb-datepicker>
        </sbb-form-field>
      `);
      picker = await page.find('sbb-datepicker');
      button = await page.find('sbb-datepicker-next-day >>> button');

      await page.waitForChanges();

      expect(await picker.getProperty('value')).toEqual('20.01.2023');
      expect(button).toHaveAttribute('disabled');
      await button.click();
      await page.waitForChanges();
      expect(await picker.getProperty('value')).toEqual('20.01.2023');
    });

    it('disabled due disabled picker', async () => {
      page = await newE2EPage({
        html: `
          <sbb-form-field>
            <sbb-datepicker-next-day></sbb-datepicker-next-day>
            <sbb-datepicker value="01-01-2023" disabled="true"></sbb-datepicker>
          </sbb-form-field>
        `,
      });
      picker = await page.find('sbb-datepicker');
      button = await page.find('sbb-datepicker-next-day >>> button');
      await page.waitForChanges();

      expect(await picker.getProperty('value')).toEqual('01.01.2023');
      expect(button).toHaveAttribute('disabled');
      await button.click();
      await page.waitForChanges();
      expect(await picker.getProperty('value')).toEqual('01.01.2023');
    });
  });
});
