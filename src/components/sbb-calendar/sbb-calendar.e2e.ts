import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-calendar', () => {
  const selected = new Date(2023, 0, 15).getTime() / 1000;
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `<sbb-calendar selected-date="${selected}"></sbb-calendar>`,
    });
    element = await page.find('sbb-calendar');
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('highlights current day', async () => {
    page = await newE2EPage({
      html: `<sbb-calendar></sbb-calendar>`,
    });

    const today = new Date();
    const currentDay = `${today.getDate()} ${today.getMonth() + 1} ${today.getFullYear()}`;
    const currentDayButton = await page.find(`sbb-calendar >>> button[data-day="${currentDay}"]`);
    expect(currentDayButton).toHaveClass('sbb-calendar__day-today');
  });

  it('renders and navigates to next month', async () => {
    let days = await page.findAll('sbb-calendar >>> .sbb-calendar__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-next');
    await nextMonthButton.click();
    await page.waitForChanges();

    days = await page.findAll('sbb-calendar >>> .sbb-calendar__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 2 2023');
  });

  it('renders and navigates to previous month', async () => {
    let day = await page.find('sbb-calendar >>> .sbb-calendar__day');
    expect(await day.getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-previous');
    await nextMonthButton.click();
    await page.waitForChanges();

    day = await page.find('sbb-calendar >>> .sbb-calendar__day');
    expect(await day.getAttribute('data-day')).toEqual('1 12 2022');
  });

  it('sets max and next month button gets disabled', async () => {
    await element.setProperty('max', 1674946800);
    await page.waitForChanges();

    let days = await page.findAll('sbb-calendar >>> .sbb-calendar__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-next');
    expect(nextMonthButton).toHaveAttribute('disabled');
    await nextMonthButton.click();
    await page.waitForChanges();

    days = await page.findAll('sbb-calendar >>> .sbb-calendar__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');
  });

  it('sets min and previous month button gets disabled', async () => {
    await element.setProperty('min', 1673737200);
    await page.waitForChanges();

    let days = await page.findAll('sbb-calendar >>> .sbb-calendar__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-previous');
    expect(nextMonthButton).toHaveAttribute('disabled');
    await nextMonthButton.click();
    await page.waitForChanges();

    days = await page.findAll('sbb-calendar >>> .sbb-calendar__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');
  });

  it('selects a different date', async () => {
    const selectedSpy = await page.spyOnEvent('date-selected');
    await page.waitForChanges();

    const selectedDate = await page.find('sbb-calendar >>> button[data-day="15 1 2023"]');
    expect(selectedDate).toHaveClass('sbb-calendar__day-selected');

    const newSelectedDate = await page.find('sbb-calendar >>> button[data-day="18 1 2023"]');
    expect(newSelectedDate).not.toHaveClass('sbb-calendar__day-selected');
    await newSelectedDate.click();
    await page.waitForChanges();

    expect(selectedDate).not.toHaveClass('sbb-calendar__day-selected');
    expect(newSelectedDate).toHaveClass('sbb-calendar__day-selected');
    expect(selectedSpy).toHaveReceivedEvent();
  });

  it("clicks on disabled day and doesn't change selection", async () => {
    const selectedSpy = await page.spyOnEvent('date-selected');

    await element.setProperty('max', 1674946800);
    await page.waitForChanges();

    const day = await page.find('sbb-calendar >>> button[data-day="30 1 2023"]');
    expect(day).toHaveAttribute('disabled');
    expect(day).not.toHaveClass('sbb-calendar__day-selected');
    await day.click();
    await page.waitForChanges();

    expect(day).not.toHaveClass('sbb-calendar__day-selected');
    expect(selectedSpy).not.toHaveReceivedEvent();
  });
});
