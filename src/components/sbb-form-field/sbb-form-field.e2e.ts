// FIXME slotchange is not triggered, see https://github.com/ionic-team/stencil/issues/3536
import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-form-field', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-form-field><input/></sbb-form-field>');

    element = await page.find('sbb-form-field');
    expect(element).toHaveClass('hydrated');
  });

  it('should remove the label element if no label is configured', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <input slot="input"/>
      </sbb-form-field>
    `);

    expect(await page.findAll('sbb-form-field >>> label')).toEqual([]);

    element = await page.find('sbb-form-field');
    expect(element.shadowRoot.querySelector('label')).toBeNull();
    element.setAttribute('label', 'Label');
    await page.waitForChanges();
    expect(element.shadowRoot.querySelector('label')).not.toBeNull();
  });
});
