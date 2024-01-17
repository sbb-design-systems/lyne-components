import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { NamedSlotStateController } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import {
  HandlerRepository,
  actionElementHandlerAspect,
  EventEmitter,
  ConnectedAbortController,
} from '../../core/eventing';
import type {
  ButtonProperties,
  SbbCheckedStateChange,
  SbbStateChange,
  SbbValueStateChange,
} from '../../core/interfaces';
import { resolveButtonRenderVariables } from '../../core/interfaces';
import type { SbbTagGroupElement } from '../tag-group';

import style from './tag.scss?lit&inline';

import '../../icon';

export type SbbTagStateChange = Extract<
  SbbStateChange,
  SbbValueStateChange | SbbCheckedStateChange
>;

/**
 * It displays a selectable element which can be used as a filter.
 *
 * @slot - Use the unnamed slot to add content to the tag label.
 * @slot icon - Use this slot to display an icon at the component start, by providing a `sbb-icon` component.
 * @slot amount - Provide an amount to show it at the component end.
 * @event {CustomEvent<void>} input - Input event emitter
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {CustomEvent<void>} change - Change event emitter
 */
@customElement('sbb-tag')
export class SbbTagElement extends LitElement implements ButtonProperties {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    stateChange: 'stateChange',
    input: 'input',
    didChange: 'didChange',
    change: 'change',
  } as const;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** Value of the tag. */
  @property() public value?: string;

  /** The <form> element to associate the button with. */
  @property() public form?: string;

  /** Amount displayed inside the tag. */
  @property({ reflect: true }) public amount?: string;

  /** Whether the tag is checked. */
  @property({ reflect: true, type: Boolean }) public checked = false;

  /** Whether the tag is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled = false;

  /**
   * The icon name we want to use, choose from the small icon variants from the ui-icons category
   * from https://icons.app.sbb.ch (optional).
   */
  @property({ attribute: 'icon-name', reflect: true }) public iconName?: string;

  private _handleCheckedChange(currentValue: boolean, previousValue: boolean): void {
    if (currentValue !== previousValue) {
      this._stateChange.emit({ type: 'checked', checked: currentValue });
    }
  }

  private _handleValueChange(currentValue: string, previousValue: string): void {
    if (this.checked && currentValue !== previousValue) {
      this._stateChange.emit({ type: 'value', value: currentValue });
    }
  }

  /**
   * @internal
   * Internal event that emits whenever the state of the tag
   * in relation to the parent toggle changes.
   */
  private _stateChange: EventEmitter<SbbTagStateChange> = new EventEmitter(
    this,
    SbbTagElement.events.stateChange,
    {
      bubbles: true,
    },
  );

  /** Input event emitter */
  private _input: EventEmitter = new EventEmitter(this, SbbTagElement.events.input, {
    bubbles: true,
    composed: true,
  });

  /** @deprecated only used for React. Will probably be removed once React 19 is available. */
  private _didChange: EventEmitter = new EventEmitter(this, SbbTagElement.events.didChange, {
    bubbles: true,
  });

  /** Change event emitter */
  private _change: EventEmitter = new EventEmitter(this, SbbTagElement.events.change, {
    bubbles: true,
  });

  private _abort = new ConnectedAbortController(this);
  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('click', () => this._handleClick(), { signal });
    this._handlerRepository.connect();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('checked')) {
      this._handleCheckedChange(this.checked, changedProperties.get('checked'));
    }
    if (changedProperties.has('value')) {
      this._handleValueChange(this.value, changedProperties.get('value'));
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  /** Method triggered on button click. Inverts the checked value and emits events. */
  private _handleClick(): void {
    if (this.disabled) {
      return;
    }

    const tagGroup = this.closest('sbb-tag-group') as SbbTagGroupElement;

    // Prevent deactivating on exclusive / radio mode
    if (tagGroup && !tagGroup.multiple && this.checked) {
      return;
    }
    this.checked = !this.checked;
    this._input.emit();
    this._change.emit();
    this._didChange.emit();
  }

  protected override render(): TemplateResult {
    const { hostAttributes } = resolveButtonRenderVariables(this);
    // We have to ensure that the value is always present
    hostAttributes['aria-pressed'] = this.checked.toString();

    setAttributes(this, hostAttributes);

    return html`
      <span class="sbb-tag">
        <span class="sbb-tag__icon sbb-tag--shift">
          <slot name="icon">
            ${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}
          </slot>
        </span>
        <span class="sbb-tag__text sbb-tag--shift">
          <slot></slot>
        </span>
        <span class="sbb-tag__amount sbb-tag--shift">
          <slot name="amount">${this.amount}</slot>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tag': SbbTagElement;
  }
}
