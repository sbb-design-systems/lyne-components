import { newE2EPage } from '@stencil/core/testing';

describe('sbb-timetable-row-button', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-timetable-row-button></sbb-timetable-row-button>');

    element = await page.find('sbb-timetable-row-button');
    expect(element).toHaveClass('hydrated');
  });
});
