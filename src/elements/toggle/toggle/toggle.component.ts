import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../../core/a11y.js';
import { forceType } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { EventEmitter } from '../../core/eventing.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbFormAssociatedMixin,
} from '../../core/mixins.js';
import { type SbbToggleOptionElement } from '../toggle-option.js';

import style from './toggle.scss?lit&inline';

/**
 * It can be used as a container for two `sbb-toggle-option`, acting as a toggle button.
 *
 * @slot - Use the unnamed slot to add `<sbb-toggle-option>` elements to the toggle.
 * @event {CustomEvent<void>} change - Emits whenever the toggle value changes.
 * @overrideType value - (T = string) | null
 */
export
@customElement('sbb-toggle')
class SbbToggleElement<T = string> extends SbbDisabledMixin(
  SbbFormAssociatedMixin(SbbElementInternalsMixin(LitElement)),
) {
  public static override readonly role = 'radiogroup';
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    change: 'change',
  } as const;

  /**
   * If true, set the width of the component fixed; if false,
   * the width is dynamic based on the label of the sbb-toggle-option.
   */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor even: boolean = false;

  /**
   * Size variant, either m or s.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 's' | 'm' = isLean() ? 's' : 'm';

  /**
   * The value of the toggle. It needs to be mutable since it is updated whenever
   * a new option is selected (see the `onToggleOptionSelect()` method).
   */
  @property()
  public set value(value: T | null) {
    if (isServer || !this.hasUpdated) {
      this._fallbackValue = value;
    } else {
      this._valueChanged(value);
    }
  }
  public get value(): T | null {
    return isServer
      ? (this._fallbackValue ?? null)
      : (this.options.find((o) => o.checked)?.value ?? this.options[0]?.value ?? null);
  }
  private _fallbackValue: T | null = null;

  /** The child instances of sbb-toggle-option as an array. */
  public get options(): SbbToggleOptionElement<T>[] {
    return Array.from(
      this.querySelectorAll?.<SbbToggleOptionElement<T>>('sbb-toggle-option') ?? [],
    );
  }

  /** Emits whenever the toggle value changes. */
  private _change: EventEmitter = new EventEmitter(this, SbbToggleElement.events.change, {
    bubbles: true,
    composed: true,
  });

  public constructor() {
    super();
    this.addEventListener?.('input', () => this._handleInput(), { passive: true });
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled') || changedProperties.has('formDisabled')) {
      this._updateDisabled();
    }

    // Before the first update, init with the fallback value.
    // The willUpdate hook is safer than the 'value' setter.
    if (!this.hasUpdated) {
      this._valueChanged(this._fallbackValue);
    }
  }

  /**
   * Called whenever the value changes, both programmatically or by user interaction.
   * @internal
   */
  public statusChanged(): void {
    this.updateFormValue();
    this.updatePillPosition();
  }

  /**
   * Reset to the init value if present. Select the first option, otherwise.
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
    if (typeof state === 'string' || state == null) {
      this.value = (state as T) ?? null;
    } else if (state instanceof FormData) {
      this._readFormData(state).then((data) => {
        this.value = data;
      });
    }
  }

  private async _readFormData(formData: FormData): Promise<T> {
    const data = formData.get(this.name);
    return data instanceof Blob ? JSON.parse(await data.text()) : (data as T);
  }

  /** @internal */
  public updatePillPosition(resizing = false): void {
    const options = this.options;
    const toggleElement = this.shadowRoot?.querySelector<HTMLDivElement>('.sbb-toggle');

    if (
      options.length < 2 ||
      !toggleElement ||
      options.every((o) => !o.checked) ||
      options.every((o) => !o.clientWidth)
    ) {
      return;
    }

    this.toggleAttribute('data-disable-animation-on-resizing', resizing);

    const firstOption = options[0];
    const isFirstChecked = firstOption.checked;
    const pillLeft = isFirstChecked ? '0px' : `${firstOption.clientWidth}px`;
    const pillRight = isFirstChecked
      ? `${toggleElement.clientWidth - firstOption.clientWidth}px`
      : '0px';

    if (pillRight === '0px' && pillLeft === '0px') {
      return;
    }

    this.style?.setProperty('--sbb-toggle-option-left', pillLeft);
    this.style?.setProperty('--sbb-toggle-option-right', pillRight);

    // Triggers a layout reflow which is needed to avoid animation glitches.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.offsetWidth;

    // In order to avoid a transition glitch, we have to know when the first values were set.
    this.toggleAttribute('data-initialized', true);
  }

  private _updateToggle(): void {
    this._valueChanged(this.value);
    this._updateDisabled();
  }

  private _valueChanged(value: T | null): void {
    const options = this.options;

    const selectedOption =
      options.find((o) => value === o.value) ?? options.find((o) => o.checked) ?? options[0];

    if (!selectedOption) {
      if (import.meta.env.DEV && !isServer) {
        console.warn(`sbb-toggle: No available options! (${this.id || 'No id'})`);
      }
      return;
    }
    selectedOption.checked = true;
    this.statusChanged();
  }

  private _updateDisabled(): void {
    for (const toggleOption of this.options) {
      toggleOption.disabled = this.disabled || this.formDisabled;
    }
  }

  /**
   * Called on user interaction (click or keyboard)
   */
  private _handleInput(): void {
    this.statusChanged();
    this._change.emit();
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledToggleOptions = this.options.filter(
      (t) => !t.disabled && interactivityChecker.isVisible(t),
    );

    if (
      !enabledToggleOptions ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this && (evt.target as HTMLElement).parentElement !== this)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const checked: number = enabledToggleOptions.findIndex(
        (toggleOption: SbbToggleOptionElement<T>) => toggleOption.checked,
      );
      const nextIndex: number = getNextElementIndex(evt, checked, enabledToggleOptions.length);
      if (!enabledToggleOptions[nextIndex].checked) {
        enabledToggleOptions[nextIndex].checked = true;
        enabledToggleOptions[nextIndex].focus();
        enabledToggleOptions[nextIndex].dispatchEvent(
          new InputEvent('input', { bubbles: true, composed: true }),
        );
      }
      evt.preventDefault();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-toggle">
        <slot @slotchange=${this._updateToggle}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle': SbbToggleElement;
  }
}
