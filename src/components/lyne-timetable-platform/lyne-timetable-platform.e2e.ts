import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-platform', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-platform></lyne-timetable-platform>');

    element = await page.find('lyne-timetable-platform');
    expect(element)
      .toHaveClass('hydrated');
  });

});
