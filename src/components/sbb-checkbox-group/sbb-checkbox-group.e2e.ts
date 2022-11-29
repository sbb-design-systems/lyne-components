import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-checkbox-group>
        <sbb-checkbox id="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox id="checkbox-2" disabled value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox id="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);
    element = await page.find('sbb-checkbox-group');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('disabled status is inherited', async () => {
    element.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('disabled', 'true');
    const checkboxOne = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-1');
    expect(checkboxOne.getAttribute('data-group-disabled')).not.toBeNull();
    const checkboxTwo = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-2');
    expect(checkboxTwo.getAttribute('data-group-disabled')).not.toBeNull();
    expect(checkboxTwo.getAttribute('disabled')).not.toBeNull();
    const checkboxThree = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-3');
    expect(checkboxThree.getAttribute('data-group-disabled')).not.toBeNull();
    element.removeAttribute('disabled');
    await page.waitForChanges();
    expect(checkboxTwo.getAttribute('data-group-disabled')).toBeNull();
    expect(checkboxTwo.getAttribute('disabled')).not.toBeNull();
  });

  it('disabled status prevents changes', async () => {
    const checkboxOne = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-1');
    const checkboxTwo = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-2');
    const checkboxThree = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-3');
    const checkboxes = [checkboxOne, checkboxTwo, checkboxThree];
    checkboxes.forEach((check: E2EElement) => expect(check).toEqualAttribute('checked', null));
    element.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('disabled', 'true');
    for (const check of checkboxes) {
      await check.click();
      expect(check).toEqualAttribute('checked', null);
    }
    element.removeAttribute('disabled');
    await page.waitForChanges();
    for (const check of checkboxes) {
      await check.click();
    }
    expect(checkboxOne).toEqualAttribute('checked', '');
    expect(checkboxTwo).toEqualAttribute('checked', null);
    expect(checkboxThree).toEqualAttribute('checked', '');
  });

  it('required status', async () => {
    element.setAttribute('required', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('required', 'true');
    const checkboxOne = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-1');
    expect(checkboxOne.getAttribute('data-group-required')).not.toBeNull();
    const checkboxTwo = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-2');
    expect(checkboxTwo.getAttribute('data-group-required')).not.toBeNull();
    const checkboxThree = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-3');
    expect(checkboxThree.getAttribute('data-group-required')).not.toBeNull();
  });
});
