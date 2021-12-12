import { newE2EPage } from '@stencil/core/testing';
import sampleData from './lyne-autocomplete.sample-data';

describe('lyne-autocomplete', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <lyne-autocomplete
        items='${sampleData}'
        inputName='test-input'
        inputLabel='input-label'
      ></lyne-autocomplete>`);

    element = await page.find('lyne-autocomplete');
    expect(element)
      .toHaveClass('hydrated');
  });

});
