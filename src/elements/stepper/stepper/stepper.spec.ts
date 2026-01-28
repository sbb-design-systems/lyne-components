import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture, tabKey } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import { SbbStepElement } from '../step/step.component.ts';
import type { SbbStepLabelElement } from '../step-label.ts';

import { SbbStepChangeEvent, SbbStepperElement } from './stepper.component.ts';

import '../step-label.ts';
import '../step.ts';

describe('sbb-stepper', () => {
  let element: SbbStepperElement;
  const elementInternals = elementInternalsSpy();

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-stepper>
        <sbb-step-label>Step 1</sbb-step-label>
        <sbb-step>
          <div tabindex="0" id="step-one-content">Step one content.</div>
          <button sbb-stepper-next id="next-button-1">Next</button>
        </sbb-step>

        <sbb-step-label>Step 2</sbb-step-label>
        <sbb-step>
          <div tabindex="0">Step two content.</div>
          <button sbb-stepper-next>Next</button>
          <span sbb-stepper-previous>Back</span>
        </sbb-step>

        <sbb-step-label>Step 3</sbb-step-label>
        <sbb-step>
          <div tabindex="0">Step three content.</div>
          <span sbb-stepper-previous>Back</span>
        </sbb-step>

        <sbb-step-label disabled>Step 4</sbb-step-label>
        <sbb-step> <div tabindex="0">Step four content.</div> </sbb-step>
      </sbb-stepper>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStepperElement);
  });

  it("updates stepper's height if the step content changes", async () => {
    // the starting height of the stepper should not be zero
    const baseHeight = getComputedStyle(element)
      .getPropertyValue('--sbb-stepper-content-height')
      .replaceAll('px', '');
    expect(+baseHeight).not.to.be.equal(0);

    const stepOne = element.querySelector<SbbStepElement>('sbb-step:nth-of-type(1)')!;
    const resizeChangeSpy = new EventSpy(SbbStepElement.events.resizechange, element);
    const addedHeight = 200;

    const div = document.createElement('div');
    div.innerText = 'Content dynamically added.';
    div.style.cssText = `display: block; height: ${addedHeight}px;`;
    stepOne.appendChild(div);
    await waitForLitRender(element);
    await resizeChangeSpy.calledOnce();
    expect(resizeChangeSpy.count).to.be.equal(1);

    const newHeight = getComputedStyle(element).getPropertyValue('--sbb-stepper-content-height');
    expect(newHeight).to.be.equal(`${+baseHeight + addedHeight}px`);
  });

  it('selects the first step by default', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;

    await waitForLitRender(element);
    expect(stepLabelOne).to.match(':state(selected)');
  });

  it('selects the correct step on label click and emits validate and stepchange events', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);
    const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
      SbbStepperElement.events.stepchange,
      element,
    );

    stepLabelThree.focus();
    stepLabelThree.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    await stepChangeSpy.calledOnce();
    expect(stepChangeSpy.count).to.be.equal(1);

    const event = stepChangeSpy.lastEvent;
    expect(event).to.be.instanceOf(SbbStepChangeEvent);
    expect(event!.selectedIndex).to.be.equal(2);
    expect(event!.previousIndex).to.be.equal(0);
    expect(event!.selectedStep).to.be.equal(stepLabelThree.step);
    expect(event!.previousStep).to.be.equal(element.steps[0]);

    expect(stepLabelThree).to.match(':state(selected)');
    expect(stepLabelThree.step).to.match(':state(selected)');
    expect(document.activeElement!.id).to.be.equal(stepLabelThree.id);
  });

  it('selects the correct step via `selected` and emits validate and stepchange events', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);
    const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
      SbbStepperElement.events.stepchange,
      element,
    );
    element.selected = stepLabelThree.step!;
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    await stepChangeSpy.calledOnce();
    expect(stepChangeSpy.count).to.be.equal(1);

    const event = stepChangeSpy.lastEvent;
    expect(event).to.be.instanceOf(SbbStepChangeEvent);
    expect(event!.selectedIndex).to.be.equal(2);
    expect(event!.previousIndex).to.be.equal(0);
    expect(event!.selectedStep).to.be.equal(stepLabelThree.step);
    expect(event!.previousStep).to.be.equal(element.steps[0]);

    expect(stepLabelThree).to.match(':state(selected)');
    expect(stepLabelThree.step).to.match(':state(selected)');
    expect(document.activeElement!.id).not.to.be.equal(stepLabelThree.id);
  });

  it('selects the correct step via `selectedIndex` and emits validate and stepchange events', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);
    const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
      SbbStepperElement.events.stepchange,
      element,
    );
    element.selectedIndex = 2;
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    await stepChangeSpy.calledOnce();
    expect(stepChangeSpy.count).to.be.equal(1);

    const event = stepChangeSpy.lastEvent;
    expect(event).to.be.instanceOf(SbbStepChangeEvent);
    expect(event!.selectedIndex).to.be.equal(2);
    expect(event!.previousIndex).to.be.equal(0);
    expect(event!.selectedStep).to.be.equal(stepLabelThree.step);
    expect(event!.previousStep).to.be.equal(element.steps[0]);

    expect(stepLabelThree).to.match(':state(selected)');
    expect(stepLabelThree.step).to.match(':state(selected)');
    expect(document.activeElement!.id).not.to.be.equal(stepLabelThree.id);
  });

  it('selects the next step on [sbb-stepper-next] click and emits validate and stepchange events', async () => {
    const stepperNext = element.querySelector<HTMLElement>('[sbb-stepper-next]')!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);
    const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
      SbbStepperElement.events.stepchange,
      element,
    );
    stepperNext.focus();
    stepperNext.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    await stepChangeSpy.calledOnce();
    expect(stepChangeSpy.count).to.be.equal(1);

    const event = stepChangeSpy.lastEvent;
    expect(event).to.be.instanceOf(SbbStepChangeEvent);
    expect(event!.selectedIndex).to.be.equal(1);
    expect(event!.previousIndex).to.be.equal(0);
    expect(event!.selectedStep).to.be.equal(stepLabelTwo.step);
    expect(event!.previousStep).to.be.equal(element.steps[0]);

    expect(stepLabelTwo).to.match(':state(selected)');
    expect(stepLabelTwo.step).to.match(':state(selected)');
    expect(document.activeElement!.id).to.be.equal(stepLabelTwo.id);
  });

  it('selects the previous step on [sbb-stepper-previous] click and emits stepchange event', async () => {
    const stepperNext = element.querySelector<HTMLElement>('[sbb-stepper-next]')!;
    const stepperPrevious = element.querySelector<HTMLElement>('[sbb-stepper-previous]')!;
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    stepperNext.focus();
    stepperNext.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelTwo).to.match(':state(selected)');
    expect(stepLabelTwo.step).to.match(':state(selected)');
    expect(document.activeElement!.id).to.be.equal(stepLabelTwo.id);

    const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
      SbbStepperElement.events.stepchange,
      element,
    );
    stepperPrevious.click();
    await waitForLitRender(element);

    await stepChangeSpy.calledOnce();
    expect(stepChangeSpy.count).to.be.equal(1);

    const event = stepChangeSpy.lastEvent;
    expect(event).to.be.instanceOf(SbbStepChangeEvent);
    expect(event!.selectedIndex).to.be.equal(0);
    expect(event!.previousIndex).to.be.equal(1);
    expect(event!.selectedStep).to.be.equal(stepLabelOne.step);
    expect(event!.previousStep).to.be.equal(element.steps[1]);

    expect(stepLabelOne).to.match(':state(selected)');
    expect(stepLabelOne.step).to.match(':state(selected)');
    expect(document.activeElement!.id).to.be.equal(stepLabelOne.id);
  });

  it('selects only the next step via [sbb-stepper-next] click in linear mode and emits validate event', async () => {
    const stepperNext = element.querySelector<HTMLElement>('[sbb-stepper-next]')!;
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    element.linear = true;

    stepLabelThree.click();
    await waitForLitRender(element);

    expect(stepLabelOne).to.match(':state(selected)');
    expect(stepLabelOne.step).to.match(':state(selected)');

    stepLabelTwo.click();
    await waitForLitRender(element);

    expect(stepLabelOne).to.match(':state(selected)');
    expect(stepLabelOne.step).to.match(':state(selected)');

    stepperNext.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelTwo).to.match(':state(selected)');
    expect(stepLabelTwo.step).to.match(':state(selected)');
  });

  it('does not switch to the next step if the validate is prevented and does not emit stepchange', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);
    const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
      SbbStepperElement.events.stepchange,
      element,
    );
    element.addEventListener(SbbStepElement.events.validate, (ev) => ev.preventDefault());

    stepLabelThree.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepChangeSpy.count).to.be.equal(0);
    expect(stepLabelThree).not.to.match(':state(selected)');
    expect(stepLabelThree.step).not.to.match(':state(selected)');
  });

  it('should keep last step disabled in non-linear stepper when switching from first to second step', async () => {
    element = await fixture(html`
      <sbb-stepper>
        <sbb-step-label>Step 1</sbb-step-label>
        <sbb-step>Step one content.</sbb-step>

        <sbb-step-label>Step 2</sbb-step-label>
        <sbb-step>Step two content.</sbb-step>

        <sbb-step-label>Step 3</sbb-step-label>
        <sbb-step>Step three content.</sbb-step>

        <sbb-step-label>Step 4</sbb-step-label>
        <sbb-step>Step four content.</sbb-step>
      </sbb-stepper>
    `);

    const labels = element.querySelectorAll('sbb-step-label');
    const stepLabelOne = labels[0];
    const stepLabelTwo = labels[1];
    const stepLabelFour = labels[3];

    expect(stepLabelOne).to.match(':state(selected)');

    stepLabelFour.disabled = true;
    await waitForLitRender(element);
    expect(stepLabelFour.disabled).to.be.true;
    expect(stepLabelFour).to.have.attribute('disabled');
    expect(stepLabelFour).to.match(':state(disabled)');

    element.next();
    await waitForLitRender(element);

    expect(stepLabelTwo).to.match(':state(selected)');
    expect(stepLabelFour).to.match(':state(disabled)');
    expect(stepLabelFour).to.have.attribute('disabled');
    expect(stepLabelFour.disabled).to.be.true;
  });

  it('resets the single form wrapping the stepper and returns to the first step', async () => {
    element = await fixture(html`
      <form>
        <sbb-stepper selected-index="0">
          <sbb-step-label>Step 1</sbb-step-label>
          <sbb-step>
            Step one content.
            <input name="first-input" />
          </sbb-step>

          <sbb-step-label>Step 2</sbb-step-label>
          <sbb-step>Step two content.</sbb-step>

          <sbb-step-label>Step 3</sbb-step-label>
          <sbb-step>
            Step three content.
            <input name="second-input" />
          </sbb-step>
        </sbb-stepper>
      </form>
    `);

    const stepper = element.querySelector<SbbStepperElement>('sbb-stepper')!;
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const stepInputOne = element.querySelector<HTMLInputElement>('input[name="first-input"]')!;
    const stepInputTwo = element.querySelector<HTMLInputElement>('input[name="second-input"]')!;

    element.selectedIndex = 2;

    // If the focus is inside the stepper, the focus is set to the first step label after the reset.
    stepLabelTwo.focus();

    stepInputOne.value = 'First value';
    stepInputTwo.value = 'Second value';

    stepper.reset();
    await waitForLitRender(element);

    expect(stepInputOne.value).to.be.equal('');
    expect(stepInputTwo.value).to.be.equal('');

    expect(stepLabelOne).to.match(':state(selected)');
    expect(stepLabelOne.step).to.match(':state(selected)');
    expect(document.activeElement!.id).to.be.equal(stepLabelOne.id);
  });

  it('resets the form for each step and returns to the first step', async () => {
    element = await fixture(html`
      <sbb-stepper selected-index="0">
        <sbb-step-label>Step 1</sbb-step-label>
        <sbb-step>
          Step one content.
          <form>
            <input name="first-input" />
          </form>
        </sbb-step>

        <sbb-step-label>Step 2</sbb-step-label>
        <sbb-step>Step two content.</sbb-step>

        <sbb-step-label>Step 3</sbb-step-label>
        <sbb-step>
          Step three content.
          <form>
            <input name="second-input" />
          </form>
        </sbb-step>
      </sbb-stepper>
    `);

    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepInputOne = element.querySelector<HTMLInputElement>('input[name="first-input"]')!;
    const stepInputTwo = element.querySelector<HTMLInputElement>('input[name="second-input"]')!;

    element.selectedIndex = 2;

    // If the focus is not inside the stepper, the focus is not set to the first step label after the reset.
    document.body.focus();

    stepInputOne.value = 'First value';
    stepInputTwo.value = 'Second value';

    element.reset();
    await waitForLitRender(element);

    expect(stepInputOne.value).to.be.equal('');
    expect(stepInputTwo.value).to.be.equal('');

    expect(stepLabelOne).to.match(':state(selected)');
    expect(stepLabelOne.step).to.match(':state(selected)');
    expect(document.activeElement!.id).not.to.be.equal(stepLabelOne.id);
  });

  it('focuses the correct element in the step content', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.id).to.be.equal(stepLabelOne.id);

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.id).to.be.equal('step-one-content');
  });

  it('sets the correct ariaLabelledbyElements property', async () => {
    const steps: SbbStepElement[] = Array.from(
      element.querySelectorAll<SbbStepElement>('sbb-step'),
    );
    steps.forEach((step: SbbStepElement) =>
      expect(elementInternals.get(step)!.ariaLabelledByElements).to.have.same.members([step.label]),
    );
  });

  it('selects step on right arrow key pressed and emits stepchange event', async () => {
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
      SbbStepperElement.events.stepchange,
      element,
    );
    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowRight' });
    await waitForLitRender(element);

    await stepChangeSpy.calledOnce();
    expect(stepChangeSpy.count).to.be.equal(1);

    const event = stepChangeSpy.lastEvent;
    expect(event).to.be.instanceOf(SbbStepChangeEvent);
    expect(event!.selectedIndex).to.be.equal(1);
    expect(event!.previousIndex).to.be.equal(0);
    expect(event!.selectedStep).to.be.equal(stepLabelTwo.step);
    expect(event!.previousStep).to.be.equal(element.steps[0]);

    expect(stepLabelTwo).to.match(':state(selected)');
    expect(stepLabelTwo.step).to.match(':state(selected)');
  });

  it('selects step on left arrow key pressed', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelTwo).to.match(':state(selected)');
    expect(stepLabelTwo.step).to.match(':state(selected)');

    await sendKeys({ press: 'ArrowLeft' });

    expect(stepLabelOne).to.match(':state(selected)');
    expect(stepLabelOne.step).to.match(':state(selected)');
  });

  it('wraps around on arrow key navigation', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelTwo).to.match(':state(selected)');
    expect(stepLabelTwo.step).to.match(':state(selected)');

    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelThree).to.match(':state(selected)');
    expect(stepLabelThree.step).to.match(':state(selected)');

    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelOne).to.match(':state(selected)');
    expect(stepLabelOne.step).to.match(':state(selected)');
  });

  it('wraps around on arrow left arrow key navigation', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowLeft' });

    expect(stepLabelThree).to.match(':state(selected)');
    expect(stepLabelThree.step).to.match(':state(selected)');
  });

  it('proxy size to step children', async () => {
    const stepLabels = Array.from(element.querySelectorAll<SbbStepLabelElement>('sbb-step-label')!);

    expect(stepLabels.every((l) => l.matches(`:state(size-${element.size})`))).to.be.true;

    element.size = 's';
    await waitForLitRender(element);

    expect(stepLabels.every((l) => l.matches(`:state(size-${element.size})`))).to.be.true;
  });

  describe('stepchange event', () => {
    it('should emit multiple stepchange events when changing steps multiple times', async () => {
      const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
        SbbStepperElement.events.stepchange,
        element,
      );
      const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
        'sbb-step-label:nth-of-type(2)',
      )!;
      const stepLabelThree = element.querySelector<SbbStepLabelElement>(
        'sbb-step-label:nth-of-type(3)',
      )!;

      // Change to step 2
      stepLabelTwo.click();
      await waitForLitRender(element);

      await stepChangeSpy.calledOnce();
      let event = stepChangeSpy.events[0];
      expect(event.selectedIndex).to.be.equal(1);
      expect(event.previousIndex).to.be.equal(0);

      // Change to step 3
      stepLabelThree.click();
      await waitForLitRender(element);

      await stepChangeSpy.calledTimes(2);
      event = stepChangeSpy.events[1];
      expect(event.selectedIndex).to.be.equal(2);
      expect(event.previousIndex).to.be.equal(1);

      expect(stepChangeSpy.count).to.be.equal(2);
    });

    it('should have correct event properties when changing from first to last step', async () => {
      const stepChangeSpy = new EventSpy<SbbStepChangeEvent>(
        SbbStepperElement.events.stepchange,
        element,
      );
      const stepLabelThree = element.querySelector<SbbStepLabelElement>(
        'sbb-step-label:nth-of-type(3)',
      )!;

      element.selectedIndex = 2;
      await waitForLitRender(element);

      await stepChangeSpy.calledOnce();
      const event = stepChangeSpy.lastEvent;

      expect(event!.selectedIndex).to.be.equal(2);
      expect(event!.previousIndex).to.be.equal(0);
      expect(event!.selectedStep).to.be.equal(stepLabelThree.step);
      expect(event!.previousStep).to.be.equal(element.steps[0]);
    });
  });
});
