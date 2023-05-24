// FIXME slotchange is not triggered, see https://github.com/ionic-team/stencil/issues/3536
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-form-field', () => {
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
});
