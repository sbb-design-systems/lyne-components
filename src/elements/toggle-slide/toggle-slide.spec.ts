import { assert, expect } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { type SinonStub, stub } from 'sinon';

import type { SbbButtonStaticElement } from '../button.pure.ts';
import { sbbLiveAnnouncer } from '../core/a11y/live-announcer.ts';
import { i18nToggleSlideValidating, i18nToggleSlideValidationFailed } from '../core/i18n/i18n.ts';
import { elementInternalsSpy, fixture } from '../core/testing/private.ts';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing.ts';
import { SbbDialogElement } from '../dialog.pure.ts';

import { SbbToggleSlideElement, SbbToggleSlideValidateEvent } from './toggle-slide.component.ts';

import '../button.ts';
import '../dialog.ts';
import '../toggle-slide.ts';

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe(`sbb-toggle-slide`, () => {
  const elementInternals = elementInternalsSpy();

  let element: SbbToggleSlideElement;
  let announceStub: SinonStub;
  let validateSpy: EventSpy<SbbToggleSlideValidateEvent>;
  let inputSpy: EventSpy<InputEvent>;
  let changeSpy: EventSpy<Event>;

  const slideButton = (): SbbButtonStaticElement =>
    element.shadowRoot!.querySelector<SbbButtonStaticElement>('.sbb-toggle-slide__button')!;

  const fraction = (): number =>
    parseFloat(getComputedStyle(element).getPropertyValue('--sbb-toggle-slide-fraction'));

  const internals = (): ElementInternals => elementInternals.get(element)!;

  const createSpies = (): void => {
    validateSpy = new EventSpy(SbbToggleSlideElement.events.validate, element);
    inputSpy = new EventSpy(SbbToggleSlideElement.events.input, element);
    changeSpy = new EventSpy(SbbToggleSlideElement.events.change, element);
  };

  /** Presses the mouse on the center of the slide button. */
  const startSlide = async (): Promise<void> => {
    const rect = slideButton().getBoundingClientRect();
    await sendMouse({
      type: 'move',
      position: [Math.round(rect.left + rect.width / 2), Math.round(rect.top + rect.height / 2)],
    });
    await sendMouse({ type: 'down' });
  };

  /**
   * Moves the pressed mouse so that the slide button is placed at the given fraction of the track.
   * Must be called after `startSlide()`, as the pointer offset relative to the button is respected.
   */
  const moveSlideTo = async (target: number): Promise<void> => {
    const button = slideButton();
    const trackRect = button.parentElement!.getBoundingClientRect();
    const trackLength = trackRect.width - button.clientWidth;
    await sendMouse({
      type: 'move',
      position: [
        Math.round(trackRect.left + button.clientWidth / 2 + trackLength * target),
        Math.round(trackRect.top + trackRect.height / 2),
      ],
    });
  };

  const endSlide = (): Promise<void> => sendMouse({ type: 'up' });

  const slideTo = async (target: number): Promise<void> => {
    await startSlide();
    await moveSlideTo(target);
    await endSlide();
  };

  beforeEach(() => {
    announceStub = stub(sbbLiveAnnouncer, 'announce').returns(Promise.resolve());
  });

  afterEach(async () => {
    announceStub.restore();
    await resetMouse();
  });

  describe('basics', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-toggle-slide aria-label="Check-in" name="check-in" value="checked-in">
          <sbb-toggle-slide-unchecked-label>To start pull right</sbb-toggle-slide-unchecked-label>
          <sbb-toggle-slide-checked-label>To stop pull left</sbb-toggle-slide-checked-label>
        </sbb-toggle-slide>
      `);
      createSpies();
    });

    it('renders', () => {
      assert.instanceOf(element, SbbToggleSlideElement);
    });

    it('should have the switch role', () => {
      expect(internals().role).to.be.equal('switch');
    });

    it('should be focusable', () => {
      element.focus();

      expect(document.activeElement).to.be.equal(element);
    });

    it('should be unchecked initially', () => {
      expect(element.checked).to.be.false;
      expect(element).not.to.match(':state(checked)');
      expect(internals().ariaChecked).not.to.be.equal('true');
      expect(fraction()).to.be.equal(0);
    });

    it('should be checked initially with checked attribute', async () => {
      element = await fixture(html`<sbb-toggle-slide checked></sbb-toggle-slide>`);

      expect(element.checked).to.be.true;
      expect(element).to.match(':state(checked)');
      expect(elementInternals.get(element)!.ariaChecked).to.be.equal('true');
      expect(fraction()).to.be.equal(1);
    });

    it('should update state on programmatic change without dispatching events', async () => {
      element.checked = true;
      await waitForLitRender(element);

      expect(element).to.match(':state(checked)');
      expect(internals().ariaChecked).to.be.equal('true');
      expect(fraction()).to.be.equal(1);

      element.checked = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':state(checked)');
      expect(internals().ariaChecked).to.be.equal('false');
      expect(fraction()).to.be.equal(0);

      expect(validateSpy.count).to.be.equal(0);
      expect(inputSpy.count).to.be.equal(0);
      expect(changeSpy.count).to.be.equal(0);
    });
  });

  describe('keyboard interaction', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-toggle-slide aria-label="Check-in"></sbb-toggle-slide>`);
      createSpies();
      element.focus();
    });

    it('should toggle on Space press', async () => {
      await sendKeys({ press: 'Space' });
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(element).to.match(':state(checked)');
      expect(internals().ariaChecked).to.be.equal('true');
      expect(fraction()).to.be.equal(1);
      expect(validateSpy.count).to.be.equal(1);
      expect(inputSpy.count).to.be.equal(1);

      await sendKeys({ press: 'Space' });
      await changeSpy.calledTimes(2);

      expect(element.checked).to.be.false;
      expect(internals().ariaChecked).to.be.equal('false');
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(2);
      expect(inputSpy.count).to.be.equal(2);
    });

    it('should dispatch validate, input and change events in order', async () => {
      const events: string[] = [];
      for (const name of Object.values(SbbToggleSlideElement.events)) {
        element.addEventListener(name, (e) => events.push(e.type));
      }

      await sendKeys({ press: 'Space' });
      await changeSpy.calledOnce();

      expect(events).to.be.deep.equal(['validate', 'input', 'change']);
    });

    it('should not toggle on Enter press', async () => {
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should only activate on keyup', async () => {
      await sendKeys({ down: ' ' });
      await waitForLitRender(element);

      expect(slideButton()).to.match(':state(active)');
      expect(validateSpy.count).to.be.equal(0);

      await sendKeys({ up: ' ' });
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(slideButton()).not.to.match(':state(active)');
    });

    it('should reset active state of the slide button on blur', async () => {
      await sendKeys({ down: ' ' });
      expect(slideButton()).to.match(':state(active)');

      element.blur();

      expect(slideButton()).not.to.match(':state(active)');
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should prevent scrolling on Space press', async () => {
      const root = await fixture(html`
        <div style="height: 100px; overflow: scroll">
          <div style="height: 500px">
            <sbb-toggle-slide aria-label="Check-in"></sbb-toggle-slide>
          </div>
        </div>
      `);
      element = root.querySelector('sbb-toggle-slide')!;
      createSpies();

      element.focus();
      await sendKeys({ press: 'Space' });
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(root.scrollTop).to.be.equal(0);
    });
  });

  describe('screen reader interaction', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-toggle-slide aria-label="Check-in"></sbb-toggle-slide>`);
      createSpies();
    });

    it('should toggle on screen reader click', async () => {
      // A programmatic click has detail 0 and no coordinates, like clicks synthesized by screen readers.
      element.click();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(validateSpy.count).to.be.equal(1);
      expect(inputSpy.count).to.be.equal(1);

      element.click();
      await changeSpy.calledTimes(2);

      expect(element.checked).to.be.false;
    });

    it('should not toggle on regular mouse click', async () => {
      const rect = element.getBoundingClientRect();
      await sendMouse({
        type: 'click',
        position: [Math.round(rect.right - 5), Math.round(rect.top + rect.height / 2)],
      });
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);
    });
  });

  describe('pointer interaction', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-toggle-slide aria-label="Check-in" style="width: 300px">
          <sbb-toggle-slide-unchecked-label>To start pull right</sbb-toggle-slide-unchecked-label>
          <sbb-toggle-slide-checked-label>To stop pull left</sbb-toggle-slide-checked-label>
        </sbb-toggle-slide>
      `);
      createSpies();
    });

    it('should follow the pointer while sliding', async () => {
      await startSlide();
      await moveSlideTo(0.5);

      expect(fraction()).to.be.closeTo(0.5, 0.05);
      expect(validateSpy.count).to.be.equal(0);

      await endSlide();
    });

    it('should toggle when sliding to the end', async () => {
      await slideTo(1);
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(fraction()).to.be.equal(1);
      expect(validateSpy.count).to.be.equal(1);
      expect(inputSpy.count).to.be.equal(1);
    });

    it('should toggle back when sliding to the start', async () => {
      element.checked = true;
      await waitForLitRender(element);

      await slideTo(0);
      await changeSpy.calledOnce();

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
    });

    it('should snap back when not sliding far enough', async () => {
      await slideTo(0.8);
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
      expect(changeSpy.count).to.be.equal(0);
    });

    it('should not toggle when sliding in the wrong direction', async () => {
      element.checked = true;
      await waitForLitRender(element);

      await slideTo(1);
      await waitForLitRender(element);

      expect(element.checked).to.be.true;
      expect(fraction()).to.be.equal(1);
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should clamp the position to the track', async () => {
      const trackRect = slideButton().parentElement!.getBoundingClientRect();
      const y = Math.round(trackRect.top + trackRect.height / 2);
      await startSlide();

      await sendMouse({ type: 'move', position: [Math.round(trackRect.right + 20), y] });
      expect(fraction()).to.be.equal(1);

      // Ensure that the pointer stays within the viewport when overshooting the start of the track.
      await sendMouse({
        type: 'move',
        position: [Math.max(0, Math.round(trackRect.left - 20)), y],
      });
      expect(fraction()).to.be.equal(0);

      await endSlide();
    });

    it('should abort sliding on pointercancel', async () => {
      await startSlide();
      await moveSlideTo(1);

      slideButton().dispatchEvent(new PointerEvent('pointercancel', { bubbles: true }));
      await endSlide();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should abort sliding on programmatic change', async () => {
      await startSlide();
      await moveSlideTo(0.5);

      element.checked = true;
      await waitForLitRender(element);

      expect(fraction()).to.be.equal(1);

      await endSlide();
      await waitForLitRender(element);

      expect(element.checked).to.be.true;
      expect(fraction()).to.be.equal(1);
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should abort sliding when disabled', async () => {
      await startSlide();
      await moveSlideTo(1);

      element.disabled = true;
      await waitForLitRender(element);
      await endSlide();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should abort sliding when set to readonly', async () => {
      await startSlide();
      await moveSlideTo(1);

      element.readOnly = true;
      await waitForLitRender(element);
      await endSlide();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
    });

    for (const property of ['disabled', 'readOnly'] as const) {
      it(`should reset the position immediately when ${property} is set during snap back`, async () => {
        element.style.setProperty('--sbb-toggle-slide-animation-duration', '1s');

        await slideTo(0.5);

        expect(fraction()).to.be.greaterThan(0);

        element[property] = true;
        await waitForLitRender(element);

        expect(fraction()).to.be.equal(0);

        // Ensure the canceled animation does not continue.
        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(fraction()).to.be.equal(0);
        expect(validateSpy.count).to.be.equal(0);
      });
    }
  });

  describe('validation', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-toggle-slide aria-label="Check-in"></sbb-toggle-slide>`);
      createSpies();
    });

    it('should dispatch a cancelable validate event before changing the state', async () => {
      let checkedDuringValidation: boolean | undefined;
      element.addEventListener('validate', () => (checkedDuringValidation = element.checked));

      element.click();
      const event = await validateSpy.calledOnce();
      await changeSpy.calledOnce();

      expect(event).to.be.instanceOf(SbbToggleSlideValidateEvent);
      expect(event.cancelable).to.be.true;
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
      expect(event.condition).to.be.null;
      expect(checkedDuringValidation).to.be.false;
      expect(element.checked).to.be.true;
    });

    it('should reject the state change when prevented', async () => {
      element.addEventListener('validate', (e) => e.preventDefault());

      element.click();
      await validateSpy.calledOnce();
      await waitForCondition(() => announceStub.called);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(inputSpy.count).to.be.equal(0);
      expect(changeSpy.count).to.be.equal(0);
      expect(announceStub).to.have.been.calledWith(i18nToggleSlideValidationFailed.en);
    });

    it('should allow interaction again after a rejected validation', async () => {
      const listener = (e: Event): void => e.preventDefault();
      element.addEventListener('validate', listener);

      element.click();
      await validateSpy.calledOnce();
      await waitForCondition(() => announceStub.called);

      element.removeEventListener('validate', listener);
      element.click();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
    });

    it('should only trigger label and icon transitions on user interaction', async () => {
      element.checked = true;
      await waitForLitRender(element);

      expect(element).not.to.match(':state(label-fade)');
      expect(element).not.to.match(':state(icon-transition)');

      // The states are removed again at the end of the transition, so they are checked on change.
      const states: string[] = [];
      element.addEventListener('change', () =>
        states.push(
          ...['label-fade', 'icon-transition'].filter((s) => element.matches(`:state(${s})`)),
        ),
      );

      element.click();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.false;
      expect(states).to.have.members(['label-fade', 'icon-transition']);
    });

    describe('asynchronous', () => {
      let deferred: Deferred<boolean>;

      beforeEach(() => {
        deferred = createDeferred<boolean>();
        element.addEventListener('validate', (e) =>
          (e as SbbToggleSlideValidateEvent).preventDefaultConditionally(deferred.promise),
        );
      });

      it('should indicate the pending validation', async () => {
        element.click();
        const event = await validateSpy.calledOnce();
        await waitForLitRender(element);

        expect(event.condition).to.be.equal(deferred.promise);
        expect(element.checked).to.be.false;
        expect(slideButton().loading).to.be.true;
        expect(internals().ariaBusy).to.be.equal('true');
        expect(announceStub).to.have.been.calledWith(i18nToggleSlideValidating.en);

        deferred.resolve(true);
        await changeSpy.calledOnce();
        await waitForLitRender(element);

        expect(slideButton().loading).to.be.false;
        expect(internals().ariaBusy).to.be.null;
      });

      it('should change the state when resolved with true', async () => {
        element.click();
        await validateSpy.calledOnce();

        deferred.resolve(true);
        await changeSpy.calledOnce();

        expect(element.checked).to.be.true;
        expect(inputSpy.count).to.be.equal(1);
        expect(fraction()).to.be.equal(1);
      });

      it('should clear the validating announcement when resolved with true', async () => {
        element.click();
        await validateSpy.calledOnce();
        announceStub.resetHistory();

        deferred.resolve(true);
        await changeSpy.calledOnce();

        expect(announceStub).to.have.been.calledOnceWith('', 'assertive');
      });

      it('should revert the state when resolved with false', async () => {
        element.click();
        await validateSpy.calledOnce();
        announceStub.resetHistory();

        deferred.resolve(false);
        await waitForCondition(() => announceStub.called);
        await waitForLitRender(element);

        expect(element.checked).to.be.false;
        expect(fraction()).to.be.equal(0);
        expect(changeSpy.count).to.be.equal(0);
        expect(slideButton().loading).to.be.false;
        expect(internals().ariaBusy).to.be.null;
        expect(announceStub).to.have.been.calledWith(i18nToggleSlideValidationFailed.en);
      });

      it('should revert the state when rejected', async () => {
        element.click();
        await validateSpy.calledOnce();
        announceStub.resetHistory();

        deferred.reject(new Error('Backend error'));
        await waitForCondition(() => announceStub.called);

        expect(element.checked).to.be.false;
        expect(changeSpy.count).to.be.equal(0);
        expect(announceStub).to.have.been.calledWith(i18nToggleSlideValidationFailed.en);
      });

      it('should revert the state when resolved with true but prevented', async () => {
        element.addEventListener('validate', (e) => e.preventDefault());

        element.click();
        await validateSpy.calledOnce();
        announceStub.resetHistory();

        deferred.resolve(true);
        await waitForCondition(() => announceStub.called);

        expect(element.checked).to.be.false;
        expect(changeSpy.count).to.be.equal(0);
      });

      it('should ignore further interactions while validating', async () => {
        element.click();
        await validateSpy.calledOnce();

        element.click();
        element.focus();
        await sendKeys({ press: 'Space' });
        await waitForLitRender(element);

        expect(validateSpy.count).to.be.equal(1);

        deferred.resolve(true);
        await changeSpy.calledOnce();

        expect(element.checked).to.be.true;
      });

      it('should abort on programmatic change', async () => {
        element.click();
        await validateSpy.calledOnce();

        element.checked = true;
        await waitForLitRender(element);

        expect(slideButton().loading).to.be.false;
        expect(internals().ariaBusy).to.be.null;

        deferred.resolve(true);
        await waitForLitRender(element);
        await deferred.promise;

        expect(element.checked).to.be.true;
        expect(inputSpy.count).to.be.equal(0);
        expect(changeSpy.count).to.be.equal(0);
      });

      it('should abort when disabled', async () => {
        element.click();
        await validateSpy.calledOnce();

        element.disabled = true;
        await waitForLitRender(element);

        deferred.resolve(true);
        await deferred.promise;
        await waitForLitRender(element);

        expect(element.checked).to.be.false;
        expect(fraction()).to.be.equal(0);
        expect(changeSpy.count).to.be.equal(0);
      });

      it('should abort when disconnected', async () => {
        element.click();
        await validateSpy.calledOnce();

        const parent = element.parentElement!;
        element.remove();

        deferred.resolve(true);
        await deferred.promise;
        await waitForLitRender(element);

        expect(element.checked).to.be.false;
        expect(changeSpy.count).to.be.equal(0);

        parent.append(element);
        await waitForLitRender(element);

        expect(internals().ariaBusy).to.be.null;
        expect(fraction()).to.be.equal(0);
      });

      it('should not abort when set to readonly', async () => {
        element.click();
        await validateSpy.calledOnce();

        element.readOnly = true;
        await waitForLitRender(element);

        deferred.resolve(true);
        await changeSpy.calledOnce();

        expect(element.checked).to.be.true;
      });
    });
  });

  describe('disabled', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-toggle-slide aria-label="Check-in" disabled></sbb-toggle-slide>`,
      );
      createSpies();
    });

    it('should match :disabled and disable the slide button', () => {
      expect(element).to.match(':disabled');
      expect(slideButton().disabled).to.be.true;
    });

    it('should not be focusable', () => {
      element.focus();

      expect(document.activeElement).not.to.be.equal(element);
    });

    it('should ignore screen reader click', async () => {
      element.click();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should ignore sliding', async () => {
      await slideTo(1);
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should allow interaction again when enabled', async () => {
      element.disabled = false;
      await waitForLitRender(element);

      element.click();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
    });
  });

  describe('readonly', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-toggle-slide aria-label="Check-in" readonly></sbb-toggle-slide>`,
      );
      createSpies();
    });

    it('should expose readonly as aria-disabled', async () => {
      expect(element.readOnly).to.be.true;
      expect(internals().ariaDisabled).to.be.equal('true');

      element.readOnly = false;
      await waitForLitRender(element);

      expect(element).not.to.have.attribute('readonly');
      expect(internals().ariaDisabled).to.be.null;
    });

    it('should remain focusable', () => {
      element.focus();

      expect(document.activeElement).to.be.equal(element);
    });

    it('should ignore keyboard interaction', async () => {
      element.focus();
      await sendKeys({ press: 'Space' });
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(slideButton()).not.to.match(':state(active)');
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should ignore screen reader click', async () => {
      element.click();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should ignore sliding', async () => {
      await slideTo(1);
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should allow programmatic change', async () => {
      element.checked = true;
      await waitForLitRender(element);

      expect(element.checked).to.be.true;
      expect(fraction()).to.be.equal(1);
    });
  });

  describe('confirmation dialog', () => {
    let dialog: SbbDialogElement;
    let dialogOpenSpy: EventSpy<Event>;
    let dialogCloseSpy: EventSpy<Event>;

    const confirm = (): void =>
      dialog.querySelector<HTMLElement>('[sbb-dialog-close="true"]')!.click();

    const cancel = (): void =>
      dialog.querySelector<HTMLElement>('[sbb-dialog-close="false"]')!.click();

    beforeEach(async () => {
      const root = await fixture(html`
        <div>
          <sbb-toggle-slide aria-label="Signal" confirmation-dialog="confirmation-dialog">
          </sbb-toggle-slide>
          <sbb-dialog id="confirmation-dialog">
            <sbb-dialog-content>Do you want to turn on the signal?</sbb-dialog-content>
            <sbb-dialog-actions>
              <sbb-secondary-button sbb-dialog-close="false" sbb-focus-initial>
                Cancel
              </sbb-secondary-button>
              <sbb-button sbb-dialog-close="true">Confirm</sbb-button>
            </sbb-dialog-actions>
          </sbb-dialog>
        </div>
      `);
      element = root.querySelector('sbb-toggle-slide')!;
      dialog = root.querySelector('sbb-dialog')!;
      createSpies();
      dialogOpenSpy = new EventSpy(SbbDialogElement.events.open, dialog);
      dialogCloseSpy = new EventSpy(SbbDialogElement.events.close, dialog);
    });

    it('should resolve the id reference', () => {
      expect(element.confirmationDialog).to.be.equal(dialog);
    });

    it('should skip focus restoration of the dialog', () => {
      expect(dialog.skipFocusRestoration).to.be.true;
    });

    it('should open the dialog on keyboard activation', async () => {
      element.focus();
      await sendKeys({ press: 'Space' });
      await dialogOpenSpy.calledOnce();

      expect(dialog.isOpen).to.be.true;
      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should open the dialog on screen reader click', async () => {
      element.click();
      await dialogOpenSpy.calledOnce();

      expect(dialog.isOpen).to.be.true;
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should change the state when confirmed', async () => {
      // Focus restoration relies on the dialog losing focus before the slide animation completes.
      element.style.setProperty('--sbb-toggle-slide-animation-duration', '0.05s');
      element.focus();
      await sendKeys({ press: 'Space' });
      await dialogOpenSpy.calledOnce();

      confirm();
      await dialogCloseSpy.calledOnce();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(fraction()).to.be.equal(1);
      expect(validateSpy.count).to.be.equal(1);
      expect(inputSpy.count).to.be.equal(1);
      await waitForCondition(() => document.activeElement === element);
    });

    it('should change the state when closed programmatically with true', async () => {
      element.click();
      await dialogOpenSpy.calledOnce();

      dialog.close(true);
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(validateSpy.count).to.be.equal(1);
    });

    describe('with asynchronous validation', () => {
      let deferred: Deferred<boolean>;

      beforeEach(() => {
        deferred = createDeferred<boolean>();
        element.addEventListener('validate', (e) =>
          (e as SbbToggleSlideValidateEvent).preventDefaultConditionally(deferred.promise),
        );
      });

      const confirmAndWaitForFocusLoss = async (): Promise<void> => {
        element.focus();
        await sendKeys({ press: 'Space' });
        await dialogOpenSpy.calledOnce();

        confirm();
        await validateSpy.calledOnce();
        await waitForCondition(() => !dialog.contains(document.activeElement));
      };

      it('should restore focus after the validation', async () => {
        await confirmAndWaitForFocusLoss();

        deferred.resolve(true);
        await changeSpy.calledOnce();

        expect(element.checked).to.be.true;
        await waitForCondition(() => document.activeElement === element);
      });

      it('should not steal focus when the user moved focus during the validation', async () => {
        const otherElement = document.createElement('button');
        element.parentElement!.append(otherElement);

        await confirmAndWaitForFocusLoss();
        otherElement.focus();

        deferred.resolve(true);
        await changeSpy.calledOnce();
        await waitForLitRender(element);

        expect(element.checked).to.be.true;
        expect(document.activeElement).to.be.equal(otherElement);
      });
    });

    it('should keep the state and restore focus when cancelled', async () => {
      element.focus();
      await sendKeys({ press: 'Space' });
      await dialogOpenSpy.calledOnce();

      cancel();
      await dialogCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
      expect(validateSpy.count).to.be.equal(0);
      expect(slideButton()).not.to.match(':state(active)');
      expect(document.activeElement).to.be.equal(element);
    });

    it('should keep the state when dismissed with Escape', async () => {
      element.focus();
      await sendKeys({ press: 'Space' });
      await dialogOpenSpy.calledOnce();

      await sendKeys({ press: 'Escape' });
      await dialogCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);
      expect(document.activeElement).to.be.equal(element);
    });

    it('should allow activation again after cancellation', async () => {
      element.click();
      await dialogOpenSpy.calledOnce();
      cancel();
      await dialogCloseSpy.calledOnce();

      element.click();
      await dialogOpenSpy.calledTimes(2);
      confirm();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
    });

    it('should not open the dialog when sliding', async () => {
      await slideTo(1);
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(dialogOpenSpy.count).to.be.equal(0);
    });

    it('should close the dialog on programmatic change', async () => {
      element.click();
      await dialogOpenSpy.calledOnce();

      element.checked = true;
      await dialogCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(dialog.isOpen).to.be.false;
      expect(element.checked).to.be.true;
      expect(validateSpy.count).to.be.equal(0);
      expect(changeSpy.count).to.be.equal(0);
    });

    it('should not react to dialog closing when not activated by the toggle slide', async () => {
      dialog.open();
      await dialogOpenSpy.calledOnce();

      confirm();
      await dialogCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should accept an element reference', async () => {
      element.confirmationDialog = null;
      await waitForLitRender(element);
      element.confirmationDialog = dialog;
      await waitForLitRender(element);

      element.click();
      await dialogOpenSpy.calledOnce();

      expect(validateSpy.count).to.be.equal(0);
    });

    it('should switch to another dialog', async () => {
      const otherDialog = document.createElement('sbb-dialog');
      otherDialog.innerHTML = `
        <sbb-dialog-content>Are you sure?</sbb-dialog-content>
        <sbb-dialog-actions>
          <sbb-button sbb-dialog-close="true">Confirm</sbb-button>
        </sbb-dialog-actions>
      `;
      element.parentElement!.append(otherDialog);
      const otherDialogOpenSpy = new EventSpy(SbbDialogElement.events.open, otherDialog);

      element.click();
      await dialogOpenSpy.calledOnce();

      element.confirmationDialog = otherDialog;
      await dialogCloseSpy.calledOnce();
      await waitForLitRender(element);

      expect(dialog.isOpen).to.be.false;
      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);

      // The previous dialog should no longer be linked.
      dialog.open();
      await dialogOpenSpy.calledTimes(2);
      confirm();
      await dialogCloseSpy.calledTimes(2);

      expect(validateSpy.count).to.be.equal(0);

      element.click();
      await otherDialogOpenSpy.calledOnce();
      otherDialog.querySelector<HTMLElement>('[sbb-dialog-close="true"]')!.click();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
    });

    it('should toggle directly when the dialog reference is removed', async () => {
      element.removeAttribute('confirmation-dialog');
      await waitForLitRender(element);

      element.click();
      await changeSpy.calledOnce();

      expect(element.checked).to.be.true;
      expect(dialogOpenSpy.count).to.be.equal(0);
    });
  });

  describe('form association', () => {
    let form: HTMLFormElement;

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <fieldset>
            <sbb-toggle-slide aria-label="Check-in" name="check-in" value="checked-in">
            </sbb-toggle-slide>
          </fieldset>
          <button type="reset">Reset</button>
        </form>
      `);
      element = form.querySelector('sbb-toggle-slide')!;
      createSpies();
    });

    it('should only submit the value when checked', async () => {
      expect(new FormData(form).get('check-in')).to.be.null;

      element.click();
      await changeSpy.calledOnce();

      expect(new FormData(form).get('check-in')).to.be.equal('checked-in');
    });

    it('should reset to the initial state', async () => {
      element.toggleAttribute('checked', true);
      await waitForLitRender(element);
      element.checked = false;
      await waitForLitRender(element);

      form.reset();
      await waitForLitRender(element);

      expect(element.checked).to.be.true;
      expect(fraction()).to.be.equal(1);
      expect(new FormData(form).get('check-in')).to.be.equal('checked-in');
    });

    it('should abort a pending validation on form reset', async () => {
      const deferred = createDeferred<boolean>();
      element.addEventListener('validate', (e) =>
        (e as SbbToggleSlideValidateEvent).preventDefaultConditionally(deferred.promise),
      );

      element.click();
      await validateSpy.calledOnce();

      form.reset();
      deferred.resolve(true);
      await deferred.promise;
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(changeSpy.count).to.be.equal(0);
    });

    it('should restore form state', async () => {
      element.formStateRestoreCallback('true', 'restore');
      await waitForLitRender(element);

      expect(element.checked).to.be.true;
      expect(fraction()).to.be.equal(1);

      element.formStateRestoreCallback('false', 'restore');
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(fraction()).to.be.equal(0);
    });

    it('should be invalid when required and unchecked', async () => {
      element.required = true;
      await waitForLitRender(element);

      expect(element.validity.valueMissing).to.be.true;
      expect(element).to.match(':invalid');

      element.click();
      await changeSpy.calledOnce();

      expect(element.validity.valid).to.be.true;
      expect(element).not.to.match(':invalid');
    });

    it('should ignore interaction when disabled by fieldset', async () => {
      form.querySelector('fieldset')!.disabled = true;
      await waitForLitRender(element);

      expect(element).to.match(':disabled');

      element.click();
      await slideTo(1);
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(validateSpy.count).to.be.equal(0);
    });

    it('should abort a pending validation when disabled by fieldset', async () => {
      const deferred = createDeferred<boolean>();
      element.addEventListener('validate', (e) =>
        (e as SbbToggleSlideValidateEvent).preventDefaultConditionally(deferred.promise),
      );

      element.click();
      await validateSpy.calledOnce();

      form.querySelector('fieldset')!.disabled = true;
      await waitForLitRender(element);

      deferred.resolve(true);
      await deferred.promise;
      await waitForLitRender(element);

      expect(element.checked).to.be.false;
      expect(changeSpy.count).to.be.equal(0);
    });
  });
});
