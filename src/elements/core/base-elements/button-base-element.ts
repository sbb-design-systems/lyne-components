import { isServer } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType, hostAttributes } from '../decorators.ts';
import { isEventPrevented } from '../eventing.ts';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbFormAssociatedMixin,
} from '../mixins.ts';

import { SbbActionBaseElement } from './action-base-element.ts';

/** Enumeration for type attribute in <button> HTML tag. */
export type SbbButtonType = 'button' | 'reset' | 'submit';

/** Button base class. */
export
@hostAttributes({
  tabindex: '0',
})
abstract class SbbButtonLikeBaseElement extends SbbFormAssociatedMixin(SbbActionBaseElement) {
  public static override readonly role: ElementInternals['role'] = 'button';

  public constructor() {
    super();
    this.internals.states.add('button');

    if (!isServer) {
      this.setupBaseEventHandlers();

      const passiveOptions = { passive: true };
      this.addEventListener('keydown', this._preventScrollOnSpaceKeydown);
      this.addEventListener('keyup', this._dispatchClickEventOnSpaceKeyup, passiveOptions);
      this.addEventListener('blur', this._removeActiveMarker, passiveOptions);
      this.addEventListener(
        'keypress',
        (event: KeyboardEvent): void => {
          if (event.key === 'Enter' || event.key === '\n') {
            this._dispatchClickEvent(event);
          }
        },
        passiveOptions,
      );
    }
  }

  /**
   * Prevents scrolling from pressing Space, when the event target is an action element.
   * Also sets active state.
   * @param event The origin event.
   */
  private _preventScrollOnSpaceKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      event.preventDefault();
      this.internals.states.add('active');
    }
  };

  private _removeActiveMarker = (): void => {
    this.internals.states.delete('active');
  };

  /**
   * Dispatches a 'click' PointerEvent if the original keyboard event is a 'Space' press.
   * As verified with the native button, when 'Space' is pressed, a 'click' event is dispatched
   * after the 'keyup' event.
   * @param event The origin event.
   */
  private _dispatchClickEventOnSpaceKeyup = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      this._removeActiveMarker();
      this._dispatchClickEvent(event);
    }
  };

  private _dispatchClickEvent = (event: KeyboardEvent): void => {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    (event.target as Element).dispatchEvent(
      new PointerEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: -1,
        pointerType: '',
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
      }),
    );
  };

  public override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null,
  ): void {
    if (!['name', 'value'].includes(name) || old !== value) {
      super.attributeChangedCallback(name, old, value);
    }
  }
}

/** Button base class. */
export abstract class SbbButtonBaseElement extends SbbButtonLikeBaseElement {
  private readonly _elementsOnWhichEnterPressTriggersSubmit = [
    'input',
    'sbb-date-input',
    'sbb-time-input',
  ];

  /** Value of the form element. */
  @forceType()
  @property()
  public accessor value: string = '';

  /**
   * The type attribute to use for the button.
   * @default 'button'
   */
  @property()
  public override set type(name: SbbButtonType) {
    this.setAttribute('type', `${name}`);
  }
  public override get type(): SbbButtonType {
    return (this.getAttribute('type') as SbbButtonType) ?? 'button';
  }

  /** The `<form>` element to associate the button with. */
  @property()
  public override set form(value: string) {
    this._formId = value;
    this.form?.addEventListener('keydown', this._formKeyDown, { capture: true });
  }
  public override get form(): HTMLFormElement | null {
    // Use querySelector with form and id selector, as the form property must
    // reference a valid <form> element
    return this._formId
      ? (((this.getRootNode?.() as DocumentFragment | null)?.getElementById?.(
          this._formId,
        ) as HTMLFormElement) ?? null)
      : this.internals.form;
  }
  private _formId: string = '';

  public constructor() {
    super();

    this.addEventListener('click', this._handleButtonClick);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this.form?.addEventListener('keydown', this._formKeyDown, { capture: true });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.form?.removeEventListener('keydown', this._formKeyDown, { capture: true });
  }

  private _handleButtonClick = async (event: MouseEvent): Promise<void> => {
    if (this.type === 'button' || (await isEventPrevented(event))) {
      return;
    }

    const form = this.form;
    if (!form) {
      return;
    } else if (this.type === 'submit') {
      this._requestSubmit(form);
    } else if (this.type === 'reset') {
      form.reset();
    }
  };

  private _requestSubmit(form: HTMLFormElement): void {
    // `form.requestSubmit(element);` seems not to work for CustomElements, so the `element` parameter has been removed;
    // TODO: Check if solved in any way, see https://github.com/WICG/webcomponents/issues/814#issuecomment-1218452137
    // We use the workaround described in the github issue by cloning the submit button and pass this one as an argument.

    const submitButtonClone = document.createElement('button');
    submitButtonClone.inert = true;
    submitButtonClone.hidden = true;
    submitButtonClone.name = this.name;
    submitButtonClone.value = this.value ?? '';

    form.append(submitButtonClone);
    form.requestSubmit(submitButtonClone);
    submitButtonClone.remove();
  }

  private _formKeyDown = (event: KeyboardEvent): void => {
    const form = this.form;
    if (
      this.type === 'submit' &&
      form &&
      (event.key === 'Enter' || event.key === '\n') &&
      this._elementsOnWhichEnterPressTriggersSubmit.includes(
        (event.target as HTMLElement)?.localName,
      ) &&
      event.isTrusted
    ) {
      // In the case where there is only one form element, an enter press submits the form.
      // In the case where we only have one input and this button as a submit button,
      // we need to prevent the default functionality of submitting the form because
      // while this button should be recognized as a submit element, that is not natively the case,
      // and therefore we manually handle this case here.
      // If this button is not disabled we will then request a submit further down below.
      event.stopImmediatePropagation();
      event.preventDefault();

      const eventOrigin = event.composedPath()[0];

      if (
        eventOrigin.dispatchEvent(new KeyboardEvent(event.type, event)) &&
        !this.matches(':disabled')
      ) {
        this._requestSubmit(form);
      }
    }
  };

  /**
   * Intentionally empty, as buttons are not targeted by form reset
   * @internal
   */
  public override formResetCallback(): void {}

  /**
   * Intentionally empty, as buttons are not targeted by form restore
   * @internal
   */
  public override formStateRestoreCallback(
    _state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {}

  /**
   * Intentionally empty, as button does not write its data in form.
   * The data is only applied on submit button click as submitter of requestSubmit();
   * @internal
   */
  protected override updateFormValue(): void {}
}
