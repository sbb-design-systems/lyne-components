import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  isServer,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import {
  forceType,
  type FormRestoreReason,
  type FormRestoreState,
  getNextElementIndex,
  getOverride,
  handleDistinctChange,
  i18nMultipleSelectionPossible,
  i18nSelectionRequired,
  isEventOnElement,
  isNextjs,
  isZeroAnimationDuration,
  popoverResetStyles,
  SbbDisabledMixin,
  type SbbElementType,
  SbbEscapableOverlayController,
  SbbFormAssociatedMixin,
  SbbLanguageController,
  SbbNegativeMixin,
  SbbOpenCloseBaseElement,
  SbbPropertyWatcherController,
  SbbReadonlyMixin,
  SbbRequiredMixin,
  SbbUpdateSchedulerMixin,
  scrollbarStyles,
  setOrRemoveAttribute,
  setOverlayPosition,
} from '../core.ts';
import type { SbbDividerElement } from '../divider.pure.ts';
import type { SbbFormFieldElement } from '../form-field/form-field/form-field.component.ts';
import {
  optionPanelStyles,
  type SbbOptionElement,
  type SbbOptionHintElement,
} from '../option.pure.ts';

import { SbbSelectTriggerElement } from './select-trigger.component.ts';
import style from './select.scss?inline';

/**
 * It displays a panel with selectable options.
 *
 * @slot - Use the unnamed slot to add options.
 * @cssprop [--sbb-select-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order,
 * the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the
 * component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 * @cssprop [--sbb-options-panel-offset=var(--sbb-spacing-fixed-2x)] - Gap between select and panel.
 * @cssprop [--sbb-options-panel-max-height] - Maximum height of the options panel.
 * If the calculated remaining space is smaller, the value gets ignored.
 * @overrideType value - (T = string | string[]) | null
 */
export class SbbSelectElement<T = string> extends SbbUpdateSchedulerMixin(
  SbbDisabledMixin(
    SbbNegativeMixin(
      SbbRequiredMixin(
        SbbReadonlyMixin(
          SbbFormAssociatedMixin<typeof SbbOpenCloseBaseElement>(SbbOpenCloseBaseElement),
        ),
      ),
    ),
  ),
) {
  public static override readonly elementName: string = 'sbb-select';

  public static override styles: CSSResultGroup = [
    popoverResetStyles,
    scrollbarStyles,
    optionPanelStyles,
    unsafeCSS(style),
  ];
  public static override elementDependencies: SbbElementType[] = [SbbSelectTriggerElement];

  public static override readonly events = {
    change: 'change',
    input: 'input',
    displayvaluechange: 'displayvaluechange',
    beforeopen: 'beforeopen',
    open: 'open',
    beforeclose: 'beforeclose',
    close: 'close',
  } as const;

  public static override get observedAttributes(): string[] {
    return super.observedAttributes.concat('aria-label', 'aria-labelledby', 'aria-describedby');
  }

  /** The placeholder used if no value has been selected. */
  @forceType()
  @property()
  public accessor placeholder: string = '';

  /** Whether the select allows for multiple selection. */
  @forceType()
  @handleDistinctChange((e: SbbSelectElement<T>, newValue: boolean) =>
    e._onMultipleChanged(newValue),
  )
  @property({ reflect: true, type: Boolean })
  public accessor multiple: boolean = false;

  /** Function used to compare option values. */
  @property({ attribute: false })
  public accessor compareWith: (v1: T | null, v2: T | null) => boolean = (v1, v2) => v1 === v2;

  @forceType()
  @handleDistinctChange((e: SbbSelectElement<T>, newValue: boolean) =>
    e._closeOnDisabledReadonlyChanged(newValue),
  )
  @property({ reflect: true, type: Boolean })
  @getOverride((e: SbbSelectElement<T>, v: boolean): boolean => v || e.isDisabledExternally())
  public override accessor disabled: boolean = false;

  /** Value of the form element. */
  @property()
  public set value(value: T[] | T) {
    this._value = value;
    this._isValueManuallyAssigned = true;
    this._updateOptionsFromValue();
  }
  public get value(): T[] | T | null {
    return this._value;
  }
  private _value: T | T[] | null = null;

  /**
   * Size variant, either s (lean theme default) or m (standard theme default).
   * When placed inside an `<sbb-form-field>`, the size is inherited from the form field.
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' | null = null;

  /**
   * Form type of element.
   * @default 'select-one / select-multiple'
   */
  public override get type(): string {
    return this.multiple ? 'select-multiple' : 'select-one';
  }

  /** The value displayed by the component. */
  private _displayValue: string | null = null;

  private _resizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    // This is an IIFE, because we need to keep track of the timeout state
    // for debouncing the resize callbacks.
    callback: (() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (this.state !== 'closed') {
            this._setOverlayPosition();
          }
        }, 10);
      };
    })(),
  });

  private _overlay?: HTMLElement;
  private _originElement: HTMLElement | null = null;
  private _triggerElement?: SbbSelectTriggerElement<T>;
  private _openPanelEventsController?: AbortController;
  private _escapableOverlayController = new SbbEscapableOverlayController(this);
  private _activeItemIndex = -1;
  private _searchTimeout?: ReturnType<typeof setTimeout>;
  private _searchString = '';
  private _didLoad = false;
  private _isPointerDownEventOnMenu: boolean = false;
  private _languageController = new SbbLanguageController(this);
  private _isValueManuallyAssigned = false;
  private _restoreFocusOnClose = false;

  /**
   * The 'combobox' input element
   * @internal
   */
  public get inputElement(): SbbSelectTriggerElement<T> | null {
    return this._triggerElement ?? null;
  }

  /** Returns all SbbOptionElements from this sbb-select instance. */
  public get options(): SbbOptionElement<T>[] {
    const options: SbbOptionElement<T>[] = [];
    this.querySelectorAll?.<SbbOptionElement<T>>('sbb-option').forEach((option) => {
      customElements.upgrade(option);
      options.push(option);
    });
    return options;
  }

  public constructor() {
    super();
    this.addEventListener?.('optionselectionchange', (e: Event) => this._onOptionChanged(e));
    this.addEventListener?.('optionLabelChanged', (e: Event) => this._onOptionLabelChanged(e));
    /** Forces the sbb-select to update its value. */
    this.addEventListener?.('ɵoptionvaluechange', () => this._updateValueOptionState());
    this.addEventListener?.('ɵoptgroupslotchange', () => this._handleSlotchange(), {
      capture: true,
    });
    // Options can receive focus by pointer interaction (or programmatically).
    // We need to sync the active option, so that keyboard interaction continues from the focused option.
    this.addEventListener?.('focusin', (e: FocusEvent) => this._onFocusIn(e));
    this.addEventListener?.('click', (e: MouseEvent) => {
      const target = e.target as SbbSelectElement<T> | SbbOptionElement<T>;
      if (target.localName === 'sbb-option') {
        // Option click
        if (!this.multiple && !target.disabled) {
          // A selection always returns the focus to the trigger, even if the option was activated
          // without receiving focus (e.g. by assistive technologies).
          this._close(true);
        }
      } else {
        this._toggleOpening();
      }
    });

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-form-field'), {
        negative: (e) => {
          this.negative = e.negative;
          this._syncNegative();
        },
      }),
    );

    // If the focus is on an option we need to listen to the bubbled keyboard event
    this.addEventListener('keydown', (e) => this._onKeyDown(e));
  }

  public override attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ): void {
    if (name === 'aria-label' || name === 'aria-labelledby' || name === 'aria-describedby') {
      this._syncAriaLabels();
    } else {
      super.attributeChangedCallback(name, _old, value);
    }
  }

  private _syncAriaLabels(): void {
    if (!this._triggerElement || isServer) {
      return;
    }

    setOrRemoveAttribute(
      this._triggerElement,
      'aria-labelledby',
      this.getAttribute('aria-labelledby'),
    );
    setOrRemoveAttribute(this._triggerElement, 'aria-label', this.getAttribute('aria-label'));
    setOrRemoveAttribute(
      this._triggerElement,
      'aria-describedby',
      this.getAttribute('aria-describedby'),
    );

    // Using the associated labels is only a fallback.
    // The drawback is, that it doesn't get updated automatically when the list of label changes.
    if (
      !this.getAttribute('aria-label') &&
      !this.getAttribute('aria-labelledby') &&
      this.internals.labels.length
    ) {
      this._triggerElement?.setAttribute(
        'aria-label',
        Array.from(this.internals.labels, (label) => label.textContent).join(', '),
      );
    }
  }

  /** Opens the selection panel. */
  public open(): void {
    if (
      this.state === 'opening' ||
      this.state === 'opened' ||
      !this._overlay ||
      this.options.length === 0 ||
      this.disabled ||
      this.formDisabled ||
      !this.dispatchBeforeOpenEvent()
    ) {
      return;
    }

    this.shadowRoot?.querySelector<HTMLDivElement>('[popover]')?.showPopover?.();
    this.state = 'opening';
    if (this._triggerElement) {
      this._triggerElement['internals'].ariaExpanded = 'true';
    }
    this.internals.states.add('expanded');
    this._setOverlayPosition();
    this._escapableOverlayController.connect();
    this._attachOpenPanelEvents();

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  /** Closes the selection panel. */
  public close(): void {
    this._close();
  }

  /**
   * @param restoreFocus Whether the focus should be returned to the trigger, even if it's not within the select
   * (e.g. when an option was selected by assistive technologies without receiving focus).
   */
  private _close(restoreFocus = false): void {
    if (this.state === 'closing' || this.state === 'closed' || !this.dispatchBeforeCloseEvent()) {
      return;
    }

    // Only set once the closing actually starts, so a prevented closing doesn't leave a stale flag.
    this._restoreFocusOnClose = restoreFocus;
    this.state = 'closing';
    this.internals.states.delete('expanded');
    this._openPanelEventsController?.abort();
    if (this._originElement) {
      this._resizeObserver.unobserve(this._originElement);
    }

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-options-panel-animation-duration');
  }

  /** Gets the current displayed value. */
  public getDisplayValue(): string {
    return this._displayValue ?? '';
  }

  private _selectableOptions(): SbbOptionElement<T>[] {
    return this.options.filter((opt) => !opt.matches(':state(disabled)'));
  }

  /** Listens to option changes. */
  private _onOptionChanged(event: Event): void {
    const target = event.target as SbbOptionElement<T>;
    if (target.selected) {
      this._onOptionSelected(target);
    } else {
      this._onOptionDeselected(target);
    }
  }

  /** Listens to option changes. */
  private _onOptionLabelChanged(event: Event): void {
    const target = event.target as SbbOptionElement<T>;
    const selected = this._getSelected();

    if (
      (!Array.isArray(selected) && target !== selected) ||
      (Array.isArray(selected) && !selected.includes(target))
    ) {
      return;
    }

    this._updateDisplayValue();
  }

  private async _updateDisplayValue(): Promise<void> {
    const selected = this._getSelected();
    if (Array.isArray(selected)) {
      this._displayValue = selected.map((o) => o.textContent?.trim()).join(', ') || null;
    } else if (selected) {
      this._displayValue = selected?.textContent?.trim() || null;
    } else {
      this._displayValue = null;
    }

    this.toggleState('has-display-value', !!this._displayValue);

    /** @internal */
    this.dispatchEvent(new Event('displayvaluechange', { bubbles: true, composed: true }));

    if (this.hydrationRequired) {
      await this.hydrationComplete;
    }

    const displayValueElements = [
      // Trigger for assistive technologies
      this._triggerElement?.querySelector?.('span'),

      // Visual trigger
      this.shadowRoot?.querySelector?.('.sbb-select__trigger'),
    ];

    for (const displayValueElement of displayValueElements) {
      if (!displayValueElement) {
        continue;
      }
      displayValueElement.textContent = this._displayValue ?? this.placeholder;
    }
  }

  /**
   * The `value` property should be adapted when the `multiple` property changes:
   *   - if it changes to true, the 'value' is set to an array;
   *   - if it changes to false, the first available option is set as 'value' otherwise it's set to null.
   */
  private _onMultipleChanged(isChangingToMultiple: boolean): void {
    if (isChangingToMultiple) {
      this._value = this._isValueManuallyAssigned || this.value != null ? [this.value as T] : [];
    } else if (Array.isArray(this.value)) {
      this._value = this.value.length ? this.value[0] : null;
    }
    this._updateDisplayValue();
  }

  /**
   * If the `disabled` or the `readonly` properties are set, and the panel is open, close it.
   */
  private _closeOnDisabledReadonlyChanged(newValue: boolean): void {
    if ((this.state === 'opening' || this.state === 'opened') && newValue) {
      this.close();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._updateValueOptionState();
    if (this._triggerElement) {
      // As the triggerElement is created in the firstRender,
      // we need to sync the aria labels and configure the trigger here.
      this._syncAriaLabels();
      this._triggerElement.select = this;
    }

    // Wait for ssr hydration
    if (!isNextjs()) {
      this.startUpdate();
      this._setupSelect();
    }
  }

  /** @internal */
  public override focus(): void {
    // Forward focus to the trigger element.
    this._triggerElement?.focus();
  }

  /** @internal */
  public override blur(): void {
    // Forward blur to the trigger element.
    this._triggerElement?.blur();
  }

  /**
   * Removes element's first attribute whose qualified name is qualifiedName.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttribute)
   * @internal We need to override this due to a hydration issue with Next.js.
   */
  public override removeAttribute(qualifiedName: string): void {
    // In Next.js the hydration needs to finish before we can manipulate the light DOM.
    // @lit/react calls removeAttribute('defer-hydration') in a useLayoutEffect,
    // which is done after hydration is finished. Due to this we intercept this call
    // in overriding removeAttribute to finish initialization of the sbb-select.
    // https://github.com/lit/lit/blob/main/packages/react/src/create-component.ts#L293-L296
    // We also need to wait for update complete in order to be sure that the shadow DOM has been rendered.
    if (isNextjs() && qualifiedName === 'defer-hydration' && !this._didLoad) {
      this.updateComplete.then(() => this._setupSelect());
    }
    super.removeAttribute(qualifiedName);
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._syncNegative();
    this._syncAriaLabels();

    if (this._didLoad) {
      this._setupOrigin();
      this._setupTrigger();
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (!name && this.hasUpdated) {
      setTimeout(() => this._syncAriaLabels());
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._syncNegative();
    }
    if (changedProperties.has('readOnly')) {
      this._closeOnDisabledReadonlyChanged(this.readOnly);
    }
  }

  public override disconnectedCallback(): void {
    // Take back the trigger element previously moved to the light DOM.
    // Due to timing issues, this needs to be done before calling super.disconnectedCallback().
    if (this._triggerElement) {
      this.prepend(this._triggerElement);
    }
    super.disconnectedCallback();
    this._openPanelEventsController?.abort();
  }

  /**
   * The reset value is the attribute value (the setup value), null otherwise.
   * @internal
   */
  public formResetCallback(): void {
    this.value = (this.hasAttribute('value') ? this.getAttribute('value') : null) as T;
  }

  /**
   * @internal
   */
  public formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    try {
      const { value, manuallyAssigned } = JSON.parse(state as string) as {
        value: T | T[];
        manuallyAssigned: boolean;
      };

      this._isValueManuallyAssigned = manuallyAssigned;
      this._value = value;
      this._updateOptionsFromValue();
    } catch {
      console.warn(`Failed to restore sbb-select with state ${state}`);
    }
  }

  protected override formState(): FormRestoreState {
    return JSON.stringify({ value: this.value, manuallyAssigned: this._isValueManuallyAssigned });
  }

  private _syncNegative(): void {
    this.querySelectorAll?.<SbbDividerElement | SbbOptionHintElement>(
      'sbb-divider, sbb-option-hint',
    ).forEach((el) => (el.negative = this.negative));
  }

  protected override shouldValidate(name: PropertyKey | undefined): boolean {
    return super.shouldValidate(name) || name === 'value' || name === 'required';
  }

  protected override validate(): void {
    super.validate();

    const value: T[] = Array.isArray(this.value)
      ? this.value
      : this.value === null
        ? []
        : [this.value];

    if (
      this.required &&
      (this.options.every((o) => value.every((v) => !this.compareWith(v, o.value))) ||
        (!this._isValueManuallyAssigned && this.value == null))
    ) {
      this.setValidityFlag('valueMissing', i18nSelectionRequired[this._languageController.current]);
    } else {
      this.removeValidityFlag('valueMissing');
    }
  }

  private _setupSelect(): void {
    this._setupOrigin();
    this._setupTrigger();
    this._didLoad = true;
    this.completeUpdate();
  }

  /** Sets the originElement; if the component is used in a sbb-form-field uses it, otherwise uses the parentElement. */
  private _setupOrigin(): void {
    const formField = this.closest?.<SbbFormFieldElement>('sbb-form-field');
    if (this._originElement) {
      this._resizeObserver.unobserve(this._originElement);
    }
    this._originElement =
      formField?.shadowRoot?.querySelector?.('#overlay-anchor') ?? this.parentElement!;
    if (this._originElement) {
      this.toggleState('option-panel-origin-borderless', formField?.hasAttribute?.('borderless'));

      if (this.isOpen) {
        this._resizeObserver.observe(this._originElement);
      }
    }
  }

  /**
   * To assess screen-readers problems caused by the interaction between aria patterns and shadow DOM,
   * we are forced to move the 'combobox' trigger element to the light DOM
   */
  private _setupTrigger(): void {
    // Move the trigger before the sbb-select
    if (this.parentElement && this._triggerElement) {
      this.parentElement.insertBefore?.(this._triggerElement, this);
    }
  }

  private _setOverlayPosition(): void {
    if (!this._originElement || !this._overlay) {
      return;
    }
    setOverlayPosition(
      this._overlay,
      this._originElement,
      this._overlay,
      this.shadowRoot!.querySelector('.sbb-option-panel__overlay-container')!,
      this,
    );
  }

  // In rare cases it can be that the animationEnd event is triggered twice.
  // To avoid entering a corrupt state, exit when state is not expected.
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this.state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this.state === 'closing') {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this.state = 'opened';
    if (this._originElement) {
      this._resizeObserver.observe(this._originElement);
    }
    this.dispatchOpenEvent();
  }

  private _handleClosing(): void {
    // Must be evaluated before hiding the popover, as hiding a focused option moves the focus.
    const restoreFocus = this._restoreFocusOnClose || this._isFocusWithin();
    this._restoreFocusOnClose = false;
    this.state = 'closed';
    this.shadowRoot?.querySelector<HTMLDivElement>('[popover]')?.hidePopover?.();
    if (this._triggerElement) {
      this._triggerElement['internals'].ariaExpanded = 'false';
    }
    this._resetActiveElement();
    if (restoreFocus) {
      this.focus();
    }
    if (this._overlay) {
      this._overlay.scrollTop = 0;
    }
    this._escapableOverlayController.disconnect();
    this.dispatchCloseEvent();
  }

  /**
   * Whether the focus is still within the select (trigger, panel or an option).
   * In this case (e.g. closing by selection or Escape), the focus should be restored to the trigger.
   * If the focus is somewhere else (e.g. moved away by Tab, by clicking another control or an empty area,
   * or the select was closed programmatically), the focus must not be moved.
   */
  private _isFocusWithin(): boolean {
    // Use the root node, so that it also works if the select is placed inside a shadow root.
    const activeElement = (this.getRootNode() as Document | ShadowRoot).activeElement;
    return (
      !!activeElement && (activeElement === this._triggerElement || this.contains(activeElement))
    );
  }

  /** When an option is selected, updates the displayValue; it also closes the select if not `multiple`. */
  private _onOptionSelected(option: SbbOptionElement<T>): void {
    if (!this.multiple) {
      this._value = option.value;
    } else if (!this.value) {
      this._value = [option.value!];
    } else if (
      Array.isArray(this.value) &&
      !this.value.some((v) => this.compareWith(v, option.value!))
    ) {
      this._value = [...this.value, option.value!];
    }

    this._updateOptionsFromValue();
    this._dispatchInputEvents();
  }

  /** When an option is unselected in `multiple`, removes it from value and updates displayValue. */
  private _onOptionDeselected(optionSelectionChange: SbbOptionElement<T>): void {
    if (this.multiple && Array.isArray(this.value)) {
      this._value = this.value.filter((el) => !this.compareWith(el, optionSelectionChange.value));
      this._updateOptionsFromValue();
      this._dispatchInputEvents();
    }
  }

  private _dispatchInputEvents(): void {
    /** The input event fires when the value has been changed as a direct result of a user action. */
    this.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        composed: true,
      }),
    );

    /**
     * The change event is fired when the user modifies the element's value.
     * Unlike the input event, the change event is not necessarily fired
     * for each alteration to an element's value.
     */
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  private _attachOpenPanelEvents(): void {
    this._openPanelEventsController = new AbortController();

    // Recalculate the overlay position on scroll and window resize
    document.addEventListener('scroll', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
      // Without capture, other scroll contexts would not bubble to this event listener.
      // Capture allows us to react to all scroll contexts in this DOM.
      capture: true,
    });
    window.addEventListener('resize', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });

    // Close menu on backdrop click
    window.addEventListener('pointerdown', (ev) => this._pointerDownListener(ev), {
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('pointerup', (ev) => this._closeOnBackdropClick(ev), {
      signal: this._openPanelEventsController.signal,
    });
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (this.readOnly) {
      return;
    }

    if (this.state === 'opening' || this.state === 'opened') {
      this._openedPanelKeyboardInteraction(event);
    } else if (this.state === 'closed' || this.state === 'closing') {
      this._closedPanelKeyboardInteraction(event);
    }
  }

  private _closedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this._checkForLetterSelection(event)) {
      return this._setNextActiveOptionByText(event);
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        break;
    }
  }

  private _openedPanelKeyboardInteraction(event: KeyboardEvent): void {
    if (this.readOnly) {
      return;
    }

    if (this._checkForLetterSelection(event)) {
      return this._setNextActiveOptionByText(event);
    }

    switch (event.key) {
      case 'Tab':
        this.close();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this._selectByKeyboard();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this._setNextActiveOption(event);
        break;

      case 'Home':
      case 'PageUp':
        event.preventDefault();
        this._setNextActiveOption(event, 0);
        break;

      case 'End':
      case 'PageDown':
        event.preventDefault();
        this._setNextActiveOption(event, this._selectableOptions().length - 1);
        break;
    }
  }

  private _checkForLetterSelection(event: KeyboardEvent): boolean {
    return (
      event.key === 'Backspace' ||
      event.key === 'Clear' ||
      (event.key.length === 1 &&
        event.key !== ' ' &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey)
    );
  }

  private _setNextActiveOptionByText(event: KeyboardEvent): void {
    // Set timeout and the string to search.
    if (typeof this._searchTimeout === typeof setTimeout) {
      clearTimeout(this._searchTimeout);
    }
    this._searchTimeout = setTimeout(() => (this._searchString = ''), 1000);
    this._searchString += event.key;

    // Reorder the _filteredOption array to have the last selected element at the bottom.
    const indexForSlice: number = this._activeItemIndex + 1;
    const selectableOptions = this._selectableOptions();
    const filteredOptionsSorted = [
      ...selectableOptions.slice(indexForSlice),
      ...selectableOptions.slice(0, indexForSlice),
    ];

    const match = filteredOptionsSorted.find(
      (option) => option.textContent?.toLowerCase().indexOf(this._searchString.toLowerCase()) === 0,
    );
    if (match) {
      // If an exact match has been found, go to that option.
      this._setNextActiveOption(event, selectableOptions.indexOf(match));
    } else if (
      this._searchString.length > 1 &&
      new RegExp(`^${this._searchString.charAt(0)}*$`).test(this._searchString)
    ) {
      // If no exact match has been found but the string to search is made by the same repeated letter,
      // go to the first element, if exists, that matches the letter.
      const firstMatch = filteredOptionsSorted.find(
        (option) =>
          option.textContent?.toLowerCase().indexOf(this._searchString[0].toLowerCase()) === 0,
      );
      if (firstMatch) {
        this._setNextActiveOption(event, selectableOptions.indexOf(firstMatch));
      }
    } else {
      // No match found, clear the timeout and the search term.
      clearTimeout(this._searchTimeout);
      this._searchString = '';
    }
  }

  private _selectByKeyboard(): void {
    const activeOption = this._selectableOptions()[this._activeItemIndex];

    if (this.multiple) {
      activeOption?.['selectViaUserInteraction'](!activeOption.selected);
    } else {
      if (activeOption && !activeOption.selected) {
        activeOption['selectViaUserInteraction'](true);
      }
      this.close();
    }
  }

  private _setNextActiveOption(event: KeyboardEvent, index?: number): void {
    const filteredOptions = this._selectableOptions();

    // Prevent keyboard navigation if all options are disabled
    if (filteredOptions.length === 0) {
      return;
    }

    const nextIndex =
      index ?? getNextElementIndex(event, this._activeItemIndex, filteredOptions.length);
    const nextOption = filteredOptions[nextIndex];
    const activeOption = filteredOptions[this._activeItemIndex];

    // Update the index before moving the focus, so that the focusin handler doesn't process it again.
    this._activeItemIndex = nextIndex;
    this._setActiveElement(nextOption, activeOption);

    if (!this.multiple) {
      nextOption['selectViaUserInteraction'](true);
    } else if (event?.shiftKey) {
      nextOption['selectViaUserInteraction'](!nextOption.selected);
    }
  }

  private _setActiveElement(
    nextActiveOption: SbbOptionElement<T>,
    lastActiveOption: SbbOptionElement<T> | null = null,
  ): void {
    nextActiveOption.focus({ preventScroll: true });
    nextActiveOption.scrollIntoView({ block: 'nearest' });
    nextActiveOption.setActive(true);

    // Reset the previous
    if (lastActiveOption && lastActiveOption !== nextActiveOption) {
      lastActiveOption.setActive(false);
    }
  }

  /**
   * Synchronizes the active index when an option receives focus (e.g. by pointer).
   * Moving the focus must never change the selection.
   */
  private _onFocusIn(event: FocusEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.localName !== 'sbb-option') {
      return;
    }

    const selectableOptions = this._selectableOptions();
    const focusedOption = target as SbbOptionElement<T>;
    const index = selectableOptions.indexOf(focusedOption);
    if (index === -1) {
      return;
    }

    this._activeItemIndex = index;
    // The active state renders a visual focus indicator, which must only be shown for keyboard navigation.
    // On keyboard navigation, _setActiveElement() sets the active state after moving the focus.
    selectableOptions.forEach((option) => option.setActive(false));
  }

  private _resetActiveElement(): void {
    const activeElement = this._selectableOptions()[this._activeItemIndex];

    if (activeElement) {
      activeElement.setActive(false);
    }
    this._activeItemIndex = -1;
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnMenu = isEventOnElement(this._overlay, event);
  };

  // Close menu on backdrop click.
  private _closeOnBackdropClick = (event: PointerEvent): void => {
    if (
      !this._isPointerDownEventOnMenu &&
      !isEventOnElement(this._overlay, event) &&
      !isEventOnElement(this._originElement, event)
    ) {
      this.close();
    }
  };

  private _updateOptionsFromValue(): void {
    const value = Array.isArray(this.value) ? this.value : [this.value];

    const displayValues = [];
    for (const option of this.options) {
      option.selected = value.some((v) => this.compareWith(v, option.value));
      if (option.selected) {
        displayValues.push(option);
      }
    }

    this._updateDisplayValue();

    if (!Array.isArray(this.value)) {
      const value: T | null = this.value;
      this._activeItemIndex = this._selectableOptions().findIndex((option) =>
        this.compareWith(option.value, value),
      );
    }
  }

  private _updateValueFromOptions(): void {
    const selected = this._getSelected();

    if (Array.isArray(selected)) {
      if (selected && selected.length > 0) {
        const value: T[] = [];
        for (const option of selected) {
          value.push(option.value!);
        }
        this._value = value;
      }
    } else if (selected) {
      this._activeItemIndex = this._selectableOptions().findIndex((option) => option === selected);
      this._value = selected.value;
    }

    this._updateDisplayValue();
  }

  private _handleSlotchange(): void {
    // Options are never part of the tab sequence, but must be focusable by script and pointer.
    this.options.forEach((o) => (o.tabIndex = -1));
    this._updateValueOptionState();
  }

  private _updateValueOptionState(): void {
    if (this._isValueManuallyAssigned) {
      this._updateOptionsFromValue();
    } else {
      this._updateValueFromOptions();
    }
  }

  private _getSelected(): SbbOptionElement<T> | SbbOptionElement<T>[] | null {
    if (this.multiple) {
      return this.options.filter((option) => option.selected);
    } else {
      return this.options.find((option) => option.selected) ?? null;
    }
  }

  private _toggleOpening(): void {
    if (this.disabled || this.formDisabled || this.readOnly) {
      return;
    }

    switch (this.state) {
      case 'opening':
      case 'opened': {
        this.close();
        break;
      }
      case 'closing':
      case 'closed': {
        // The visible part of the select is not focusable. To enable keyboard interaction
        // after opening by pointer (e.g. for a standalone select), focus the trigger.
        this.focus();
        this.open();
        break;
      }
      default:
        break;
    }
  }

  protected override render(): TemplateResult {
    // Scroll areas without containing an interactive element will receive focus when tabbing through the document.
    // If there are a lot of options and when pressing tab key, the scroll area on sbb-select__options gets focus.
    // As elements inside the panel should never get focus, we have to avoid that by setting tabindex=-1.

    return html`
      <!-- This element is visually hidden and will be appended to the light DOM to allow screen
      readers to work properly -->
      <sbb-select-trigger
        class="sbb-screen-reader-only"
        tabindex=${this.disabled || this.formDisabled ? nothing : '0'}
        @keydown=${this._onKeyDown}
        @click=${this._toggleOpening}
        ${ref((ref) => (this._triggerElement = ref as SbbSelectTriggerElement<T>))}
      >
        <span></span>${
          this.multiple && !this.disabled && !this.readOnly
            ? // Use a paragraph to let screen reader make a pause after reading the options.
              html`<p>${i18nMultipleSelectionPossible[this._languageController.current]}</p>`
            : nothing
        }
      </sbb-select-trigger>

      <!--
        Visually display the value.
        The span is replaced after the first render. It is only here to avoid a Lit warning
        about changing Lit-controlled content, because we update it directly.
        The placeholder must be rendered here so it is transferred from server-side rendering.
      -->
      <div class="sbb-select__trigger" aria-hidden="true"><span>${this.placeholder}</span></div>

      <div class="sbb-option-panel__overlay-container sbb-popover-reset" popover="manual">
        <div
          class="sbb-option-panel__overlay ${
            this.negative ? 'sbb-scrollbar-negative' : 'sbb-scrollbar'
          }"
          role="listbox"
          aria-multiselectable=${this.multiple ? 'true' : nothing}
          tabindex="-1"
          @animationend=${this._onAnimationEnd}
          ${ref((dialogRef) => (this._overlay = dialogRef as HTMLElement))}
        >
          <slot @slotchange=${this._handleSlotchange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-select': SbbSelectElement;
  }
}
