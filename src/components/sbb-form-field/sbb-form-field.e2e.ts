// FIXME slotchange is not triggered, see https://github.com/ionic-team/stencil/issues/3536
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

    it('should assign id to input and reference it in the label', async () => {
      element.setAttribute('label', 'Example');
      await page.waitForChanges();
      const input = await page.find('input');
      const label = await page.find('label');

      await page.waitForChanges();

      expect(input.id).toMatch(/^sbb-form-field-input-/);
      expect(label.getAttribute('for')).toEqual(input.id);
    });
  });

  describe('with sbb-select', () => {
    let element: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        '<sbb-form-field label="Example"><sbb-select><sbb-option>Test</sbb-option></sbb-select></sbb-form-field>'
      );

      element = await page.find('sbb-form-field');
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
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
        </sbb-form-field>`
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
         </sbb-form-field>`
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
          </sbb-form-field>`
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
          </sbb-form-field>`
      );

      const element = await page.find('sbb-form-field');
      await page.waitForChanges();
      expect(element.getAttribute('data-input-empty')).toBeNull();
    });
  });
});
