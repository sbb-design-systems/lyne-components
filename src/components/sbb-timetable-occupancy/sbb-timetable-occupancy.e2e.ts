import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { occupancySampleData } from './sbb-timetable-occupancy.sample-data';

describe('sbb-timetable-occupancy', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage({
      html: `<sbb-timetable-occupancy></sbb-timetable-occupancy>`,
    });
    element = await page.find('sbb-timetable-occupancy');
    element.setProperty('occupancy', occupancySampleData[9]);
    await page.waitForChanges();

    expect(element).toHaveClass('hydrated');
    expect(
      await page.evaluate(
        () =>
          getComputedStyle(
            document
              .querySelector('sbb-timetable-occupancy')
              .shadowRoot.querySelector('.sbb-timetable-occupancy__item--negative'),
          ).display,
      ),
    ).toBe('none');
    expect(
      await page.evaluate(
        () =>
          getComputedStyle(
            document
              .querySelector('sbb-timetable-occupancy')
              .shadowRoot.querySelector('.sbb-timetable-occupancy__item--high-contrast'),
          ).display,
      ),
    ).toBe('none');
  });
});
