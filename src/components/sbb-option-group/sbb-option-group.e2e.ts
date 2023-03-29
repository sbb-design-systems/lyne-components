import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-option-group', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-option-group label="Group 1">
        <sbb-option id="option-1" value="option-1">Label 1</sbb-option>
        <sbb-option id="option-2" disabled value="option-2">Label 2</sbb-option>
        <sbb-option id="option-3" value="option-3">Label 3</sbb-option>
      </sbb-option-group>
    `);
    element = await page.find('sbb-option-group');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('disabled status is inherited', async () => {
    element.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('disabled', 'true');
    const optionOne = await page.find('sbb-option-group > sbb-option#option-1');
    expect(optionOne.getAttribute('data-group-disabled')).not.toBeNull();
    const optionTwo = await page.find('sbb-option-group > sbb-option#option-2');
    expect(optionTwo.getAttribute('data-group-disabled')).not.toBeNull();
    expect(optionTwo.getAttribute('disabled')).not.toBeNull();
    const optionThree = await page.find('sbb-option-group > sbb-option#option-3');
    expect(optionThree.getAttribute('data-group-disabled')).not.toBeNull();
    element.removeAttribute('disabled');
    await page.waitForChanges();
    expect(optionTwo.getAttribute('data-group-disabled')).toBeNull();
    expect(optionTwo.getAttribute('disabled')).not.toBeNull();
  });

  it('disabled status prevents changes', async () => {
    const optionOne = await page.find('sbb-option-group > sbb-option#option-1');
    const optionTwo = await page.find('sbb-option-group > sbb-option#option-2');
    const optionThree = await page.find('sbb-option-group > sbb-option#option-3');
    const options = [optionOne, optionTwo, optionThree];
    options.forEach((opt: E2EElement) => expect(opt).toEqualAttribute('selected', null));
    element.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(element).toEqualAttribute('disabled', 'true');
    for (const check of options) {
      await check.click();
      expect(check).toEqualAttribute('selected', null);
    }
    element.removeAttribute('disabled');
    await page.waitForChanges();
    for (const check of options) {
      await check.click();
    }
    expect(optionOne).toEqualAttribute('selected', '');
    expect(optionTwo).toEqualAttribute('selected', null);
    expect(optionThree).toEqualAttribute('selected', '');
  });
});
