import { assert, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';
import type { SbbToggleOption } from '../toggle-option';
import '../toggle-option';

import { SbbToggle } from './toggle';

describe('sbb-toggle', () => {
  let element: SbbToggle;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-toggle value="Value one">
        <sbb-toggle-option id="sbb-toggle-option-1" value="Value one">Value one</sbb-toggle-option>
        <sbb-toggle-option id="sbb-toggle-option-2" value="Value two">Value two</sbb-toggle-option>
      </sbb-toggle>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbToggle);
  });

  describe('events', () => {
    it('selects option on click', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      );
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

      expect(firstOption).to.have.attribute('checked');

      secondOption.click();
      await waitForLitRender(secondOption);
      await nextFrame();

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('selects option on checked attribute change', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      );
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      )!;

      expect(firstOption).to.have.attribute('checked');

      secondOption.setAttribute('checked', '');
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('dispatches event on option change', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      secondOption.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy.count).to.be.equal(1);

      firstOption.click();
      await waitForLitRender(firstOption);
      expect(firstOption).to.have.attribute('checked');
    });

    it('prevents selection with disabled state', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

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
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

      firstOption.focus();
      await sendKeys({ down: 'ArrowLeft' });
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy.count).to.be.equal(1);

      firstOption.click();
      await waitForLitRender(firstOption);

      expect(firstOption).to.have.attribute('checked');
    });

    it('selects option on right arrow key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

      firstOption.focus();
      await waitForLitRender(firstOption);
      await sendKeys({ down: 'ArrowRight' });
      await waitForLitRender(element);

      expect(secondOption).to.have.attribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy.count).to.be.equal(1);

      firstOption.click();
      await waitForLitRender(firstOption);

      expect(firstOption).to.have.attribute('checked');
    });
  });
});
