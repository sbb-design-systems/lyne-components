import {
  html,
  isServer,
  type LitElement,
  type PropertyDeclaration,
  type PropertyValues,
} from 'lit';
import { eventOptions, property } from 'lit/decorators.js';

import { sbbInputModalityDetector } from '../a11y.ts';
import { SbbLanguageController, SbbMediaQueryPointerCoarse } from '../controllers.ts';
import { isBlink, isWebkit } from '../dom.ts';
import { i18nInputRequired } from '../i18n.ts';

import type { AbstractConstructor } from './constructor.ts';
import { SbbDisabledMixin } from './disabled-mixin.ts';
import { SbbElementInternalsMixin } from './element-internals-mixin.ts';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbFormAssociatedMixin,
} from './form-associated-mixin.ts';
import { SbbReadonlyMixin } from './readonly-mixin.ts';
import { SbbRequiredMixin } from './required-mixin.ts';

export declare abstract class SbbFormAssociatedInputMixinType extends SbbRequiredMixin(
  SbbFormAssociatedMixin(SbbElementInternalsMixin(LitElement)),
) {
  public static readonly formFieldAssociated = true;

  public set value(value: string);
  public get value(): string;

  public set disabled(value: boolean);
  public get disabled(): boolean;

  public set readOnly(value: boolean);
  public get readOnly(): boolean;

  public set placeholder(value: string);
  public get placeholder(): string;

  /**
   * Makes the selection equal to the current object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select)
   */
  public select(): void;

  public formResetCallback(): void;
  public formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;

  protected preparePastedText(text: string): string;
  protected language: SbbLanguageController;
}

const checkPlaintextOnlySupport = (): boolean => {
  if (isServer) {
    return false;
  }

  const div = document.createElement('div');
  div.setAttribute('contenteditable', 'PLAINTEXT-ONLY');

  // If plaintext-only is supported, the attribute value is
  // returned as lower-case from the property access.
  return div.contentEditable === 'plaintext-only';
};
const plaintextOnlySupported = checkPlaintextOnlySupport();

/**
 * The SbbFormAssociatedInputMixin enables native form support for text input controls.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedInputMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbFormAssociatedInputMixinType> & T => {
  abstract class SbbFormAssociatedInputElement
    extends SbbReadonlyMixin(
      SbbDisabledMixin(
        SbbRequiredMixin(SbbFormAssociatedMixin(SbbElementInternalsMixin(superClass))),
      ),
    )
    implements Partial<SbbFormAssociatedInputMixinType>
  {
    public static override readonly role = 'textbox';
    public static readonly formFieldAssociated = true;

    /**
     * An element with contenteditable will not emit a change event. To achieve parity
     * with a native text input, we need to track whether a change event should be
     * emitted.
     */
    private _shouldEmitChange = false;
    /**
     * A native text input attempts to submit the form when pressing Enter.
     * This can be prevented by calling preventDefault on the keydown event.
     * We track whether to request submit, which should occur before the keyup
     * event.
     */
    private _shouldTriggerSubmit = false;

    protected language = new SbbLanguageController(this);

    /**
     * Form type of element.
     * @default 'text'
     */
    public override get type(): string {
      return 'text';
    }

    /**
     * The value of the input. Reflects the current text value of this input.
     */
    @property()
    public set value(value: string) {
      this._value = this._cleanText(value);
      if (this.hasUpdated) {
        this._assignValue(this._value);
      }
      /** @internal */
      this.dispatchEvent(new Event('displayvaluechange', { bubbles: true, composed: true }));
    }
    public get value(): string {
      return this._value ?? '';
    }
    private _value: string = '';

    @property({ attribute: false })
    public set placeholder(value: string) {
      if (value) {
        this.setAttribute('placeholder', value);
      } else {
        this.removeAttribute('placeholder');
      }
      this.internals.ariaPlaceholder = value ? value : null;
    }
    public get placeholder(): string {
      return this.getAttribute('placeholder') ?? '';
    }

    protected constructor() {
      super();
      // We primarily use capture event listeners, as we want
      // our listeners to occur before consumer event listeners.
      this.addEventListener?.(
        'input',
        () => {
          const oldValue = this._value;
          this._value = this._cleanText(this.textContent ?? '');
          this.requestUpdate('value', oldValue);
          this.internals.states.add('interacted');
          this._shouldEmitChange = true;
        },
        { capture: true },
      );
      this.addEventListener?.('change', () => (this._shouldEmitChange = false), { capture: true });
      this.addEventListener?.(
        'keydown',
        (event) => {
          if (this._requiresEmptyPatch()) {
            this._assignValue('');
          }
          // We prevent recursive events by checking the original event for isTrusted
          // which is false for manually dispatched events (which we dispatch below).
          if ((event.key === 'Enter' || event.key === '\n') && event.isTrusted) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this._shouldTriggerSubmit = this.dispatchEvent(new KeyboardEvent('keydown', event));
          } else if (
            isWebkit &&
            this.value &&
            (event.key === 'Backspace' || event.key === 'Delete') &&
            event.isTrusted
          ) {
            // In Webkit pressing Backspace or Delete completely removes all the content
            // if contenteditable is set on a web component host.
            // We have to replicate the normal delete behavior.
            event.preventDefault();
            event.stopImmediatePropagation();

            if (!this.dispatchEvent(new KeyboardEvent('keydown', event))) {
              return;
            }

            const selectedRange = window.getSelection()?.getRangeAt(0);
            if (!selectedRange) {
              return;
            }

            if (selectedRange.startOffset !== selectedRange.endOffset) {
              // If a text range is selected, then delete this range
              selectedRange.deleteContents();
              this._dispatchInputEvent();
            } else if (event.key === 'Backspace' && selectedRange.startOffset > 0) {
              // When pressing Backspace, we select the previous character from
              // the current cursor position and delete it.
              selectedRange.setStart(selectedRange.startContainer, selectedRange.startOffset - 1);
              selectedRange.deleteContents();
              this._dispatchInputEvent();
            } else if (event.key === 'Delete' && selectedRange.endOffset < this.value.length) {
              // When pressing Delete, we select the next character from
              // the current cursor position and delete it.
              selectedRange.setEnd(selectedRange.endContainer, selectedRange.endOffset + 1);
              selectedRange.deleteContents();
              this._dispatchInputEvent();
            }
          }
        },
        { capture: true },
      );
      this.addEventListener?.(
        'keyup',
        (event) => {
          if (event.key === 'Enter' || event.key === '\n') {
            this._emitChangeIfNecessary();
            if (this._shouldTriggerSubmit) {
              this._shouldTriggerSubmit = false;
              this.form?.requestSubmit();
            }
          } else if (this._requiresEmptyPatch()) {
            this._setCursorAt(0);
          }
        },
        { capture: true },
      );
      // contenteditable allows pasting rich content into its host.
      // We prevent this by listening to the paste event and
      // extracting the plain text from the pasted content
      // and inserting it into the selected range (cursor position
      // or selection).
      this.addEventListener?.('paste', (e) => {
        e.preventDefault();
        if (this._requiresEmptyPatch()) {
          this._assignValue('');
        }

        const text = this._cleanText(e.clipboardData?.getData('text/plain') ?? '');
        const selectedRange = window.getSelection()?.getRangeAt(0);
        if (!selectedRange || !text) {
          return;
        }

        selectedRange.deleteContents();
        selectedRange.insertNode(document.createTextNode(this.preparePastedText(text)));
        selectedRange.setStart(selectedRange.endContainer, selectedRange.endOffset);
        this._dispatchInputEvent();
      });
      // When focusing a text input via keyboard, the text content should be selected.
      this.addEventListener?.('focus', () => {
        if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
          // TODO: This does not seem to work in Firefox with readonly.
          window.getSelection()?.selectAllChildren(this);
        }
      });
      this.addEventListener?.('touchend', () => {
        if (this._requiresEmptyPatch()) {
          this._assignValue('&nbsp;');
          this._setCursorAt(0);
        }
      });
      this.addEventListener?.('click', () => {
        if (this._requiresEmptyPatch() && sbbInputModalityDetector.mostRecentModality === 'touch') {
          this._setCursorAt(0);
        }
      });

      // On blur the native text input scrolls the text to the start of the text.
      // We mimic that by resetting the scroll position.
      // We also unset any selection to align with the native text input.
      this.addEventListener?.(
        'blur',
        () => {
          window.getSelection()?.removeAllRanges();
          if (this.value === '') {
            this._assignValue('');
          }
          this._emitChangeIfNecessary();
          this.scrollLeft = 0;
        },
        { capture: true },
      );
    }

    protected override isDisabledExternally(): boolean {
      return this.formDisabled;
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this.internals.ariaMultiLine = 'false';
      this._updateContenteditable();

      // We want to replace any content by just the text content.
      this._assignValue(this.value);
    }

    public override focus(options?: FocusOptions): void {
      super.focus(options);
      // By default, when calling focus on an input element, the cursor is placed
      // at the end of the input text. However, with contenteditable, the cursor
      // is placed at the beginning, so we move it to the end, if that is the case.
      if (this._canSelect()) {
        const selection = window.getSelection();
        if (!selection) {
          return;
        }
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        if (range && range.startOffset !== 0) {
          return;
        }

        this._setCursorAt(this.textContent!.length);
      }
    }

    public override attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null,
    ): void {
      /**
       * The native text input changes the value property when the value attribute is
       * changed under the condition that no input event has occurred since creation
       * or the last form reset.
       */
      if (name !== 'value' || !this.internals.states.has('interacted')) {
        super.attributeChangedCallback(name, old, value);
      }
    }

    /**
     * Is called whenever the form is being reset.
     *
     * @internal
     */
    public override formResetCallback(): void {
      this.internals.states.delete('interacted');
      this.value = this.getAttribute('value') ?? '';
    }

    /**
     *  Called when the browser is trying to restore element’s state to state in which case
     *  reason is "restore", or when the browser is trying to fulfill autofill on behalf of
     *  user in which case reason is "autocomplete".
     *  In the case of "restore", state is a string, File, or FormData object
     *  previously set as the second argument to setFormValue.
     *
     * @internal
     */
    public override formStateRestoreCallback(
      state: FormRestoreState | null,
      _reason: FormRestoreReason,
    ): void {
      if (state && typeof state === 'string') {
        this.value = state;
      }
    }

    /**
     * Makes the selection equal to the current object.
     *
     * @link https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select
     */
    public select(): void {
      window.getSelection()?.selectAllChildren(this);
    }

    protected override firstUpdated(changedProperties: PropertyValues<this>): void {
      super.firstUpdated(changedProperties);

      // If the value was assigned before firstUpdate, we have to
      // write it the document to be visually seen
      if (this.value && !this.innerHTML.length) {
        this._assignValue(this.value);
      }
    }

    public override requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration,
    ): void {
      super.requestUpdate(name, oldValue, options);
      if (
        this.isConnected &&
        (name === 'disabled' || name === 'formDisabled' || name === 'readOnly')
      ) {
        this._updateContenteditable();
      }
    }

    protected override shouldValidate(name: PropertyKey | undefined): boolean {
      return super.shouldValidate(name) || name === 'value' || name === 'required';
    }

    protected override validate(): void {
      super.validate();
      if (this.required && !this.value) {
        this.setValidityFlag('valueMissing', i18nInputRequired[this.language.current]);
      } else {
        this.removeValidityFlag('valueMissing');
      }
    }

    protected preparePastedText(text: string): string {
      return text;
    }

    private _requiresEmptyPatch(): boolean {
      // In Blink, a contenteditable element with empty content will crash
      // upon receiving focus, when in Mobile mode.
      // To prevent this, we patch the empty state by inserting a non-breaking space.
      return isServer
        ? false
        : isBlink && this.value === '' && window.matchMedia(SbbMediaQueryPointerCoarse).matches;
    }

    private _assignValue(value: string): void {
      this.innerHTML = value;
    }

    private _setCursorAt(position: number): void {
      const selection = window.getSelection();
      if (!selection) {
        return;
      }

      const range = document.createRange();
      range.setStart(this.firstChild!, position);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    private _cleanText(value: string): string {
      // The native text input removes all newline characters if passed to the value property
      return value === null ? '' : `${value}`.replace(/[\n\r]+/g, '');
    }

    private _dispatchInputEvent(): void {
      /** The input event fires when the value has been changed as a direct result of a user action. */
      this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }

    @eventOptions({ passive: true })
    private _cleanChildren(): void {
      if (this.childElementCount) {
        for (const element of this.children) {
          element.remove();
        }
      }
    }

    private _updateContenteditable(): void {
      if (!isServer && this.isConnected) {
        this.internals.ariaReadOnly = this.readOnly ? 'true' : null;
        this.internals.ariaDisabled = this.disabled ? 'true' : null;
        // TODO(2026): Firefox supports plaintext-only since version 136 (March 2025).
        // Until this is part of our baseline, we should feature check to enable it.
        const value =
          this.disabled || this.readOnly
            ? 'false'
            : plaintextOnlySupported
              ? 'plaintext-only'
              : 'true';
        this.setAttribute('contenteditable', value);
        // In the readonly case, we disable contenteditable, but it still
        // needs to be focusable. We achieve this by setting tabindex in that case.
        if (this.readOnly) {
          this.setAttribute('tabindex', '0');
        } else {
          this.removeAttribute('tabindex');
        }
      }
    }

    private _emitChangeIfNecessary(): void {
      if (this._shouldEmitChange) {
        this._shouldEmitChange = false;
        /** The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value. */
        this.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    private _canSelect(): boolean {
      return !isServer && !this.disabled && !this.readOnly && !!this.value;
    }

    protected override render(): unknown {
      return html`<slot @slotchange=${this._cleanChildren}></slot>`;
    }
  }

  return SbbFormAssociatedInputElement as unknown as AbstractConstructor<SbbFormAssociatedInputMixinType> &
    T;
};
