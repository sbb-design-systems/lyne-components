import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-form-journey', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-form-journey></lyne-timetable-form-journey>');

    element = await page.find('lyne-timetable-form-journey');
    expect(element)
      .toHaveClass('hydrated');
  });

});
