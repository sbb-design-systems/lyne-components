import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { findShadowInput, setAttributes } from '../core/dom';
import {
  HandlerRepository,
  formElementHandlerAspect,
  getEventTarget,
  forwardEventToHost,
  EventEmitter,
  ConnectedAbortController,
} from '../core/eventing';

import style from './toggle-check.scss?lit&inline';
import '../icon';

/**
 * It displays a toggle checkbox.
 *
 * @slot - Use the unnamed slot to add content to the toggle label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 */
@customElement('sbb-toggle-check')
export class SbbToggleCheckElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
  } as const;

  /** Whether the toggle-check is checked. */
  @property({ reflect: true, type: Boolean }) public checked = false;

  /** Value of toggle-check. */
  @property() public value?: string;

  /** Name of the toggle-check. */
  @property({ reflect: true }) public name?: string;

  /** Size variant, either m or s. */
  @property({ reflect: true }) public size: 's' | 'm' = 's';

  /** The svg name for the true state - default -> 'tick-small' */
  @property({ attribute: 'icon-name' }) public iconName = 'tick-small';

  /** The disabled prop for the disabled state. */
  @property({ reflect: true, type: Boolean }) public disabled = false;

  /** The required prop for the required state. */
  @property({ reflect: true, type: Boolean }) public required = false;

  /** The label position relative to the toggle. Defaults to 'after' */
  @property({ attribute: 'label-position', reflect: true })
  public labelPosition?: 'before' | 'after' = 'after';

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(
    this,
    SbbToggleCheckElement.events.didChange,
    {
      bubbles: true,
      cancelable: true,
    },
  );

  @state() private _hasLabelText = false;

  private _handlerRepository = new HandlerRepository(this, formElementHandlerAspect);
  private _abort = new ConnectedAbortController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', (e) => this._handleClick(e), { signal });
    this.addEventListener('keyup', (e) => this._handleKeyup(e), { signal });
    this._handlerRepository.connect();
    this._hasLabelText = Array.from(this.childNodes ?? []).some(
      (n: ChildNode) => !(n as Element).slot && n.textContent,
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _handleClick(event: Event): void {
    if (!this.disabled && getEventTarget(event) === this) {
      findShadowInput(this).click();
    }
  }

  private _handleKeyup(event: KeyboardEvent): void {
    // The native checkbox input toggles state on keyup with space.
    if (!this.disabled && event.key === ' ') {
      // The toggle needs to happen after the keyup event finishes, so we schedule
      // it to be triggered after the current event loop.
      setTimeout(() => findShadowInput(this).click());
    }
  }

  private _handleChangeEvent(event: Event): void {
    forwardEventToHost(event, this);
    this._didChange.emit();
  }

  /**
   * Method triggered on checkbox input event.
   * If not indeterminate, inverts the value; otherwise sets checked to true.
   */
  private _handleInputEvent(): void {
    this.checked = findShadowInput(this)?.checked ?? false;
  }

  private _onLabelSlotChange(event: Event): void {
    this._hasLabelText = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some((n: Node) => !!n.textContent.trim());
  }

  protected override render(): TemplateResult {
    const attributes = {
      role: 'checkbox',
      'aria-checked': this.checked?.toString() ?? 'false',
      'aria-required': this.required.toString(),
      'aria-disabled': this.disabled.toString(),
      ...(this.disabled ? undefined : { tabIndex: '0' }),
    };

    setAttributes(this, attributes);

    return html`
      <label class="sbb-toggle-check">
        <input
          type="checkbox"
          aria-hidden="true"
          tabindex="-1"
          .name=${this.name || nothing}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?checked=${this.checked}
          .value=${this.value || nothing}
          @input=${() => this._handleInputEvent()}
          @change=${(event: Event) => this._handleChangeEvent(event)}
        />
        <span class="sbb-toggle-check__container">
          <span class="sbb-toggle-check__label" ?hidden=${!this._hasLabelText}>
            <slot @slotchange=${(event): void => this._onLabelSlotChange(event)}></slot>
          </span>
          <span class="sbb-toggle-check__track">
            <span class="sbb-toggle-check__circle">
              <span class="sbb-toggle-check__icon">
                <slot name="icon">
                  ${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}
                </slot>
              </span>
            </span>
          </span>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-check': SbbToggleCheckElement;
  }
}
