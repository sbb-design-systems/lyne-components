import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-form-field', () => {
  describe('with input', () => {
    let element: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<sbb-form-field><input/></sbb-form-field>');

      element = await page.find('sbb-form-field');
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('should remove the label element if no label is configured', async () => {
      expect(await page.findAll('sbb-form-field label')).toEqual([]);
      expect(element.shadowRoot.querySelector('label')).toBeNull();

      element.setAttribute('label', 'Label');
      await page.waitForChanges();
      expect(await element.find('label')).not.toBeNull();

      element.removeAttribute('label');
      await page.waitForChanges();
      expect(await element.find('label')).toBeNull();
    });

    it('should update empty input state', async () => {
      const input = await page.find('input');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).not.toBeNull();

      await input.type('v');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();

      await input.press('Backspace');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).not.toBeNull();

      await input.type('v');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();

      // Clearing value programmatically which does not trigger input event but can be caught by blur event.
      await page.evaluate(() => {
        const htmlInputElement = document.querySelector('input');
        htmlInputElement.value = '';
        htmlInputElement.blur();
      });
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).not.toBeNull();
    });

    it('should react to focus state', async () => {
      const input = await page.find('input');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-focused')).toBeNull();

      await input.type('v');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-focused')).not.toBeNull();

      await input.press('Tab');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-focused')).toBeNull();
    });

    it('should assign id to input and reference it in the label', async () => {
      element.setAttribute('label', 'Example');
      await page.waitForChanges();
      const input = await page.find('input');
      const label = await page.find('label');

      await page.waitForChanges();

      expect(input.id).toMatch(/^sbb-form-field-input-/);
      expect(label.getAttribute('for')).toEqual(input.id);
    });

    it('should reference sbb-form-error', async () => {
      const input = await page.find('input');
      await page.waitForChanges();

      // When adding a sbb-form-error
      await page.evaluate(() => {
        const formError = document.createElement('sbb-form-error');
        document.querySelector('sbb-form-field').append(formError);
      });
      const formError = await page.find('sbb-form-error');
      await page.waitForChanges();

      // Then input should be linked and sbb-form-error configured
      expect(input.getAttribute('aria-describedby')).toMatch(/^sbb-form-field-error-/);
      expect(formError.id).toEqual(input.getAttribute('aria-describedby'));
      expect(formError.getAttribute('role')).toEqual('status');

      // When removing sbb-form-error
      await page.evaluate(() => {
        document.querySelector('sbb-form-error').remove();
      });
      await page.waitForChanges();

      // Then aria-describedby should be removed
      expect(input.getAttribute('aria-describedby')).toBeNull();
    });

    it('should reference sbb-form-error with original aria-describedby', async () => {
      const input = await page.find('input');
      await page.waitForChanges();
      await page.evaluate(() => {
        document.querySelector('input').setAttribute('aria-describedby', 'foo');
      });

      // When adding a sbb-form-error
      await page.evaluate(() => {
        const formError = document.createElement('sbb-form-error');
        document.querySelector('sbb-form-field').append(formError);
      });
      await page.waitForChanges();

      // Then input should be linked and original aria-describedby preserved
      expect(input.getAttribute('aria-describedby')).toMatch(/^foo sbb-form-field-error-/);

      // When removing sbb-form-error
      await page.evaluate(() => {
        document.querySelector('sbb-form-error').remove();
      });
      await page.waitForChanges();

      // Then aria-describedby should be set to foo
      expect(input.getAttribute('aria-describedby')).toBe('foo');
    });
  });

  describe('with sbb-select', () => {
    let element: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        '<sbb-form-field label="Example"><sbb-select><sbb-option>Test</sbb-option></sbb-select></sbb-form-field>',
      );

      element = await page.find('sbb-form-field');
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('should react to focus state', async () => {
      await page.waitForChanges();
      expect(element.getAttribute('data-input-focused')).toBeNull();

      await page.evaluate(() => document.querySelector('sbb-select').focus());
      await page.waitForChanges();
      expect(element.getAttribute('data-input-focused')).not.toBeNull();

      await page.evaluate(() =>
        (document.querySelector('.sbb-select-invisible-trigger') as HTMLDivElement).blur(),
      );
      await page.waitForChanges();
      expect(element.getAttribute('data-input-focused')).toBeNull();
    });

    it('should assign id to label and reference it in the sbb-select', async () => {
      element.setAttribute('label', 'Example');
      await page.waitForChanges();
      const select = await page.find('sbb-select');
      const label = await page.find('label');

      await page.waitForChanges();

      expect(label.id).toMatch(/^sbb-form-field-label-/);
      expect(select.getAttribute('aria-labelledby')).toEqual(label.id);
    });
  });

  describe('with floating label', () => {
    it('should read native empty select state', async () => {
      const page = await newE2EPage();
      await page.setContent(
        `
          <sbb-form-field floating-label>
            <select>
              <option value='0'></option>
              <option value='1'>Displayed Value</option>
            </select>
          </sbb-form-field>`,
      );

      const element = await page.find('sbb-form-field');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).not.toBeNull();
    });

    it('should not read native empty select state', async () => {
      const page = await newE2EPage();
      await page.setContent(
        `
          <sbb-form-field floating-label>
            <select>
              <option value='' selected>Empty Value</option>
              <option value='1'>Displayed Value</option>
            </select>
         </sbb-form-field>`,
      );

      const element = await page.find('sbb-form-field');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();
    });

    it('should never be empty if input type is date', async () => {
      const page = await newE2EPage();
      await page.setContent(`<sbb-form-field floating-label><input type="date"/></sbb-form-field>`);

      const element = await page.find('sbb-form-field');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();
    });

    it('should read sbb-select empty state', async () => {
      const page = await newE2EPage();
      await page.setContent(
        `
          <sbb-form-field floating-label>
            <sbb-select value='0'>
              <sbb-option value='0'></sbb-option>
              <sbb-option value='1'>Displayed Value</sbb-option>
            </sbb-select>
          </sbb-form-field>`,
      );

      const element = await page.find('sbb-form-field');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).not.toBeNull();
    });

    it('should not read sbb-select empty state', async () => {
      const page = await newE2EPage();
      await page.setContent(
        `
          <sbb-form-field floating-label>
            <sbb-select>
              <sbb-option value='' selected>Empty Value</sbb-option>
              <sbb-option value='1'>Displayed Value</sbb-option>
            </sbb-select>
          </sbb-form-field>`,
      );

      const element = await page.find('sbb-form-field');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();
    });

    it('should update floating label after clearing', async () => {
      const page = await newE2EPage();
      await page.setContent(
        `
          <sbb-form-field floating-label>
            <sbb-select>
              <sbb-option value='1' selected>Displayed Value</sbb-option>
            </sbb-select>
          </sbb-form-field>`,
      );

      const element = await page.find('sbb-form-field');
      await page.waitForChanges();

      (await page.find('sbb-select')).setProperty('value', '');
      await page.waitForChanges();

      expect(element.getAttribute('data-input-empty')).not.toBeNull();
    });

    it('should update floating label when resetting form', async () => {
      const page = await newE2EPage();
      await page.setContent(
        `
          <form>
            <sbb-form-field floating-label>
              <input />
            </sbb-form-field>
          </form>`,
      );

      const element = await page.find('sbb-form-field');
      await (await page.find('input')).type('test');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();

      await page.evaluate(() => document.querySelector('form').reset());
      await page.waitForChanges();

      expect(element.getAttribute('data-input-empty')).not.toBeNull();
    });

    it('should reset floating label when calling reset of sbb-form-field', async () => {
      const page = await newE2EPage();
      await page.setContent(
        `
          <sbb-form-field floating-label>
            <input />
          </sbb-form-field>
          `,
      );

      const element = await page.find('sbb-form-field');
      const input = await page.find('input');

      await input.type('test');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();

      // When setting value to empty
      await page.evaluate(() => (document.querySelector('input').value = ''));
      await page.waitForChanges();

      // Then empty state is not updated
      expect(element.getAttribute('data-input-empty')).toBeNull();

      // When manually calling reset method
      await element.callMethod('reset');
      await page.waitForChanges();

      // Then empty state should be updated
      expect(element.getAttribute('data-input-empty')).not.toBeNull();
    });
  });
});
