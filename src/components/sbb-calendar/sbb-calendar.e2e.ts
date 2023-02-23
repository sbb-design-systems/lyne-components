import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-calendar', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `<sbb-calendar selected-date="1673737200"></sbb-calendar>`,
    });
    element = await page.find('sbb-calendar');
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
    expect(currentDayButton).toHaveClass('sbb-datepicker__day-today');
  });

  it('renders and navigates to next month', async () => {
    let days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-next');
    nextMonthButton.click();
    await page.waitForChanges();

    days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 2 2023');
  });

  it('renders and navigates to previous month', async () => {
    let days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-previous');
    nextMonthButton.click();
    await page.waitForChanges();

    days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 12 2022');
  });

  it('sets max and next month button gets disabled', async () => {
    await element.setProperty('max', 1674946800);
    await page.waitForChanges();

    let days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-next');
    expect(nextMonthButton).toHaveAttribute('disabled');
    nextMonthButton.click();
    await page.waitForChanges();

    days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');
  });

  it('sets min and previous month button gets disabled', async () => {
    await element.setProperty('min', 1673737200);
    await page.waitForChanges();

    let days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');

    const nextMonthButton = await page.find('sbb-calendar >>> #sbb-calendar__controls-previous');
    expect(nextMonthButton).toHaveAttribute('disabled');
    nextMonthButton.click();
    await page.waitForChanges();

    days = await page.findAll('sbb-calendar >>> .sbb-datepicker__day');
    expect(await days[0].getAttribute('data-day')).toEqual('1 1 2023');
  });

  it('selects a different date', async () => {
    const selectedSpy = await page.spyOnEvent('date-selected');

    const selectedDate = await page.find('sbb-calendar >>> .sbb-datepicker__day-selected');
    expect(await selectedDate.getAttribute('data-day')).toEqual('15 1 2023');

    const newSelectedDate = await page.find('sbb-calendar >>> button[data-day="18 1 2023"]');
    expect(newSelectedDate).not.toHaveClass('sbb-datepicker__day-selected');
    newSelectedDate.click();
    await page.waitForChanges();

    expect(selectedDate).not.toHaveClass('sbb-datepicker__day-selected');
    expect(newSelectedDate).toHaveClass('sbb-datepicker__day-selected');
    expect(selectedSpy).toHaveReceivedEvent();
  });

  it("clicks on disabled day and doesn't change selection", async () => {
    const selectedSpy = await page.spyOnEvent('date-selected');

    await element.setProperty('max', 1674946800);
    await page.waitForChanges();

    const day = await page.find('sbb-calendar >>> button[data-day="30 1 2023"]');
    expect(day).toHaveAttribute('disabled');
    expect(day).not.toHaveClass('sbb-datepicker__day-selected');
    day.click();
    await page.waitForChanges();

    expect(day).not.toHaveClass('sbb-datepicker__day-selected');
    expect(selectedSpy).not.toHaveReceivedEvent();
  });
});
