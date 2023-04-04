import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-next-day', () => {
  describe('standalone', () => {
    it('renders', async () => {
      const page: E2EPage = await newE2EPage({
        html: '<sbb-datepicker-next-day></sbb-datepicker-next-day>',
      });
      const element: E2EElement = await page.find('sbb-datepicker-next-day');
      expect(element).toHaveClass('hydrated');
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const page: E2EPage = await newE2EPage({
        html: `
          <input id="datepicker-input" value="31-12-2022"/>
          <sbb-datepicker id='datepicker' input='datepicker-input'></sbb-datepicker>
          <sbb-datepicker-next-day date-picker='datepicker'></sbb-datepicker-next-day>
        `,
      });
      const element: E2EElement = await page.find('sbb-datepicker-next-day');
      const input: E2EElement = await page.find('input');
      await page.waitForChanges();
      expect(element).toHaveClass('hydrated');
      expect(await input.getProperty('value')).toEqual('31-12-2022');

      const changeSpy = await input.spyOnEvent('change');
      await element.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await input.getProperty('value')).toEqual('01.01.2023');
    });
  });

  describe('in form field', () => {
    let element: E2EElement, input: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <input value="21-01-2023"/>
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `);
      element = await page.find('sbb-datepicker-next-day');
      input = await page.find('input');
      await page.waitForChanges();
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('click', async () => {
      expect(await input.getProperty('value')).toEqual('21-01-2023');
      const changeSpy = await input.spyOnEvent('change');
      await element.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(await input.getProperty('value')).toEqual('22.01.2023');
    });

    it('disabled due max value equals to value', async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <input value="21-01-2023" max="1674255600"/>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      input = await page.find('input');
      await page.waitForChanges();

      expect(await input.getProperty('value')).toEqual('21-01-2023');
      await page.waitForChanges();

      expect(
        await page.evaluate(() =>
          document.querySelector('sbb-datepicker-next-day').getAttribute('disabled')
        )
      ).toEqual('');

      await element.click();
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('21-01-2023');
    });

    it('disabled due disabled picker', async () => {
      expect(await input.getProperty('value')).toEqual('21-01-2023');
      await page.evaluate(() => document.querySelector('input').setAttribute('disabled', ''));

      await page.waitForChanges();

      expect(element).toHaveAttribute('disabled');
      await element.click();
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('21-01-2023');
    });
  });
});
