import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-radio-button-group', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
    <sbb-radio-button-group name="radio-group-name" value="Value one">
        <sbb-radio-button id="sbb-radio-1" value="Value one">Value one</sbb-radio-button>
        <sbb-radio-button id="sbb-radio-2" value="Value two">Value two</sbb-radio-button>
        <sbb-radio-button id="sbb-radio-3" value="Value three" disabled>Value three</sbb-radio-button>
        <sbb-radio-button id="sbb-radio-4" value="Value four">Value four</sbb-radio-button>
      </sbb-radio-button-group>
    `);
    element = await page.find('sbb-radio-button-group');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('events', () => {
    it('selects radio on click', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');
      const radio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-2');

      expect(firstRadio).toHaveAttribute('checked');

      await radio.click();

      expect(radio).toHaveAttribute('checked');
      expect(firstRadio).not.toHaveAttribute('checked');
    });

    it('dispatches event on radio change', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');
      const checkedRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-2');
      const changeSpy = await page.spyOnEvent('change');
      const inputSpy = await page.spyOnEvent('input');

      await checkedRadio.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy).toHaveReceivedEventTimes(1);

      await firstRadio.click();
      expect(firstRadio).toHaveAttribute('checked');
    });

    it('does not select disabled radio on click', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');
      const disabledRadio = await page.find(
        'sbb-radio-button-group > sbb-radio-button#sbb-radio-3',
      );

      await disabledRadio.click();
      await page.waitForChanges();

      expect(disabledRadio).not.toHaveAttribute('checked');
      expect(firstRadio).toHaveAttribute('checked');
    });

    it('preserves radio button disabled state after being disabled from group', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');
      const secondRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-2');
      const disabledRadio = await page.find(
        'sbb-radio-button-group > sbb-radio-button#sbb-radio-3',
      );

      element.setProperty('disabled', true);
      await page.waitForChanges();

      await disabledRadio.click();
      await page.waitForChanges();
      expect(disabledRadio).not.toHaveAttribute('checked');
      expect(firstRadio).toHaveAttribute('checked');

      await secondRadio.click();
      await page.waitForChanges();
      expect(secondRadio).not.toHaveAttribute('checked');

      element.setProperty('disabled', false);
      await page.waitForChanges();

      await disabledRadio.click();
      await page.waitForChanges();
      expect(disabledRadio).not.toHaveAttribute('checked');
      expect(firstRadio).toHaveAttribute('checked');
    });

    it('selects radio on left arrow key pressed', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');

      await firstRadio.click();
      await page.keyboard.down('ArrowLeft');

      await page.waitForChanges();
      const radio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-4');

      expect(radio).toHaveAttribute('checked');

      await firstRadio.click();
      await page.waitForChanges();

      expect(firstRadio).toHaveAttribute('checked');
    });

    it('selects radio on right arrow key pressed', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');

      await firstRadio.click();
      await page.keyboard.down('ArrowRight');

      await page.waitForChanges();
      const radio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-2');

      expect(radio).toHaveAttribute('checked');

      await firstRadio.click();
      await page.waitForChanges();

      expect(firstRadio).toHaveAttribute('checked');
    });

    it('wraps around on arrow key navigation', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');
      const checkedRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-2');

      await checkedRadio.click();
      await page.waitForChanges();
      expect(checkedRadio).toHaveAttribute('checked');

      await page.keyboard.down('ArrowRight');
      await page.keyboard.down('ArrowRight');

      await page.waitForChanges();
      const radio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');

      expect(radio).toHaveAttribute('checked');

      await firstRadio.click();
      await page.waitForChanges();

      expect(firstRadio).toHaveAttribute('checked');
    });

    it('sets the value correctly on slot change', async () => {
      const firstRadio = await page.find('sbb-radio-button-group > sbb-radio-button#sbb-radio-1');

      expect(firstRadio).toHaveAttribute('checked');
      expect(await element.getProperty('value')).toBe('Value one');

      await page.evaluate(() => {
        const newRadios = ['New radio one', 'New radio two'];
        const radioGroup = document.querySelector('sbb-radio-button-group');

        // Remove all the radio buttons
        while (radioGroup.firstChild) {
          radioGroup.removeChild(radioGroup.firstChild);
        }

        // Add two new radios
        newRadios.forEach(async (radio, i) => {
          const newRadio = document.createElement('SBB-RADIO-BUTTON') as HTMLSbbRadioButtonElement;
          newRadio.innerText = radio;
          newRadio.value = radio;
          newRadio.checked = i === 0;
          radioGroup.appendChild(newRadio);
        });
      });

      expect(await element.getProperty('value')).toBe('New radio one');
    });
  });
});
