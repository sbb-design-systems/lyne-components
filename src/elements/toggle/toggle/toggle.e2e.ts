import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbToggleOptionElement } from '../toggle-option.js';

import { SbbToggleElement } from './toggle.js';

import '../toggle-option.js';

describe(`sbb-toggle with ${fixture.name}`, () => {
  let element: SbbToggleElement,
    firstOption: SbbToggleOptionElement,
    secondOption: SbbToggleOptionElement;

  beforeEach(async () => {
    element = await fixture(
      html`
        <sbb-toggle value="Value one">
          <sbb-toggle-option id="sbb-toggle-option-1" value="Value one">
            Value one
          </sbb-toggle-option>
          <sbb-toggle-option id="sbb-toggle-option-2" value="Value two">
            Value two
          </sbb-toggle-option>
        </sbb-toggle>
      `,
      { modules: ['./toggle.ts', '../toggle-option.ts'] },
    );
    firstOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-1')!;
    secondOption = element.querySelector<SbbToggleOptionElement>('#sbb-toggle-option-2')!;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbToggleElement);
  });

  describe('events', () => {
    it('selects option on click', async () => {
      expect(firstOption).to.have.attribute('checked');

      secondOption.click();
      await waitForLitRender(secondOption);

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('selects option on checked attribute change', async () => {
      expect(firstOption).to.have.attribute('checked');

      secondOption.toggleAttribute('checked', true);
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('selects option on checked property change', async () => {
      expect(firstOption.checked).to.equal(true);

      secondOption.checked = true;
      await waitForLitRender(element);

      expect(firstOption.checked).to.equal(false);
      expect(secondOption.checked).to.equal(true);
    });

    it('dispatches event on option change', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      let valueInEvent;

      // Checking value in events of EventSpy is too late to check the real use case,
      // therefore we create a once-EventListener manually here.
      element.addEventListener(
        'change',
        (event) => (valueInEvent = (event.target as SbbToggleElement).value),
        { once: true },
      );

      secondOption.click();
      await waitForLitRender(firstOption);
      await waitForCondition(() => changeSpy.events.length === 1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(valueInEvent).to.equal('Value two');

      // Checking value in events of EventSpy is too late to check the real use case,
      // therefore we create a once-EventListener manually here.
      element.addEventListener(
        'change',
        (event) => (valueInEvent = (event.target as SbbToggleElement).value),
        { once: true },
      );

      firstOption.click();
      await waitForLitRender(firstOption);
      await waitForCondition(() => changeSpy.events.length === 2);
      await waitForCondition(() => inputSpy.events.length === 2);

      expect(firstOption).to.have.attribute('checked');
      expect(valueInEvent).to.equal('Value one');
    });

    it('prevents selection with disabled state', async () => {
      element.disabled = true;
      await waitForLitRender(element);

      await secondOption.click();
      await waitForLitRender(element);
      expect(secondOption).not.to.have.attribute('checked');
      expect(firstOption).to.have.attribute('checked');

      element.disabled = false;
      await waitForLitRender(element);

      await secondOption.click();
      await waitForLitRender(element);
      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('selects option on left arrow key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      firstOption.focus();
      await sendKeys({ down: 'ArrowLeft' });
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      await waitForCondition(() => inputSpy.events.length === 1);

      firstOption.click();
      await waitForLitRender(firstOption);

      expect(firstOption).to.have.attribute('checked');
    });

    it('selects option on right arrow key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      firstOption.focus();
      await waitForLitRender(firstOption);
      await sendKeys({ down: 'ArrowRight' });
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      await waitForCondition(() => inputSpy.events.length === 1);

      firstOption.click();
      await waitForLitRender(firstOption);

      expect(firstOption).to.have.attribute('checked');
    });
  });
});
