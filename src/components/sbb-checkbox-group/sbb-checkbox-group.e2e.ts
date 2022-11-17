import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-checkbox-group>
        <sbb-checkbox id="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox id="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox id="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);
    element = await page.find('sbb-checkbox-group');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('disabled status', async () => {
    element.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('disabled', 'true');
    const checkboxOne = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-1');
    expect(checkboxOne.getAttribute('data-disabled')).not.toBeNull();
    const checkboxTwo = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-2');
    expect(checkboxTwo.getAttribute('data-disabled')).not.toBeNull();
    const checkboxThree = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-3');
    expect(checkboxThree.getAttribute('data-disabled')).not.toBeNull();
  });

  it('required status', async () => {
    element.setAttribute('required', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('required', 'true');
    const checkboxOne = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-1');
    expect(checkboxOne.getAttribute('data-required')).not.toBeNull();
    const checkboxTwo = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-2');
    expect(checkboxTwo.getAttribute('data-required')).not.toBeNull();
    const checkboxThree = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-3');
    expect(checkboxThree.getAttribute('data-required')).not.toBeNull();
  });
});
