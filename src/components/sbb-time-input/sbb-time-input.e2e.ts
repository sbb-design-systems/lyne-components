import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  let element: E2EElement, page: E2EPage, input: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-time-input input='input-1'></sbb-time-input>
      <input id='input-1' />
    `);
    await page.waitForChanges();

    element = await page.find('sbb-time-input');
    input = await page.find('input');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should configure native input', async () => {
    expect(input).toEqualAttribute('type', 'text');
    expect(input).toEqualAttribute('inputMode', 'numeric');
    expect(input).toEqualAttribute('maxLength', '5');
    expect(input).toEqualAttribute('placeholder', 'HH:MM');
    expect(input).toEqualAttribute('data-sbb-time-input', '');
  });

  it('should emit form events', async () => {
    const changeSpy = await element.spyOnEvent('change');
    const inputSpy = await element.spyOnEvent('input');
    await input.focus();
    await input.press('1');
    await input.press('Tab');
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEvent();
    expect(inputSpy).toHaveReceivedEvent();
  });

  it('should emit validation change event', async () => {
    let validationChangeSpy = await element.spyOnEvent('validationChange');

    // When entering 99
    await input.focus();
    await input.type('99');
    await input.press('Tab');

    // Then validation event should emit with false
    expect(validationChangeSpy).toHaveFirstReceivedEventDetail({ valid: false });
    expect(input).toHaveAttribute('data-sbb-invalid');

    // When adding another 9 (999)
    await input.focus();
    await input.press('9');
    await input.press('Tab');

    // Then validation event should not be emitted a second time
    expect(validationChangeSpy).toHaveReceivedEventTimes(1);
    expect(input).toHaveAttribute('data-sbb-invalid');

    // Reset event spy
    validationChangeSpy = await element.spyOnEvent('validationChange');

    // When deleting trailing two nines (convert value to 9 which is valid)
    await input.focus();
    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Tab');

    // Then validation event should be emitted with true
    expect(validationChangeSpy).toHaveFirstReceivedEventDetail({ valid: true });
    expect(input).not.toHaveAttribute('data-sbb-invalid');
  });

  it('should emit valid validation change event when empty', async () => {
    // Creating invalid entry
    await input.focus();
    await input.type('99');
    await input.press('Tab');
    await page.waitForChanges();

    const validationChangeSpy = await element.spyOnEvent('validationChange');

    // When deleting input to achieve empty input
    await input.focus();
    await input.press('Backspace');
    await input.press('Backspace');
    await input.press('Tab');

    // Then validation event should emit with true
    expect(validationChangeSpy).toHaveFirstReceivedEventDetail({ valid: true });
    expect(input).not.toHaveAttribute('data-sbb-invalid');
  });

  it('should interpret valid values', async () => {
    const testCases = [
      { value: '0', interpretedAs: '00:00' },
      { value: '1', interpretedAs: '01:00' },
      { value: '12', interpretedAs: '12:00' },
      { value: '123', interpretedAs: '01:23' },
      { value: '1.2', interpretedAs: '01:02' },
      { value: '1.12', interpretedAs: '01:12' },
      { value: '1,12', interpretedAs: '01:12' },
      { value: '1:12', interpretedAs: '01:12' },
      { value: '1h12', interpretedAs: '01:12' },
      { value: '1_12', interpretedAs: '01:12' },
      { value: '1;12', interpretedAs: '01:12' },
      { value: '1-12', interpretedAs: '01:12' },
      { value: '01:12', interpretedAs: '01:12' },
      { value: '12:', interpretedAs: '12:00' },
      { value: '12.3', interpretedAs: '12:03' },
      { value: ':00', interpretedAs: '00:00' },
      { value: ':01', interpretedAs: '00:01' },
      { value: ':1', interpretedAs: '00:01' },
      { value: 'h', interpretedAs: '00:00' },
      { value: '.', interpretedAs: '00:00' },
      { value: ':', interpretedAs: '00:00' },
    ];

    for (const testCase of testCases) {
      // Clear input
      await page.evaluate(
        () => ((document.getElementById('input-1') as HTMLInputElement).value = ''),
      );

      await input.type(testCase.value);
      await input.press('Tab');
      expect(await input.getProperty('value')).toEqual(testCase.interpretedAs);
    }
  });

  it('should not touch invalid values', async () => {
    const testCases = [
      { value: '99', interpretedAs: '99' },
      { value: '24', interpretedAs: '24' },
      { value: 'hh', interpretedAs: 'hh' },
      { value: '', interpretedAs: '' },
      { value: '00:56', interpretedAs: '00:56' },
    ];

    for (const testCase of testCases) {
      // Clear input
      await page.evaluate(
        () => ((document.getElementById('input-1') as HTMLInputElement).value = ''),
      );

      await input.type(testCase.value);
      await input.press('Tab');
      expect(await input.getProperty('value')).toEqual(testCase.interpretedAs);
    }
  });

  it('should prevent char insertion', async () => {
    await input.press('1');

    // Inserting invalid key
    await input.press('V');

    expect(await input.getProperty('value')).toEqual('1');
  });

  it('should handle deletion', async () => {
    await page.evaluate(
      () => ((document.getElementById('input-1') as HTMLInputElement).value = '12:00'),
    );

    await page.waitForChanges();
    await input.press('Home');
    await input.press('Delete');
    await input.press('Delete');

    expect(await input.getProperty('value')).toEqual(':00');
    await input.press('Enter');
    expect(await input.getProperty('value')).toEqual('00:00');
  });

  it('should set and get value as a date', async () => {
    const blurSpy = await input.spyOnEvent('blur');
    const date = new Date('2023-01-01T15:00:00');

    await element.callMethod('setValueAsDate', date);
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('15:00');
    expect(blurSpy).toHaveReceivedEventTimes(1);

    const dateCalculated = await page.evaluate(async () => {
      const timeInput = document.getElementsByTagName('sbb-time-input')[0];
      return (await timeInput.getValueAsDate()).getTime();
    });
    expect(new Date(dateCalculated).getHours()).toEqual(date.getHours());
    expect(new Date(dateCalculated).getMinutes()).toEqual(date.getMinutes());
  });

  it('should set and get value as a date (string)', async () => {
    const date = new Date('2023-01-01T15:00:00');

    await element.callMethod('setValueAsDate', date.toISOString());
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual('15:00');

    const dateCalculated = await page.evaluate(async () => {
      const timeInput = document.getElementsByTagName('sbb-time-input')[0];
      return (await timeInput.getValueAsDate()).getTime();
    });
    expect(new Date(dateCalculated).getHours()).toEqual(date.getHours());
    expect(new Date(dateCalculated).getMinutes()).toEqual(date.getMinutes());
  });

  it('should work with sbb-form-field', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <sbb-time-input></sbb-time-input>
        <input/>
      </sbb-form-field>
    `);
    await page.waitForChanges();

    element = await page.find('sbb-time-input');
    input = await page.find('input');

    await element.callMethod('setValueAsDate', '2023-01-01T15:00:00');
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual('15:00');
  });

  it('should support asynchronously adding input by element reference', async () => {
    page = await newE2EPage();
    await page.setContent(`
        <sbb-time-input id="time-input"></sbb-time-input>
        <input id="input" />
    `);
    await page.waitForChanges();

    element = await page.find('sbb-time-input');
    input = await page.find('input');

    await page.evaluate(() => {
      const timeInput = document.getElementById('time-input') as HTMLSbbTimeInputElement;
      timeInput.input = document.getElementById('input');
    });

    await element.callMethod('setValueAsDate', '2023-01-01T15:00:00');
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual('15:00');
  });

  it('should support asynchronously adding input by id', async () => {
    page = await newE2EPage();
    await page.setContent(`
        <sbb-time-input id="time-input"></sbb-time-input>
        <input id="input" />
    `);
    await page.waitForChanges();
    element = await page.find('sbb-time-input');
    input = await page.find('input');

    element.setProperty('input', 'input');

    await element.callMethod('setValueAsDate', '2023-01-01T15:00:00');
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual('15:00');
  });
});
