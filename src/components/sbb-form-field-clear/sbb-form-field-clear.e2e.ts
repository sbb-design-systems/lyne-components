import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-form-field-clear', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field label="Label">
        <input id="input" type="text" placeholder="Input placeholder" value="Input value" />
        <sbb-form-field-clear />
      </sbb-form-field>`);

    element = await page.find('sbb-form-field-clear');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('clears the value and sets the focus on the input', async () => {
    await page.waitForChanges();
    expect(await page.evaluate(() => document.querySelector('input').value)).toBe('Input value');

    await element.click();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.querySelector('input').value)).toBeFalsy();
    expect(await page.evaluate(() => document.activeElement.id)).toBe('input');
    expect(
      await page.evaluate(
        () => getComputedStyle(document.querySelector('sbb-form-field-clear')).display,
      ),
    ).toBe('none');
  });

  it('is hidden if the form field is disabled', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field label="Label">
        <input id="input" type="text" placeholder="Input placeholder" value="Input value" disabled />
        <sbb-form-field-clear />
      </sbb-form-field>`);

    element = await page.find('sbb-form-field-clear');
    await page.waitForChanges();

    expect(
      await page.evaluate(
        () => getComputedStyle(document.querySelector('sbb-form-field-clear')).display,
      ),
    ).toBe('none');
  });

  it('is hidden if the form field is readonly', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field label="Label">
        <input id="input" type="text" placeholder="Input placeholder" value="Input value" readonly />
        <sbb-form-field-clear />
      </sbb-form-field>`);

    element = await page.find('sbb-form-field-clear');
    await page.waitForChanges();

    expect(
      await page.evaluate(
        () => getComputedStyle(document.querySelector('sbb-form-field-clear')).display,
      ),
    ).toBe('none');
  });
});
