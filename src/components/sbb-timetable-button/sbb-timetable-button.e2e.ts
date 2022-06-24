import { newE2EPage } from '@stencil/core/testing';

describe('sbb-timetable-button', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-timetable-button></sbb-timetable-button>');

    element = await page.find('sbb-timetable-button');
    expect(element).toHaveClass('hydrated');
  });
});
