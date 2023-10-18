import { CheckboxStateChange } from '../sbb-checkbox/sbb-checkbox.custom';
import { RadioButtonStateChange } from '../sbb-radio-button/sbb-radio-button.custom';
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
  EventEmitter,
  ConnectedAbortController,
} from '../../global/eventing';
import { InterfaceSbbSelectionPanelAttributes } from './sbb-selection-panel.custom';
import { CSSResult, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SbbCheckbox } from '../sbb-checkbox';
import { SbbRadioButton } from '../sbb-radio-button';
import { setAttribute } from '../../global/dom';
import { ref } from 'lit/directives/ref.js';
import Style from './sbb-selection-panel.scss?lit&inline';

export const events = {
  willOpen: 'will-open',
  didOpen: 'did-open',
  willClose: 'will-close',
  didClose: 'did-close',
};

/**
 * @slot unnamed - Use this slot to provide a `sbb-checkbox` or a `sbb-radio-button`.
 * @slot badge - Use this slot to provide a `sbb-card-badge` (optional).
 * @slot content - Use this slot to provide custom content for the panel (optional).
 */
@customElement('sbb-selection-panel')
export class SbbSelectionPanel extends LitElement {
  public static override styles: CSSResult = Style;

  /** The background color of the panel. */
  @property() public color: InterfaceSbbSelectionPanelAttributes['color'] = 'white';

  /** Whether the content section is always visible. */
  @property({ attribute: 'force-open', reflect: true, type: Boolean }) public forceOpen = false;

  /** Whether the unselected panel has a border. */
  @property({ reflect: true, type: Boolean }) public borderless = false;

  /** Whether the animation is enabled. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  /** The state of the selection panel. */
  @state() private _state: 'closed' | 'opening' | 'opened' | 'closing';

  /** Whether the selection panel is checked. */
  @state() private _checked = false;

  /** Whether the selection panel is disabled. */
  @state() private _disabled = false;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @state() private _namedSlots = createNamedSlotState('content');

  /** Emits whenever the content section starts the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(this, events.willOpen, {
    bubbles: true,
    composed: true,
  });

  /** Emits whenever the content section is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(this, events.didOpen, {
    bubbles: true,
    composed: true,
  });

  /** Emits whenever the content section begins the closing transition. */
  private _willClose: EventEmitter<{ closeTarget: HTMLElement }> = new EventEmitter(
    this,
    events.willClose,
    { bubbles: true, composed: true },
  );

  /** Emits whenever the content section is closed. */
  private _didClose: EventEmitter<{ closeTarget: HTMLElement }> = new EventEmitter(
    this,
    events.didClose,
    { bubbles: true, composed: true },
  );

  private _handlerRepository = new HandlerRepository(
    this,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  private _contentElement: HTMLElement;
  private _abort = new ConnectedAbortController(this);

  private get _input(): SbbCheckbox | SbbRadioButton {
    return this.querySelector('sbb-checkbox, sbb-radio-button') as SbbCheckbox | SbbRadioButton;
  }

  private _onInputChange(event: CustomEvent<RadioButtonStateChange | CheckboxStateChange>): void {
    if (!this._state) {
      return;
    }

    if (event.detail.type === 'disabled') {
      this._disabled = event.detail.disabled;
      return;
    } else if (event.detail.type !== 'checked') {
      return;
    }

    this._checked = event.detail.checked;

    if (this.forceOpen) {
      return;
    }

    if (this._checked) {
      this._state = 'opening';
      this._willOpen.emit();
      this.disableAnimation && this._handleOpening();
    } else {
      this._state = 'closing';
      this._willClose.emit();
      this.disableAnimation && this._handleClosing();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener(
      'state-change',
      (e: CustomEvent<RadioButtonStateChange | CheckboxStateChange>) => this._onInputChange(e),
      { signal, passive: true },
    );
    this._updateSelectionPanel();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  private _updateSelectionPanel(): void {
    this._checked = this._input?.checked;
    this._state = this._checked || this.forceOpen ? 'opened' : 'closed';
    this._disabled = this._input?.disabled;
  }

  private _onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== this._contentElement || event.propertyName !== 'opacity') {
      return;
    }

    if (this._checked) {
      this._handleOpening();
    } else {
      this._handleClosing();
    }
  }

  private _handleOpening(): void {
    this._state = 'opened';
    this._didOpen.emit();
  }

  private _handleClosing(): void {
    this._state = 'closed';
    this._didClose.emit();
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'data-has-content', this._namedSlots['content']);
    setAttribute(this, 'data-state', this._state);
    setAttribute(this, 'data-checked', this._checked);
    setAttribute(this, 'data-disabled', this._disabled);

    return html`
      <div class="sbb-selection-panel">
        <div class="sbb-selection-panel__badge">
          <slot name="badge"></slot>
        </div>

        <div class="sbb-selection-panel__input">
          <slot></slot>
        </div>

        ${this._namedSlots['content']
          ? html` <div
              class="sbb-selection-panel__content--wrapper"
              data-expanded=${this._checked || this.forceOpen}
              ${ref((el: HTMLElement) => {
                this._contentElement = el;
                if (this._contentElement) {
                  this._contentElement.inert = !this._checked && !this.forceOpen;
                }
              })}
              @transitionend=${(event: TransitionEvent) => this._onTransitionEnd(event)}
            >
              <div class="sbb-selection-panel__content">
                <sbb-divider></sbb-divider>
                <slot name="content"></slot>
              </div>
            </div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-selection-panel': SbbSelectionPanel;
  }
}
