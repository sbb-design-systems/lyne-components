import { newE2EPage } from '@stencil/core/testing';

describe('lyne-timetable-transportation-walk', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-timetable-transportation-walk></lyne-timetable-transportation-walk>');

    element = await page.find('lyne-timetable-transportation-walk');
    expect(element)
      .toHaveClass('hydrated');
  });

});
