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

  it('marks slotted elements', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <span slot="label">Label</span>
        <input />
      </sbb-form-field>
    `);

    element = await page.find('sbb-form-field');
    const labelSpan = await element.find('span');
    expect(labelSpan).toHaveAttribute('data-slot-context');
    expect(labelSpan.getAttribute('data-slot-context')).toEqual('sbb-form-field/label');
    const input = await element.find('input');
    expect(input.getAttribute('data-slot-context')).toEqual('sbb-form-field');

    const slotContext = await page.evaluate(async () => {
      const input = document.querySelector('sbb-form-field input') as HTMLInputElement;
      input.setAttribute('disabled', '');
      await new Promise((r) => setTimeout(r));
      return input.dataset.slotContext;
    });
    await page.evaluate(() => new Promise((r) => setTimeout(r)));
    expect(slotContext).toEqual('sbb-form-field/disabled');
    expect((await element.find('span')).getAttribute('data-slot-context')).toEqual(
      'sbb-form-field/label/disabled'
    );
  });
});
