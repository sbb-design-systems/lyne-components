import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-checkbox-group>
        <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox name="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox name="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);

    element = await page.find('sbb-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });

  it('renders disabled children', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-checkbox-group disabled>
        <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
      </sbb-checkbox-group>
    `);

    element = await page.find('sbb-checkbox-group');
    expect(element).toHaveClass('hydrated');
    await page.waitForChanges();
    const check = await page.find('sbb-checkbox');
    expect(check.getAttribute('disabled')).not.toBeNull();
  });

  it('renders required children', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-checkbox-group required>
        <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
      </sbb-checkbox-group>
    `);

    element = await page.find('sbb-checkbox-group');
    expect(element).toHaveClass('hydrated');
    await page.waitForChanges();
    const check = await page.find('sbb-checkbox');
    expect(check.getAttribute('required')).not.toBeNull();
  });
});
