import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-optgroup', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-optgroup label="Group 1">
        <sbb-option id="option-1" value="option-1">Label 1</sbb-option>
        <sbb-option id="option-2" disabled value="option-2">Label 2</sbb-option>
        <sbb-option id="option-3" value="option-3">Label 3</sbb-option>
      </sbb-optgroup>
    `);
    element = await page.find('sbb-optgroup');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('disabled status is inherited', async () => {
    element.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('disabled', 'true');
  });
});
