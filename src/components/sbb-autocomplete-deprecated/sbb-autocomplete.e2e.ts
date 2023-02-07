import { newE2EPage } from '@stencil/core/testing';
import sampleData from './sbb-autocomplete.sample-data';

describe('sbb-autocomplete', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-autocomplete-deprecated
        items='${sampleData}'
        inputName='test-input'
        inputLabel='input-label'
      ></sbb-autocomplete-deprecated>`);

    element = await page.find('sbb-autocomplete-deprecated');
    expect(element).toHaveClass('hydrated');
  });
});
