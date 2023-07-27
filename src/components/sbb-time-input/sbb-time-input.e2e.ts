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

  it('should interpret valid values', async () => {
    const testCases = [
      { value: '0', interpretedAs: '00:00' },
      { value: '1', interpretedAs: '01:00' },
      { value: '12', interpretedAs: '12:00' },
      { value: '123', interpretedAs: '01:23' },
      { value: '1.12', interpretedAs: '01:12' },
      { value: '1,12', interpretedAs: '01:12' },
      { value: '1:12', interpretedAs: '01:12' },
      { value: '1h12', interpretedAs: '01:12' },
      { value: '1_12', interpretedAs: '01:12' },
      { value: '1;12', interpretedAs: '01:12' },
      { value: '1-12', interpretedAs: '01:12' },
      { value: '01:12', interpretedAs: '01:12' },
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

  it('should watch for valueAsDate changes', async () => {
    await element.callMethod('setValueAsDate', '2023-01-01T15:00:00');
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual('15:00');
  });
});
