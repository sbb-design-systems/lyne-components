import {
  Component,
  ComponentInterface,
  h,
  Element,
  Event,
  Host,
  JSX,
  Listen,
  Prop,
  State,
  EventEmitter,
} from '@stencil/core';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { createNamedSlotState } from '../../global/helpers';
import { i18nCollapsed, i18nExpanded } from '../../global/i18n';
import { CheckboxStateChange } from '../sbb-checkbox/sbb-checkbox.custom';
import { RadioButtonStateChange } from '../sbb-radio-button/sbb-radio-button.custom';

/**
 * @slot unnamed - Use this slot to provide a `sbb-checkbox` or a `sbb-radio-button`.
 * @slot badge - Use this slot to provide a `sbb-card-badge` (optional).
 * @slot content - Use this slot to provide custom content for the panel (optional).
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-selection-panel.scss',
  tag: 'sbb-selection-panel',
})
export class SbbSelectionPanel implements ComponentInterface {
  /**
   * The background color of the panel.
   */
  @Prop() public color: 'white' | 'milk' = 'white';

  /**
   * Whether the content section is always visible.
   */
  @Prop({ reflect: true }) public forceOpen = false;

  /**
   * Whether the animation is enabled.
   */
  @Prop({ reflect: true }) public disableAnimation = false;

  /**
   * Whether the selection panel is checked.
   */
  @State() private _checked = false;

  /**
   * Whether the selection panel is disabled.
   */
  @State() private _disabled = false;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('badge', 'content');

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  /**
   * Emits whenever the content section starts the opening transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section is opened.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /**
   * Emits whenever the content section begins the closing transition.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<{ closeTarget: HTMLElement }>;

  /**
   * Emits whenever the content section is closed.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<{ closeTarget: HTMLElement }>;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  private _contentElement: HTMLElement;

  private get _input(): HTMLInputElement {
    return this._element.querySelector('sbb-checkbox, sbb-radio-button') as HTMLInputElement;
  }

  @Listen('state-change', { passive: true })
  public onInputChange(event: CustomEvent<RadioButtonStateChange | CheckboxStateChange>): void {
    if (event.detail.type === 'disabled') {
      this._disabled = event.detail.disabled;
      return;
    } else if (event.detail.type !== 'checked') {
      return;
    }

    this._checked = event.detail.checked;
    this._setContentElementHeight();

    if (this.forceOpen) {
      return;
    }

    if (this._checked) {
      this.willOpen.emit();
    } else {
      this.willClose.emit();
    }

    this._setExpandedStateForScreenReaders();
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public componentDidLoad(): void {
    this._updateSelectionPanel();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  private _updateSelectionPanel(): void {
    this._checked = this._input?.checked;
    this._disabled = this._input?.disabled;
    this._setExpandedStateForScreenReaders();
  }

  private _setExpandedStateForScreenReaders(): void {
    if (this._contentElement) {
      const selectionPanelExpandedEl = this._input.shadowRoot.querySelector(
        '[data-selection-panel-expanded]'
      );

      if (!selectionPanelExpandedEl) {
        return;
      }

      selectionPanelExpandedEl.innerHTML = this._checked
        ? ', ' + i18nExpanded[this._currentLanguage]
        : ', ' + i18nCollapsed[this._currentLanguage];
    }
  }

  private _setContentElementHeight(): void {
    if (this._contentElement && this._checked && !this.forceOpen) {
      this._element.style.setProperty(
        '--sbb-selection-panel-content-height',
        `${this._contentElement.scrollHeight}px`
      );
    }
  }

  private _onTransitionEnd(event: TransitionEvent): void {
    if (event.target !== this._contentElement || event.propertyName !== 'opacity') {
      return;
    }

    if (this._checked) {
      this.didOpen.emit();
    } else {
      this.didClose.emit();
    }
  }

  public render(): JSX.Element {
    return (
      <Host
        data-has-content={this._namedSlots['content']}
        data-checked={this._checked}
        data-disabled={this._disabled}
      >
        <div class="sbb-selection-panel">
          {this._namedSlots['badge'] && (
            <div class="sbb-selection-panel__badge">
              <slot name="badge" />
            </div>
          )}

          <div class="sbb-selection-panel__input">
            <slot />
          </div>

          {this._namedSlots['content'] && (
            <div
              class="sbb-selection-panel__content"
              data-expanded={this._checked || this.forceOpen}
              ref={(el) => {
                this._contentElement = el;
                this._contentElement.inert = !this._checked && !this.forceOpen;
              }}
              onTransitionEnd={(event: TransitionEvent) => this._onTransitionEnd(event)}
            >
              <sbb-divider />
              <slot name="content" onSlotchange={() => this._setContentElementHeight()} />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
